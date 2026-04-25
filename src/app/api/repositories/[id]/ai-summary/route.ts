import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AIService } from "@/lib/ai";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const repoId = params.id;
    const repo = await prisma.repository.findUnique({
      where: { id: repoId },
    });

    if (!repo || repo.userId !== (session.user as any).id) {
      return NextResponse.json({ error: "Repository not found" }, { status: 404 });
    }

    const summary = await AIService.generateRepoSummary(repo);

    const report = await prisma.aiReport.create({
      data: {
        userId: (session.user as any).id,
        type: `REPO_SUMMARY_${repoId}`,
        content: summary || "",
        confidenceScore: 0.9,
      },
    });

    return NextResponse.json({ summary });
  } catch (error: any) {
    console.error("REPO_AI_SUMMARY_ERROR", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const report = await prisma.aiReport.findFirst({
      where: { 
        userId: (session.user as any).id,
        type: `REPO_SUMMARY_${params.id}`
      },
      orderBy: { createdAt: "desc" }
    });

    if (!report) return NextResponse.json(null);

    return NextResponse.json({ summary: report.content });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
