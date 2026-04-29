import { NextResponse } from "next/server";
import { GitHubService } from "@/lib/github";
import { rateLimit } from "@/lib/rate-limit";
import { getCachedData, setCachedData } from "@/lib/cache";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const cacheKey = `search:${q}`;
  const cached = await getCachedData(cacheKey);
  if (cached) return NextResponse.json(cached);

  const rl = await rateLimit(`search:${q}`, 10, 60000);
  if (!rl.success) {
    return NextResponse.json({ error: "Too many search requests" }, { status: 429 });
  }

  try {
    const github = new GitHubService();
    
    // Perform parallel search for users and repositories
    const [userRes, repoRes] = await Promise.all([
      github.octokit.rest.search.users({ q, per_page: 5 }),
      github.octokit.rest.search.repos({ q, per_page: 5 }),
    ]);

    const results = [
      ...userRes.data.items.map((u: any) => ({
        id: u.id,
        title: u.login,
        type: "user",
        image: u.avatar_url,
        url: `/u/${u.login}`
      })),
      ...repoRes.data.items.map((r: any) => ({
        id: r.id,
        title: r.full_name,
        type: "repo",
        description: r.description,
        url: `/repo/${r.full_name}`
      }))
    ];

    const responseData = { results };
    await setCachedData(cacheKey, responseData, 300); // 5 mins cache

    return NextResponse.json(responseData);
  } catch (error: any) {
    console.error("SEARCH_API_ERROR", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
