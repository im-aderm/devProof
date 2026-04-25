import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ScoringEngine } from "@/lib/scoring";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    // Fetch necessary data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        repositories: {
          include: { metrics: true, languages: true },
        },
        githubProfile: true,
        aiReports: { where: { type: "USER_SUMMARY" }, orderBy: { createdAt: "desc" }, take: 1 },
      },
    });

    if (!user || !user.githubProfile) {
      return NextResponse.json({ error: "User profile not found. Please sync GitHub first." }, { status: 400 });
    }

    const repoMetrics = user.repositories.map(r => r.metrics).filter(Boolean); // Filter out nulls
    const languages = user.repositories.flatMap(r => r.languages);
    const aiSummary = user.aiReports[0] ? JSON.parse(user.aiReports[0].content) : null;

    const { score, recommendations, checklist } = ScoringEngine.calculateReadinessScore(
      repoMetrics,
      user.githubProfile,
      languages
    );

    // Store score in DB (optional, but good for tracking)
    await prisma.readinessScore.upsert({
      where: { userId },
      update: {
        overallScore: score,
        projectQuality: checklist.find(item => item.name === "Project Quality")?.score || 0,
        consistency: checklist.find(item => item.name === "Consistency")?.score || 0,
        collaboration: checklist.find(item => item.name === "Collaboration")?.score || 0,
        documentation: checklist.find(item => item.name === "Documentation")?.score || 0,
        technicalBreadth: checklist.find(item => item.name === "Technical Breadth")?.score || 0,
        recommendations: recommendations as any,
      },
      create: {
        userId,
        overallScore: score,
        projectQuality: checklist.find(item => item.name === "Project Quality")?.score || 0,
        consistency: checklist.find(item => item.name === "Consistency")?.score || 0,
        collaboration: checklist.find(item => item.name === "Collaboration")?.score || 0,
        documentation: checklist.find(item => item.name === "Documentation")?.score || 0,
        technicalBreadth: checklist.find(item => item.name === "Technical Breadth")?.score || 0,
        recommendations: recommendations as any,
      },
    });

    return NextResponse.json({ score, recommendations, checklist });

  } catch (error: any) {
    console.error("READINESS_API_ERROR", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
