import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    // Fetch User Profile
    const profile = await prisma.githubProfile.findUnique({
      where: { userId },
    });

    // Fetch Repositories
    const repos = await prisma.repository.findMany({
      where: { userId },
      orderBy: { pushedAt: "desc" },
      take: 5,
    });

    // Fetch Language Distribution
    const languages = await prisma.repositoryLanguage.findMany({
      where: { repository: { userId } },
    });

    const languageStats: Record<string, number> = {};
    languages.forEach((lang) => {
      languageStats[lang.name] = (languageStats[lang.name] || 0) + lang.size;
    });

    const sortedLanguages = Object.entries(languageStats)
      .map(([name, size]) => ({ name, size }))
      .sort((a, b) => b.size - a.size);

    // Mock Scores (refined in Phase 10)
    const stats = {
      devScore: 84,
      growthScore: 12,
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
  } catch (error: any) {
    console.error("DASHBOARD_API_ERROR", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
