import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { GitHubService } from "@/lib/github";
import { AIService } from "@/lib/ai";

export async function GET(req: Request, { params }: { params: Promise<{ username: string }> }) {
  try {
    const resolvedParams = await params;
    const { username } = resolvedParams;
    const session = await getServerSession(authOptions);

    let targetUsername = username;
    if (username === "profile") {
      if (!session?.user?.githubUsername) {
        return NextResponse.json({ error: "No session found. Please login." }, { status: 401 });
      }
      targetUsername = session.user.githubUsername;
    }

    const github = new GitHubService(session?.accessToken as string);

    // Dynamic Public Analyzer
    try {
      const profile = await github.getUserProfile(targetUsername);
      const repos = await github.getAllUserRepositories(targetUsername);

      const publicRepos = repos
        .filter((r: any) => !r.private)
        .sort((a: any, b: any) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
        .slice(0, 6);

      // Fetch languages for top repos
      const languageStats: Record<string, number> = {};
      const repoData = await Promise.all(publicRepos.map(async (repo: any) => {
        try {
          const langs = await github.getRepositoryLanguages(username, repo.name);
          
          const repoLangs = Object.entries(langs).map(([name, size]) => {
            languageStats[name] = (languageStats[name] || 0) + (size as number);
            return { name, size };
          });

          return {
            id: repo.id.toString(),
            name: repo.name,
            description: repo.description,
            url: repo.html_url,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            languages: repoLangs,
          };
        } catch (e) {
          return {
            id: repo.id.toString(),
            name: repo.name,
            description: repo.description,
            url: repo.html_url,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            languages: [],
          };
        }
      }));

      const aiSummary = await AIService.generateUserSummary(profile, repoData);
      const heatmap = await github.getContributionHeatmap(username);

      const sortedLanguages = Object.entries(languageStats)
        .map(([name, size]) => ({ name, size }))
        .sort((a, b) => b.size - a.size);

      // Calculate a dynamic score based on real metrics
      const totalStars = repoData.reduce((acc, r) => acc + (r.stars || 0), 0);
      const totalContributions = heatmap?.totalContributions || 0;
      const baseScore = 60;
      const starBonus = Math.min(20, totalStars * 2);
      const contributionBonus = Math.min(20, Math.floor(totalContributions / 50));
      const readinessScore = Math.min(99, baseScore + starBonus + contributionBonus);

      return NextResponse.json({
        user: {
          name: profile.name || profile.login,
          image: profile.avatar_url,
          githubUsername: profile.login,
        },
        profile: {
          bio: profile.bio,
          publicRepos: profile.public_repos,
          followers: profile.followers,
          following: profile.following,
          location: profile.location,
          company: profile.company,
          blog: profile.blog,
          twitter: profile.twitter_username,
        },
        repos: repoData,
        aiSummary,
        languages: sortedLanguages.slice(0, 8),
        readinessScore,
        heatmap,
      });

    } catch (githubError: any) {
      if (githubError.status === 404) {
        return NextResponse.json({ error: "Portfolio not found on GitHub" }, { status: 404 });
      }
      throw githubError;
    }
  } catch (error) {
    console.error("PORTFOLIO_API_ERROR", error);
    return NextResponse.json(
      { error: "Internal server error", code: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}
