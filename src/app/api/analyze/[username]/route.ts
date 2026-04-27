import { NextResponse } from "next/server";
import { GitHubService } from "@/lib/github";
import { AIService } from "@/lib/ai";
import { ScoringEngine, type RepoMetrics } from "@/lib/scoring";
import { rateLimit } from "@/lib/rate-limit";
import { getCachedData, setCachedData } from "@/lib/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const resolvedParams = await params;
  const { username } = resolvedParams;
  const session = await getServerSession(authOptions);

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  // 0. Try Cache
  const cached = await getCachedData(`analyze:${username}`);
  if (cached) return NextResponse.json(cached);

  // 1. Rate Limiting (Public Access)
  const rl = await rateLimit(`rl:analyze:${username}`, 5, 60000); // 5 per minute per target
  if (!rl.success) {
    return NextResponse.json(
      { error: "Too many requests for this profile. Please wait." },
      { status: 429 }
    );
  }

  try {
    const github = new GitHubService();
    
    // 2. Parallel Data Fetching
    const [profile, collabStats, detailedRepos] = await Promise.all([
      github.getUserProfile(username),
      github.getUserCollaborationStats(username),
      github.getDetailedRepositories(username, 10), // Limit to top 10 for speed
    ]);

    // 3. AI Insights
    const aiSummary = await AIService.generateUserSummary(profile, detailedRepos);

    // 4. Scoring
    const repoMetrics: RepoMetrics[] = detailedRepos.map(r => ({
      name: r.name,
      description: r.description,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      pushedAt: r.pushed_at,
      languages: r.languages,
    }));

    const scoringResult = ScoringEngine.calculateReadinessScore(repoMetrics, profile);

    // 5. Growth Forecast Signals
    const recentRepos = detailedRepos.filter(r => {
        const diff = Date.now() - new Date(r.pushed_at).getTime();
        return diff < 90 * 24 * 60 * 60 * 1000;
    });
    
    const growthForecast = {
        velocity: recentRepos.length > 5 ? "+15% Velocity" : "+5% Velocity",
        tier: scoringResult.badge,
        status: recentRepos.length > 3 ? "Active Growth" : "Stable Maintenance",
        description: recentRepos.length > 3 ? "Commit frequency increasing" : "Consistent development patterns"
    };

    const finalData = {
      profile,
      collabStats,
      repos: detailedRepos,
      aiSummary,
      scoringResult,
      growthForecast,
    };

    // 6. Persistence Logic
    if (session?.user?.id) {
      // Save the report
      await prisma.report.create({
        data: {
          userId: session.user.id,
          type: "profile",
          targetA: username,
          score: scoringResult.score,
          summary: aiSummary.summary,
          payload: JSON.stringify(finalData),
        },
      });

      // If it's the user's own profile, save a snapshot
      if (session.user.githubUsername === username) {
        await prisma.snapshot.create({
          data: {
            userId: session.user.id,
            stars: repoMetrics.reduce((acc, r) => acc + r.stars, 0),
            repos: profile.public_repos,
            followers: profile.followers,
            languages: JSON.stringify(finalData.repos.reduce((acc: any, r: any) => {
               Object.entries(r.languages).forEach(([name, size]) => {
                 acc[name] = (acc[name] || 0) + (size as number);
               });
               return acc;
            }, {})),
            activityScore: scoringResult.score,
          }
        });
      }
    }

    // 7. Cache for 1 hour
    await setCachedData(`analyze:${username}`, finalData, 3600);

    return NextResponse.json(finalData);
  } catch (error: any) {
    console.error("ANALYZE_API_ERROR", error);
    if (error.status === 404) {
      return NextResponse.json({ error: "GitHub user not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to analyze GitHub profile" },
      { status: 500 }
    );
  }
}
