import { NextResponse } from "next/server";
import { GitHubService } from "@/lib/github";
import { ScoringEngine, type RepoMetrics } from "@/lib/scoring";
import { rateLimit } from "@/lib/rate-limit";
import { getCachedData, setCachedData } from "@/lib/cache";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userA: string; userB: string }> }
) {
  const resolvedParams = await params;
  const { userA, userB } = resolvedParams;

  if (!userA || !userB) {
    return NextResponse.json({ error: "Two users are required for comparison" }, { status: 400 });
  }

  const cacheKey = `compare:${userA}-${userB}`;
  const cached = await getCachedData(cacheKey);
  if (cached) return NextResponse.json(cached);

  // 1. Rate Limiting
  const rl = await rateLimit(`compare:${userA}-${userB}`, 5, 60000);
  if (!rl.success) {
    return NextResponse.json(
      { error: "Too many comparison requests. Please wait." },
      { status: 429 }
    );
  }

  try {
    const github = new GitHubService();
    
    // 2. Helper to fetch complete user data
    const fetchUserData = async (username: string) => {
      const [profile, collabStats, repos] = await Promise.all([
        github.getUserProfile(username),
        github.getUserCollaborationStats(username),
        github.getDetailedRepositories(username, 10),
      ]);

      const repoMetrics: RepoMetrics[] = repos.map(r => ({
        name: r.name,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        forks: r.forks_count,
        pushedAt: r.pushed_at,
        languages: r.languages,
      }));

      const scoringResult = ScoringEngine.calculateReadinessScore(repoMetrics, {
        ...profile,
        ...collabStats,
      });

      return { profile, collabStats, scoringResult, repos };
    };

    // 3. Parallel Fetch for both users
    const [dataA, dataB] = await Promise.all([
      fetchUserData(userA),
      fetchUserData(userB),
    ]);

    const finalData = { userA: dataA, userB: dataB };
    await setCachedData(cacheKey, finalData, 3600);
    
    return NextResponse.json(finalData);
  } catch (error: any) {
    console.error("COMPARE_API_ERROR", error);
    if (error.status === 404) {
      return NextResponse.json({ error: "One or both users not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to perform comparison" },
      { status: 500 }
    );
  }
}
