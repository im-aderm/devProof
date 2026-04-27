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
    const repos = await github.getDetailedRepositories(username, 10); // Limit to top 10

    const totalStars = repos.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0);
    const topSkill = repos[0]?.language || "N/A";
    
    // Simple weighted calculation for compare summary
    const repoCountScore = Math.min(profile.public_repos * 2, 30);
    const starScore = Math.min(totalStars * 5, 40);
    const followerScore = Math.min(profile.followers * 2, 30);
    const readinessScore = repoCountScore + starScore + followerScore;

    return {
      readinessScore,
      topSkill,
      repoCount: profile.public_repos,
      totalStars,
    };
  } catch (e) {
    return null;
  }
}
