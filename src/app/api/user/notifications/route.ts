import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const DEFAULT_PAGE_SIZE = 20; // Default number of notifications per page

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");
    const pageSize = parseInt(searchParams.get("pageSize") || String(DEFAULT_PAGE_SIZE), 10);

    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: pageSize,
      skip: cursor ? 1 : 0, // Skip the cursor item itself
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = notifications.length > 0 ? notifications[notifications.length - 1].id : null;

    return NextResponse.json({
      items: notifications,
      nextCursor: nextCursor,
    });
  } catch (error: any) {
    console.error("NOTIFICATIONS_GET_ERROR", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { notificationIds } = await req.json();

    if (!notificationIds || !Array.isArray(notificationIds) || notificationIds.length === 0) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    await prisma.notification.updateMany({
      where: {
        userId: (session.user as any).id,
        id: { in: notificationIds },
      },
      data: { isRead: true },
    });

    return NextResponse.json({ message: "Notifications marked as read" });
  } catch (error: any) {
    console.error("NOTIFICATIONS_PATCH_ERROR", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
