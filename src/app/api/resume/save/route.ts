import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { 
      profile, 
      experience, 
      skills, 
      projects, 
      education, 
      awards, 
      certifications,
      volunteer, 
      languages, 
      interests, 
      references, 
      sectionOrder,
      isPublic
    } = body;

    const username = session.user.githubUsername || session.user.id;
    const baseSlug = `${username.toLowerCase().replace(/[^a-z0-9]/g, "-")}-resume`;

    // Find existing resume for this user
    const existingResume = await prisma.resume.findFirst({
      where: { userId: session.user.id }
    });

    const resumeData = {
      profile,
      experience,
      skills,
      projects,
      education,
      awards,
      certifications,
      volunteer,
      languages,
      interests,
      references,
      sectionOrder
    };

    if (existingResume) {
      await prisma.resume.update({
        where: { id: existingResume.id },
        data: {
          data: resumeData,
          isPublic: isPublic ?? false,
          updatedAt: new Date()
        }
      });
      return NextResponse.json({ success: true, slug: existingResume.slug });
    } else {
      const newResume = await prisma.resume.create({
        data: {
          userId: session.user.id,
          title: "Main Resume",
          slug: baseSlug,
          data: resumeData,
          isPublic: isPublic ?? false
        }
      });
      return NextResponse.json({ success: true, slug: newResume.slug });
    }
  } catch (error: any) {
    console.error("RESUME_SAVE_ERROR", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
