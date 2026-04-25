import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AIService } from "@/lib/ai";

// ---------------------------------------------------------------------------
// Simple in-memory rate limiter (per-user, resets on server restart)
// For production, replace with @upstash/ratelimit backed by Redis
// ---------------------------------------------------------------------------
const RATE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5; // max AI generations per window per user
const rateLimitStore = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(userId: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(userId);

  if (!entry || now - entry.windowStart > RATE_WINDOW_MS) {
    rateLimitStore.set(userId, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= MAX_REQUESTS) return true;

  entry.count += 1;
  return false;
}

// --- POST: Generate and cache user AI summary ---
export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;

    if (isRateLimited(userId)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait 15 minutes before generating a new AI summary.", code: "RATE_LIMITED" },
        { status: 429 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        githubProfile: true,
        repositories: {
          orderBy: { stars: "desc" },
          take: 10,
          include: { languages: true },
        },
        aiReports: {
          where: { type: "USER_SUMMARY" },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    if (!user?.githubProfile) {
      return NextResponse.json(
        { error: "GitHub profile not found. Please sync GitHub first.", code: "NO_GITHUB_PROFILE" },
        { status: 400 }
      );
    }

    // Return cached report if already exists
    if (user.aiReports[0]) {
      try {
        return NextResponse.json(JSON.parse(user.aiReports[0].content));
      } catch {
        // Stale / corrupt cache — fall through to regenerate
        await prisma.aiReport.delete({ where: { id: user.aiReports[0].id } });
      }
    }

    const generatedSummary = await AIService.generateUserSummary(
      user.githubProfile,
      user.repositories
    );

    await prisma.aiReport.create({
      data: {
        userId,
        type: "USER_SUMMARY",
        content: JSON.stringify(generatedSummary),
        confidenceScore: 0.95,
      },
    });

    return NextResponse.json(generatedSummary);
  } catch (error) {
    console.error("AI_SUMMARY_POST_ERROR", error);
    return NextResponse.json(
      { error: "Internal server error", code: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}

// --- GET: Retrieve cached summary ---
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;

    const report = await prisma.aiReport.findFirst({
      where: { userId, type: "USER_SUMMARY" },
      orderBy: { createdAt: "desc" },
    });

    if (!report) return NextResponse.json(null);

    try {
      return NextResponse.json(JSON.parse(report.content));
    } catch {
      return NextResponse.json(null);
    }
  } catch (error) {
    console.error("AI_SUMMARY_GET_ERROR", error);
    return NextResponse.json(
      { error: "Internal server error", code: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}

