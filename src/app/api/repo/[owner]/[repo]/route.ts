import { NextResponse } from "next/server";
import { GitHubService } from "@/lib/github";
import { AIService } from "@/lib/ai";
import { ScoringEngine } from "@/lib/scoring";
import { rateLimit } from "@/lib/rate-limit";
import { getCachedData, setCachedData } from "@/lib/cache";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ owner: string; repo: string }> }
) {
  const resolvedParams = await params;
  const { owner, repo } = resolvedParams;

  if (!owner || !repo) {
    return NextResponse.json({ error: "Owner and Repo are required" }, { status: 400 });
  }

  const cacheKey = `repo:${owner}/${repo}`;
  const cached = await getCachedData(cacheKey);
  if (cached) return NextResponse.json(cached);

  // 1. Rate Limiting
  const rl = await rateLimit(`repo:${owner}/${repo}`, 10, 60000);
  if (!rl.success) {
    return NextResponse.json(
      { error: "Too many requests for this repository. Please wait." },
      { status: 429 }
    );
  }

  try {
    const github = new GitHubService();
    
    // 2. Parallel Data Fetching
    const [repoData, languages, readme] = await Promise.all([
      github.octokit.rest.repos.get({ owner, repo }).then(r => r.data),
      github.getRepositoryLanguages(owner, repo),
      github.getRepositoryReadme(owner, repo),
    ]);

    // 3. AI Insights
    const aiSummary = await AIService.generateRepoSummary({
      name: repoData.name,
      description: repoData.description,
      language: repoData.language,
    });

    // 4. Scoring
    const readmeScore = ScoringEngine.calculateReadmeScore(readme);
    const complexityScore = ScoringEngine.calculateComplexityScore(
      repoData.stargazers_count,
      repoData.forks_count,
      !!repoData.language
    );
    const freshnessScore = ScoringEngine.calculateFreshnessScore(repoData.pushed_at);

    const finalData = {
      repoData: {
        id: repoData.id,
        name: repoData.name,
        fullName: repoData.full_name,
        description: repoData.description,
        url: repoData.html_url,
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        watchers: repoData.subscribers_count,
        language: repoData.language,
        pushedAt: repoData.pushed_at,
        createdAt: repoData.created_at,
        license: repoData.license?.name,
      },
      languages,
      readmeLength: readme?.length || 0,
      aiSummary,
      metrics: {
        readmeScore,
        complexityScore,
        freshnessScore,
        overallScore: Math.round((readmeScore + complexityScore + freshnessScore) / 3),
      },
    };

    await setCachedData(cacheKey, finalData, 3600);
    return NextResponse.json(finalData);
  } catch (error: any) {
    console.error("REPO_API_ERROR", error);
    if (error.status === 404) {
      return NextResponse.json({ error: "Repository not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to analyze repository" },
      { status: 500 }
    );
  }
}
