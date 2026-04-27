import { NextResponse } from "next/server";
import { GitHubService } from "@/lib/github";
import { rateLimit } from "@/lib/rate-limit";
import { getCachedData, setCachedData } from "@/lib/cache";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function GET(
  request: Request,
  { params }: { params: Promise<{ owner: string; repo: string }> }
) {
  const resolvedParams = await params;
  const { owner, repo } = resolvedParams;
  const session = await getServerSession(authOptions);

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
    const repoData = await github.octokit.rest.repos.get({ owner, repo }).then(r => r.data);
    
    const [treeData, readme] = await Promise.all([
      github.octokit.rest.git.getTree({ 
        owner, 
        repo, 
        tree_sha: repoData.default_branch || 'HEAD', 
        recursive: 'true' 
      }).then(r => r.data).catch(() => null),
      github.getRepositoryReadme(owner, repo),
    ]);

    // 3. Extract structure context
    const fileList = treeData?.tree
      ? treeData.tree
          .filter((item: any) => item.type === 'blob')
          .map((item: any) => item.path)
          .slice(0, 100)
          .join('\n')
      : "N/A";

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
      
      Provide a comprehensive review strictly in JSON format:
      - structureScore: (0-100)
      - readabilityScore: (0-100)
      - maintainabilityScore: (0-100)
      - observations: An array of 5 architectural observations.
      - suggestedRefactors: An array of 3 specific refactors.
      - missingPractices: An array of 3 missing engineering practices.
      - bestPracticesScore: (0-100)
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonStr = text.replace(/```json\n?|\n?```/g, "").trim();
    
    let review;
    try {
      review = JSON.parse(jsonStr || "{}");
    } catch (parseError) {
      console.error("REVIEW_JSON_PARSE_ERROR", parseError, "Raw text:", text);
      review = {
        structureScore: 50,
        readabilityScore: 50,
        maintainabilityScore: 50,
        observations: ["Automated review analysis failed to parse. Manual audit recommended."],
        suggestedRefactors: [],
        missingPractices: [],
        bestPracticesScore: 50
      };
    }

    const finalData = {
      repoData: {
        name: repoData.name,
        fullName: repoData.full_name,
        owner: repoData.owner.login,
      },
      review
    };

    // 5. Persist if logged in
    if (session?.user?.id) {
      await prisma.report.create({
        data: {
          userId: session.user.id,
          type: "review",
          targetA: repoData.full_name,
          score: review.structureScore,
          summary: review.observations?.[0] || "Architecture review completed.",
          payload: JSON.stringify(finalData),
        },
      });
    }

    await setCachedData(cacheKey, finalData, 3600);
    return NextResponse.json(finalData);
  } catch (error: any) {
    console.error("REVIEW_API_ERROR_FULL", {
      message: error.message,
      stack: error.stack,
      status: error.status,
    });
    return NextResponse.json(
      { error: `Failed to perform AI code review: ${error.message}` },
      { status: 500 }
    );
  }
}
