import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { GitHubService } from "@/lib/github";
import { ScoringEngine } from "@/lib/scoring";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const repoId = params.id;
    const repo = await prisma.repository.findUnique({
      where: { id: repoId },
      include: { user: true }
    });

    if (!repo || repo.userId !== (session.user as any).id) {
      return NextResponse.json({ error: "Repository not found" }, { status: 404 });
    }

    const githubService = new GitHubService((session as any).accessToken);
    const readme = await githubService.getRepositoryReadme(repo.fullName.split('/')[0], repo.name);
    
    const readmeScore = ScoringEngine.calculateReadmeScore(readme);
    const complexity = ScoringEngine.calculateComplexityScore(repo.stars, repo.forks, repo.language);
    const freshness = ScoringEngine.calculateFreshnessScore(repo.pushedAt);

    const suggestions = [];
    if (readmeScore < 70) suggestions.push("Improve README with installation and usage guides.");
    if (freshness < 50) suggestions.push("Repository is stale. Consider updating dependencies or documentation.");
    if (repo.stars < 5) suggestions.push("Increase project visibility to improve complexity score.");

    const metrics = await prisma.repositoryMetric.upsert({
      where: { repositoryId: repoId },
      update: {
        readmeScore,
        complexity,
        freshness,
        suggestions: suggestions as any,
      },
      create: {
        repositoryId: repoId,
        readmeScore,
        complexity,
        freshness,
        suggestions: suggestions as any,
      },
    });

    await prisma.repository.update({
      where: { id: repoId },
      data: { lastAnalyzedAt: new Date() },
    });

    return NextResponse.json(metrics);
  } catch (error: any) {
    console.error("REPO_ANALYZE_ERROR", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
