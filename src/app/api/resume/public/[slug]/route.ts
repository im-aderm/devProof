import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const resume = await prisma.resume.findUnique({
      where: { slug }
    });

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    if (!resume.isPublic) {
      return NextResponse.json({ error: "This resume is private" }, { status: 403 });
    }

    const data = typeof resume.data === "string" ? JSON.parse(resume.data) : resume.data;
    return NextResponse.json({
      ...(data as any || {}),
      updatedAt: resume.updatedAt,
      slug: resume.slug
    });
  } catch (error) {
    console.error("PUBLIC_RESUME_FETCH_ERROR", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
