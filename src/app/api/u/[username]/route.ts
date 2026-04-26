import { NextResponse } from "next/server";
import { GitHubService } from "@/lib/github";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateDynamicUserSummary(profile: any, repos: any[]) {
  try {
    const repoDetails = repos.map((r) => `${r.name}: ${r.description || "No description"} (${r.languages[0]?.name || "N/A"})`).join("\n");
    
    const prompt = `
      You are a technical recruiter assistant. Based on the following GitHub profile and repositories, 
      provide a professional summary of the developer's persona, top skills, and growth areas.
      
      Profile Bio: ${profile.bio || "N/A"}
      Location: ${profile.location || "N/A"}
      Repositories:
      ${repoDetails}
      
      Format the response as a JSON object with:
      - summary: A 2-3 sentence professional bio.
      - persona: A title for the developer (e.g., "Full-Stack System Architect").
      - topSkills: An array of 5 identified technical skills.
      - growthAreas: An array of 3 suggested areas for improvement.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message?.content || "{}");
  } catch (error) {
    console.error("AI_SUMMARY_ERROR", error);
    return null;
  }
}

export async function GET(req: Request, { params }: { params: Promise<{ username: string }> }) {
  try {
    const resolvedParams = await params;
    const { username } = resolvedParams;

    const github = new GitHubService();

    // Dynamic Public Analyzer
    try {
      const profile = await github.getUserProfile(username);
      const repos = await github.getAllUserRepositories(username);

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

      const aiSummary = await generateDynamicUserSummary(profile, repoData);

      const sortedLanguages = Object.entries(languageStats)
        .map(([name, size]) => ({ name, size }))
        .sort((a, b) => b.size - a.size);

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
        readinessScore: null,
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
