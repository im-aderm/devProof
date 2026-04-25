import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    const repositories = await prisma.repository.findMany({
      where: { userId },
      include: { metrics: true },
      orderBy: { pushedAt: "desc" },
    });

    return NextResponse.json(repositories);
  } catch (error: any) {
    console.error("REPOS_GET_ERROR", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
