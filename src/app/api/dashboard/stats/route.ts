import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        reports: {
          orderBy: { createdAt: "desc" },
          take: 5,
        },
        snapshots: {
          orderBy: { timestamp: "desc" },
          take: 7,
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get latest snapshot for KPI cards
    const latestSnapshot = user.snapshots[0];
    const previousSnapshot = user.snapshots[1];

    // Calculate growth
    let growth = 0;
    if (latestSnapshot && previousSnapshot && previousSnapshot.activityScore > 0) {
      growth = Math.round(((latestSnapshot.activityScore - previousSnapshot.activityScore) / previousSnapshot.activityScore) * 100);
    }

    return NextResponse.json({
      user: {
        name: user.name,
        username: user.username,
        image: user.image,
      },
      stats: {
        score: latestSnapshot?.activityScore || 0,
        stars: latestSnapshot?.stars || 0,
        repos: latestSnapshot?.repos || 0,
        followers: latestSnapshot?.followers || 0,
        growth: growth,
      },
      reports: user.reports,
      snapshots: user.snapshots.reverse(), // For the chart (oldest first)
    });
  } catch (error) {
    console.error("DASHBOARD_STATS_ERROR", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
