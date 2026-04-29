import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { GitHubService } from "@/lib/github";
import { AIService } from "@/lib/ai";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user || !session.user.githubUsername) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const username = session.user.githubUsername;
  const accessToken = session.accessToken as string;

  try {
    const resume = await prisma.resume.findFirst({
      where: { userId: session.user.id },
      orderBy: { updatedAt: 'desc' }
    });

    if (resume) {
      const data = typeof resume.data === "string" ? JSON.parse(resume.data) : resume.data;
      return NextResponse.json({
        ...(data as any || {}),
        isPublic: resume.isPublic,
        slug: resume.slug
      });
    }

    // Generate Defaults from GitHub
    const github = new GitHubService(accessToken);
    
    const [profile, repos] = await Promise.all([
      github.getUserProfile(username),
      github.getDetailedRepositories(username, 15),
    ]);

    const aiSummary = await AIService.generateUserSummary(profile, repos);

    const experience = repos.slice(0, 3).map(repo => ({
      company: repo.owner.login === username ? "Independent Developer" : repo.owner.login,
      role: "Lead Contributor",
      startDate: repo.created_at ? repo.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
      endDate: "",
      isCurrent: false,
      desc: repo.description || `Focused on technical excellence in ${repo.name}.`
    }));

    const technicalSkills = Array.from(new Set(repos.flatMap(r => Object.keys(r.languages || {})))).slice(0, 10);

    const resumeData = {
      profile: {
        name: profile.name || profile.login,
        title: aiSummary.persona || "Software Engineer",
        email: profile.email || `${profile.login}@users.noreply.github.com`,
        phone: profile.phone || "",
        location: profile.location || "Remote",
        linkedin: "",
        github: `github.com/${profile.login}`,
        portfolio: profile.blog || "",
        website: profile.blog || "",
        summary: aiSummary.summary
      },
      experience,
      education: [],
      skills: {
        technical: technicalSkills,
        soft: ["Leadership", "Communication", "Problem Solving"]
      },
      projects: repos.slice(0, 4).map(r => ({
        name: r.name,
        description: r.description,
        url: r.html_url
      })),
      awards: [],
      volunteer: [],
      languages: [
        { name: "English", level: "Professional" }
      ],
      interests: ["Open Source", "AI", "System Design"],
      references: "Available on request",
      sectionOrder: ["experience", "projects", "education", "skills", "awards", "volunteer", "languages", "interests"]
    };

    return NextResponse.json(resumeData);

  } catch (error: any) {
    console.error("RESUME_DATA_API_ERROR", error);
    return NextResponse.json({ error: error.message || "Failed to fetch resume data" }, { status: 500 });
  }
}
