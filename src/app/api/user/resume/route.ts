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

    let resume = await prisma.resumeProfile.findUnique({
      where: { userId },
    });

    if (!resume) {
      // Pre-fill with GitHub data if no resume exists
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          githubProfile: true,
          repositories: {
            orderBy: { stars: "desc" },
            take: 4,
          },
          aiReports: {
            where: { type: "USER_SUMMARY" },
            orderBy: { createdAt: "desc" },
            take: 1
          }
        },
      });

      const aiSummary = user?.aiReports[0] ? JSON.parse(user.aiReports[0].content) : null;

      const initialContent = {
        personal: {
          name: user?.name || "",
          email: user?.email || "",
          location: user?.githubProfile?.location || "",
          website: user?.githubProfile?.blog || "",
          github: user?.githubUsername || "",
          summary: aiSummary?.summary || user?.githubProfile?.bio || "",
        },
        experience: [
          {
            company: user?.githubProfile?.company || "Company Name",
            position: aiSummary?.persona || "Software Engineer",
            duration: "Present",
            description: "Built and maintained technical infrastructure...",
          }
        ],
        projects: user?.repositories.map(repo => ({
          name: repo.name,
          link: repo.url,
          description: repo.description || "Technical project built using " + repo.language,
          technologies: repo.language ? [repo.language] : [],
        })) || [],
        skills: aiSummary?.topSkills || [],
        education: [
          {
            school: "University Name",
            degree: "B.S. Computer Science",
            duration: "2018 - 2022",
          }
        ]
      };

      resume = await prisma.resumeProfile.create({
        data: {
          userId,
          content: initialContent as any,
          template: "modern",
        }
      });
    }

    return NextResponse.json(resume);
  } catch (error: any) {
    console.error("RESUME_GET_ERROR", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content, template } = await req.json();

    const resume = await prisma.resumeProfile.upsert({
      where: { userId: (session.user as any).id },
      update: { content, template },
      create: {
        userId: (session.user as any).id,
        content,
        template,
      },
    });

    return NextResponse.json(resume);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
