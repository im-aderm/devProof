import { NextResponse } from "next/server";
import { GitHubService } from "@/lib/github";

export async function GET(req: Request, { params }: { params: Promise<{ userA: string; userB: string }> }) {
  try {
    const resolvedParams = await params;
    const { userA, userB } = resolvedParams;

    const github = new GitHubService();

    const [userDataA, userDataB] = await Promise.all([
      fetchUserData(github, userA),
      fetchUserData(github, userB),
    ]);

    if (!userDataA || !userDataB) {
      return NextResponse.json({ error: "One or both users not found." }, { status: 404 });
    }

    const comparison = {
      userA: userDataA,
      userB: userDataB,
    };

    return NextResponse.json(comparison);
  } catch (error: any) {
    console.error("COMPARE_API_ERROR", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

async function fetchUserData(github: GitHubService, username: string) {
  try {
    const profile = await github.getUserProfile(username);
    const repos = await github.getAllUserRepositories(username);

    const publicRepos = repos.filter((r: any) => !r.private);
    const repoCount = publicRepos.length;
    const totalStars = publicRepos.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0);
    const topSkill = publicRepos[0]?.language || "N/A";
    const readinessScore = 80 + Math.floor(Math.random() * 20); // Mock

    return {
      readinessScore,
      topSkill,
      repoCount,
      totalStars,
    };
  } catch (e) {
    return null;
  }
}
