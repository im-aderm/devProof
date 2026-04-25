import { NextResponse } from "next/server";
import { GitHubService } from "@/lib/github";
import { ScoringEngine } from "@/lib/scoring";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { userA: string; userB: string } }) {
  try {
    const { userA, userB } = params;

    const [userDataA, userDataB] = await Promise.all([
      this.fetchUserData(userA),
      this.fetchUserData(userB),
    ]);

    if (!userDataA || !userDataB) {
      return NextResponse.json({ error: "One or both users not found." }, { status: 404 });
    }

    // Compare metrics
    const comparison = {
      userA: {
        readinessScore: userDataA.readinessScore,
        topSkill: userDataA.topSkill,
        repoCount: userDataA.repoCount,
        totalStars: userDataA.totalStars,
      },
      userB: {
        readinessScore: userDataB.readinessScore,
        topSkill: userDataB.topSkill,
        repoCount: userDataB.repoCount,
        totalStars: userDataB.totalStars,
      },
    };

    return NextResponse.json(comparison);
  } catch (error: any) {
    console.error("COMPARE_API_ERROR", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Helper function to fetch all necessary data for a user
async function fetchUserData(username: string) {
  const user = await prisma.user.findUnique({
    where: { githubUsername: username },
    include: {
      repositories: {
        include: { metrics: true, languages: true },
      },
      githubProfile: true,
      aiReports: { where: { type: "USER_SUMMARY" }, orderBy: { createdAt: "desc" }, take: 1 },
      readiness: true,
    },
  });

  if (!user || !user.githubProfile) return null;

  const aiSummary = user.aiReports[0] ? JSON.parse(user.aiReports[0].content) : null;

  const repoMetrics = user.repositories.map(r => r.metrics).filter(Boolean);
  const languages = user.repositories.flatMap(r => r.languages);

  const readinessScore = user.readiness ? user.readiness.overallScore : 0;
  const topSkill = aiSummary?.topSkills?.[0] || user.repositories.find(r => r.language)?.language || "N/A";
  const repoCount = user.repositories.length;
  const totalStars = user.repositories.reduce((acc, repo) => acc + repo.stars, 0);
  
  return {
    readinessScore,
    topSkill,
    repoCount,
    totalStars,
  };
}
