import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { username: string } }) {
  try {
    const { username } = params;

    const user = await prisma.user.findUnique({
      where: { githubUsername: username },
      include: {
        githubProfile: true,
        repositories: {
          where: { isPrivate: false },
          orderBy: { stars: "desc" },
          take: 6,
          include: { metrics: true, languages: true }
        },
        aiReports: {
          where: { type: "USER_SUMMARY" },
          orderBy: { createdAt: "desc" },
          take: 1
        }
      },
    });

    if (!user || !user.githubProfile?.isPublic) {
      return NextResponse.json({ error: "Portfolio not found or private" }, { status: 404 });
    }

    const aiSummary = user.aiReports[0] ? JSON.parse(user.aiReports[0].content) : null;

    // Fetch language distribution for the whole portfolio
    const languages = await prisma.repositoryLanguage.findMany({
      where: { repository: { userId: user.id, isPrivate: false } },
    });

    const languageStats: Record<string, number> = {};
    languages.forEach((lang) => {
      languageStats[lang.name] = (languageStats[lang.name] || 0) + lang.size;
    });

    const sortedLanguages = Object.entries(languageStats)
      .map(([name, size]) => ({ name, size }))
      .sort((a, b) => b.size - a.size);

    return NextResponse.json({
      user: {
        name: user.name,
        image: user.image,
        githubUsername: user.githubUsername,
      },
      profile: user.githubProfile,
      repos: user.repositories,
      aiSummary,
      languages: sortedLanguages.slice(0, 8),
    });
  } catch (error: any) {
    console.error("PORTFOLIO_API_ERROR", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
