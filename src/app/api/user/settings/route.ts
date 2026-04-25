import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { isPublic, portfolioTheme } = await req.json();

    const updatedProfile = await prisma.githubProfile.update({
      where: { userId: (session.user as any).id },
      data: {
        isPublic,
        portfolioTheme,
      },
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await prisma.githubProfile.findUnique({
      where: { userId: (session.user as any).id },
    });

    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
