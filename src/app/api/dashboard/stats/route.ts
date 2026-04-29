import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { GitHubService } from "@/lib/github";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        reports: {
          orderBy: { createdAt: "desc" },
          take: 5,
        },
        snapshots: {
          orderBy: { timestamp: "desc" },
          take: 7,
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 2. Fetch Live Stats from GitHub if authenticated
    let liveStats = null;
    let languages: Record<string, number> = {};
    let topics: { name: string; count: number }[] = [];
    
    if (session.accessToken && user.username) {
      const github = new GitHubService(session.accessToken as string);
      const [profile, repos, collaboration] = await Promise.all([
        github.getUserProfile(user.username),
        github.getDetailedRepositories(user.username, 20),
        github.getUserCollaborationStats(user.username),
      ]);

      // Calculate Readiness Score
      const repoMetrics = repos.map(r => ({
        name: r.name,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        forks: r.forks_count,
        pushedAt: r.pushed_at,
        languages: r.languages || {},
        readme: "" // We could fetch this if needed, but let's stick to base for now
      }));
      const readinessResult = ScoringEngine.calculateReadinessScore(repoMetrics, profile);

      liveStats = {
        score: readinessResult.score,
        stars: repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0),
        repos: profile.public_repos + (profile.total_private_repos || 0),
        followers: profile.followers,
        privateRepos: profile.total_private_repos || 0,
        collaboration,
        readiness: readinessResult,
      };

      // Aggregate languages and topics
      const topicsMap: Record<string, number> = {};
      repos.forEach(repo => {
        if (repo.languages) {
          Object.entries(repo.languages).forEach(([lang, size]) => {
            languages[lang] = (languages[lang] || 0) + (size as number);
          });
        }
        if (repo.topics) {
          repo.topics.forEach((topic: string) => {
            topicsMap[topic] = (topicsMap[topic] || 0) + 1;
          });
        }
      });

      topics = Object.entries(topicsMap)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
    }

    // Get latest snapshot for KPI cards
    const latestSnapshot = user.snapshots[0];
    const previousSnapshot = user.snapshots[1];

    // Calculate growth
    let growth = 0;
    if (latestSnapshot && previousSnapshot && previousSnapshot.activityScore > 0) {
      growth = Math.round(((latestSnapshot.activityScore - previousSnapshot.activityScore) / previousSnapshot.activityScore) * 100);
    }

    return NextResponse.json({
      user: {
        name: user.name,
        username: user.username,
        image: user.image,
      },
      stats: {
        score: liveStats?.score || latestSnapshot?.activityScore || 0,
        stars: liveStats?.stars || latestSnapshot?.stars || 0,
        repos: liveStats?.repos || latestSnapshot?.repos || 0,
        followers: liveStats?.followers || latestSnapshot?.followers || 0,
        growth: growth,
        privateRepos: liveStats?.privateRepos || 0,
        collaboration: liveStats?.collaboration || { prCount: 0, issueCount: 0, reviewCount: 0 },
        readiness: liveStats?.readiness || null,
      },
      languages: Object.entries(languages)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 8),
      topics: topics,
      reports: user.reports,
      snapshots: user.snapshots.reverse(),
    });
  } catch (error) {
    console.error("DASHBOARD_STATS_ERROR", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
