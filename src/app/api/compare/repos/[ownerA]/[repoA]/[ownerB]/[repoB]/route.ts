import { NextResponse } from "next/server";
import { GitHubService } from "@/lib/github";
import { ScoringEngine } from "@/lib/scoring";
import { rateLimit } from "@/lib/rate-limit";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ ownerA: string; repoA: string; ownerB: string; repoB: string }> }
) {
  const resolvedParams = await params;
  const { ownerA, repoA, ownerB, repoB } = resolvedParams;

  if (!ownerA || !repoA || !ownerB || !repoB) {
    return NextResponse.json({ error: "Two repositories are required for comparison" }, { status: 400 });
  }

  // 1. Rate Limiting
  const rl = await rateLimit(`compare-repos:${ownerA}/${repoA}-${ownerB}/${repoB}`, 5, 60000);
  if (!rl.success) {
    return NextResponse.json(
      { error: "Too many comparison requests. Please wait." },
      { status: 429 }
    );
  }

  try {
    const github = new GitHubService();
    
    // 2. Helper to fetch complete repo data
    const fetchRepoData = async (owner: string, repo: string) => {
      const [repoData, languages, readme] = await Promise.all([
        github.octokit.rest.repos.get({ owner, repo }).then(r => r.data),
        github.getRepositoryLanguages(owner, repo),
        github.getRepositoryReadme(owner, repo),
      ]);

      const readmeScore = ScoringEngine.calculateReadmeScore(readme);
      const complexityScore = ScoringEngine.calculateComplexityScore(
        repoData.stargazers_count,
        repoData.forks_count,
        !!repoData.language
      );
      const freshnessScore = ScoringEngine.calculateFreshnessScore(repoData.pushed_at);

      return {
        repoData: {
          name: repoData.name,
          fullName: repoData.full_name,
          owner: repoData.owner.login,
          description: repoData.description,
          stars: repoData.stargazers_count,
          forks: repoData.forks_count,
          language: repoData.language,
          pushedAt: repoData.pushed_at,
          license: repoData.license?.name,
        },
        languages,
        metrics: {
          readmeScore,
          complexityScore,
          freshnessScore,
          overallScore: Math.round((readmeScore + complexityScore + freshnessScore) / 3),
        },
      };
    };

    // 3. Parallel Fetch for both repos
    const [dataA, dataB] = await Promise.all([
      fetchRepoData(ownerA, repoA),
      fetchRepoData(ownerB, repoB),
    ]);

    return NextResponse.json({ repoA: dataA, repoB: dataB });
  } catch (error: any) {
    console.error("COMPARE_REPO_API_ERROR", error);
    if (error.status === 404) {
      return NextResponse.json({ error: "One or both repositories not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to perform repository comparison" },
      { status: 500 }
    );
  }
}
