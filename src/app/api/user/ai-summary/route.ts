import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AIService } from "@/lib/ai";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    // Fetch User Profile and Repos for context
    const profile = await prisma.githubProfile.findUnique({ where: { userId } });
    const repos = await prisma.repository.findMany({ where: { userId }, take: 10 });

    if (!profile) {
      return NextResponse.json({ error: "GitHub profile not synced yet" }, { status: 400 });
    }

    const aiSummary = await AIService.generateUserSummary(profile, repos);

    const report = await prisma.aiReport.create({
      data: {
        userId,
        type: "USER_SUMMARY",
        content: JSON.stringify(aiSummary),
        confidenceScore: 0.95,
      },
    });

    return NextResponse.json(aiSummary);
  } catch (error: any) {
    console.error("AI_SUMMARY_ERROR", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const report = await prisma.aiReport.findFirst({
      where: { 
        userId: (session.user as any).id,
        type: "USER_SUMMARY"
      },
      orderBy: { createdAt: "desc" }
    });

    if (!report) return NextResponse.json(null);

    return NextResponse.json(JSON.parse(report.content));
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
