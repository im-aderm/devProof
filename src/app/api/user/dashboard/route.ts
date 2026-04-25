import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 });
    }

    const userId = session.user.id;

    // Parallel fetch: profile, repos, languages, and readiness score
    const [profile, repos, languages, readiness] = await Promise.all([
      prisma.githubProfile.findUnique({ where: { userId } }),
      prisma.repository.findMany({
        where: { userId },
        orderBy: { pushedAt: "desc" },
        take: 5,
      }),
      prisma.repositoryLanguage.findMany({
        where: { repository: { userId } },
      }),
      prisma.readinessScore.findUnique({ where: { userId } }),
    ]);

    // Build language distribution
    const languageStats: Record<string, number> = {};
    languages.forEach((lang) => {
      languageStats[lang.name] = (languageStats[lang.name] || 0) + lang.size;
    });

    const sortedLanguages = Object.entries(languageStats)
      .map(([name, size]) => ({ name, size }))
      .sort((a, b) => b.size - a.size);

    const stats = {
      // Real devScore from ReadinessScore table; 0 + flag if not yet calculated
      devScore: readiness?.overallScore ?? 0,
      devScoreCalculated: readiness != null,
      topSkill: sortedLanguages[0]?.name || "N/A",
      repoCount: profile?.publicRepos || 0,
      totalStars: repos.reduce((acc, repo) => acc + repo.stars, 0),
    };

    return NextResponse.json({
      profile,
      repos,
      languages: sortedLanguages.slice(0, 5),
      stats,
    });
  } catch (error) {
    console.error("DASHBOARD_API_ERROR", error);
    return NextResponse.json(
      { error: "Internal server error", code: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}
