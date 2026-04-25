import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ScoringEngine, type RepoWithMetrics } from "@/lib/scoring";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        repositories: {
          include: { metrics: true, languages: true },
        },
        githubProfile: true,
      },
    });

    if (!user?.githubProfile) {
      return NextResponse.json(
        { error: "GitHub profile not found. Please sync GitHub first.", code: "NO_GITHUB_PROFILE" },
        { status: 400 }
      );
    }

    // Pass full repo objects (which have pushedAt) — not just the metrics
    const repos: RepoWithMetrics[] = user.repositories.map((r) => ({
      pushedAt: r.pushedAt,
      stars: r.stars,
      forks: r.forks,
      language: r.language,
      metrics: r.metrics,
      languages: r.languages,
    }));

    const result = ScoringEngine.calculateReadinessScore(repos);

    // Persist score for dashboard StatCard usage
    await prisma.readinessScore.upsert({
      where: { userId },
      update: {
        overallScore: result.score,
        projectQuality: result.projectQuality,
        consistency: result.consistency,
        collaboration: result.collaboration,
        documentation: result.documentation,
        technicalBreadth: result.technicalBreadth,
        recommendations: result.recommendations,
      },
      create: {
        userId,
        overallScore: result.score,
        projectQuality: result.projectQuality,
        consistency: result.consistency,
        collaboration: result.collaboration,
        documentation: result.documentation,
        technicalBreadth: result.technicalBreadth,
        recommendations: result.recommendations,
      },
    });

    return NextResponse.json({
      score: result.score,
      recommendations: result.recommendations,
      checklist: result.checklist,
    });
  } catch (error) {
    console.error("READINESS_API_ERROR", error);
    return NextResponse.json(
      { error: "Internal server error", code: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}

