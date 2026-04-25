import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { AIService } from "@/lib/ai";
import { GitHubService } from "@/lib/github";
import rateLimit from 'next-rate-limit'; // Assuming 'next-rate-limit' is available or similar pattern

// Basic rate limiting middleware
const limiter = rateLimit({
  interval: 15 * 60 * 1000, // 15 minutes
  uniqueTokenPerInterval: 500, // 500 requests per interval
});

const validate = async (schema: z.ZodSchema<any>, request: Request) => {
  const body = await request.json();
  return schema.parse(body);
};

// --- API for User Summary ---
export async function POST(req: Request) {
  // Rate Limiting
  const { limited, token } = await limiter.check(req, res);
  if (limited) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        githubProfile: true,
        repositories: {
          orderBy: { stars: "desc" },
          take: 10,
          include: { languages: true },
        },
        aiReports: { where: { type: "USER_SUMMARY" }, orderBy: { createdAt: "desc" }, take: 1 },
      },
    });

    if (!user || !user.githubProfile) {
      return NextResponse.json({ error: "GitHub profile not found. Please sync GitHub first." }, { status: 400 });
    }

    const aiSummary = user.aiReports[0] ? JSON.parse(user.aiReports[0].content) : null;

    if (aiSummary) {
      // Return cached summary if available
      return NextResponse.json(aiSummary);
    }

    const generatedSummary = await AIService.generateUserSummary(user.githubProfile, user.repositories);

    await prisma.aiReport.create({
      data: {
        userId,
        type: "USER_SUMMARY",
        content: JSON.stringify(generatedSummary),
        confidenceScore: 0.95,
      },
    });

    return NextResponse.json(generatedSummary);
  } catch (error: any) {
    console.error("AI_SUMMARY_ERROR", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = (session.user as any).id;

    const report = await prisma.aiReport.findFirst({
      where: { userId, type: "USER_SUMMARY" },
      orderBy: { createdAt: "desc" },
    });

    if (!report) return NextResponse.json(null);

    return NextResponse.json(JSON.parse(report.content));
  } catch (error) {
    console.error("AI_SUMMARY_GET_ERROR", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
