import { NextResponse } from "next/server";
import { GitHubService } from "@/lib/github";
import { rateLimit } from "@/lib/rate-limit";
import { getCachedData, setCachedData } from "@/lib/cache";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ owner: string; repo: string }> }
) {
  const resolvedParams = await params;
  const { owner, repo } = resolvedParams;

  if (!owner || !repo) {
    return NextResponse.json({ error: "Owner and Repo are required" }, { status: 400 });
  }

  const cacheKey = `review:${owner}/${repo}`;
  const cached = await getCachedData(cacheKey);
  if (cached) return NextResponse.json(cached);

  // 1. Rate Limiting
  const rl = await rateLimit(`review:${owner}/${repo}`, 3, 60000);
  if (!rl.success) {
    return NextResponse.json(
      { error: "AI Review is highly intensive. Please wait a minute." },
      { status: 429 }
    );
  }

  try {
    const github = new GitHubService();
    
    // 2. Fetch Repo Context
    const [repoData, treeData, readme] = await Promise.all([
      github.octokit.rest.repos.get({ owner, repo }).then(r => r.data),
      github.octokit.rest.git.getTree({ owner, repo, tree_sha: 'HEAD', recursive: 'true' }).then(r => r.data).catch(() => null),
      github.getRepositoryReadme(owner, repo),
    ]);

    // 3. Extract structure context
    const fileList = treeData?.tree
      .filter(item => item.type === 'blob')
      .map(item => item.path)
      .slice(0, 100)
      .join('\n');

    // 4. Perform AI Review
    const prompt = `
      You are an elite Senior Software Architect. Perform a deep structural and architectural review of the following public GitHub repository.
      
      Repo: ${repoData.full_name}
      Description: ${repoData.description || "N/A"}
      Primary Language: ${repoData.language}
      
      File Structure (partial):
      ${fileList}
      
      README Preview:
      ${readme?.substring(0, 1000) || "N/A"}
      
      Provide a comprehensive review in JSON format:
      - structureScore: (0-100)
      - readabilityScore: (0-100)
      - maintainabilityScore: (0-100)
      - observations: An array of 5 architectural observations.
      - suggestedRefactors: An array of 3 specific refactors.
      - missingPractices: An array of 3 missing engineering practices.
      - bestPracticesScore: (0-100)
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const review = JSON.parse(response.choices[0].message.content || "{}");

    const finalData = {
      repoData: {
        name: repoData.name,
        fullName: repoData.full_name,
        owner: repoData.owner.login,
      },
      review
    };

    await setCachedData(cacheKey, finalData, 3600);
    return NextResponse.json(finalData);
  } catch (error: any) {
    console.error("REVIEW_API_ERROR", error);
    return NextResponse.json(
      { error: "Failed to perform AI code review" },
      { status: 500 }
    );
  }
}
