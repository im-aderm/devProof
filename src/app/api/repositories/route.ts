import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { GitHubService } from "@/lib/github";
import { ScoringEngine } from "@/lib/scoring";
import { getCachedData, setCachedData } from "@/lib/cache";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.githubUsername) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const sort = searchParams.get("sort") || "updated";

  const cacheKey = `repos:${session.user.githubUsername}:${page}:${limit}:${sort}`;
  const cached = await getCachedData(cacheKey);
  if (cached) return NextResponse.json(cached);

  try {
    const github = new GitHubService(session.accessToken as string);
    const repos = await github.getUserRepositories(session.user.githubUsername);

    // Sort repos
    const sortedRepos = [...repos].sort((a: any, b: any) => {
        if (sort === "stars") return b.stargazers_count - a.stargazers_count;
        if (sort === "name") return a.name.localeCompare(b.name);
        return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
    });

    const paginatedRepos = sortedRepos.slice((page - 1) * limit, page * limit);

    const enrichedRepos = paginatedRepos.map(repo => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        pushedAt: repo.pushed_at,
        score: ScoringEngine.calculateComplexityScore(repo.stargazers_count, repo.forks_count, !!repo.language)
    }));

    const responseData = {
        repositories: enrichedRepos,
        total: repos.length,
        page,
        totalPages: Math.ceil(repos.length / limit)
    };

    await setCachedData(cacheKey, responseData, 600); // 10 mins cache

    return NextResponse.json(responseData);
  } catch (error: any) {
    console.error("REPOS_API_ERROR", error);
    return NextResponse.json({ error: "Failed to fetch repositories" }, { status: 500 });
  }
}
