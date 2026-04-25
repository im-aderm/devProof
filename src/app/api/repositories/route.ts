import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const DEFAULT_PAGE_SIZE = 10;

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

    const repositories = await prisma.repository.findMany({
      where: { userId },
      include: { metrics: true, languages: true },
      orderBy: { pushedAt: "desc" },
      take: pageSize,
      skip: cursor ? 1 : 0, // Skip the cursor item itself
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = repositories.length > 0 ? repositories[repositories.length - 1].id : null;

    return NextResponse.json({
      items: repositories,
      nextCursor: nextCursor,
    });
  } catch (error: any) {
    console.error("REPOS_GET_ERROR", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
