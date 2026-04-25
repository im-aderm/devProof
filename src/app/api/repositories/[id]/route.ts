import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const repoId = params.id;
    const repository = await prisma.repository.findUnique({
      where: { id: repoId },
      include: { 
        metrics: true,
        languages: true
      },
    });

    if (!repository || repository.userId !== (session.user as any).id) {
      return NextResponse.json({ error: "Repository not found" }, { status: 404 });
    }

    return NextResponse.json(repository);
  } catch (error: any) {
    console.error("REPO_DETAIL_GET_ERROR", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
