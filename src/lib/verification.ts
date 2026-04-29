import { prisma } from "./prisma";
import { v4 as uuidv4 } from "uuid";
import { GitHubService } from "./github";

export type VerificationType = "github_project" | "github_contribution" | "email" | "identity" | "work";
export type VerificationStatus = "verified" | "pending" | "unverified";

export class VerificationService {
  static async generateEmailVerificationToken(email: string) {
    const token = uuidv4();
    const expires = new Date(Date.now() + 3600 * 1000); // 1 hour

    await prisma.verificationToken.upsert({
      where: { identifier_token: { identifier: email, token } },
      update: { token, expires },
      create: { identifier: email, token, expires }
    });

    return token;
  }
  static async calculateTrustScore(resumeId: string): Promise<number> {
    const signals = await prisma.verificationSignal.findMany({
      where: { resumeId, status: "verified" }
    });

    if (signals.length === 0) return 10; // Base score for having a profile

    let score = 20; // Starting score for any verified data

    signals.forEach(signal => {
      switch (signal.type) {
        case "identity": score += 20; break;
        case "github_contribution": score += 25; break;
        case "github_project": score += 10; break; // per project up to a limit
        case "email": score += 5; break;
        case "work": score += 15; break;
      }
    });

    return Math.min(score, 100);
  }

  static async generateSignalsForResume(resumeId: string, userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { accounts: true }
    });

    const resume = await prisma.resume.findUnique({
      where: { id: resumeId }
    });

    if (!user || !resume) return;

    const signals: { type: VerificationType, status: VerificationStatus, payload?: any }[] = [];

    // 1. Identity Verification (GitHub Connected)
    const githubAccount = user.accounts.find(a => a.provider === "github");
    if (githubAccount) {
      signals.push({
        type: "identity",
        status: "verified",
        payload: { provider: "github", providerAccountId: githubAccount.providerAccountId }
      });
    }

    // 2. Email Verification
    if (user.emailVerified) {
      signals.push({
        type: "email",
        status: "verified"
      });
    }

    // 3. GitHub Project Verification (Live check)
    const resumeData = typeof resume.data === "string" ? JSON.parse(resume.data) : resume.data as any;
    if (resumeData.projects && Array.isArray(resumeData.projects) && githubAccount) {
      const github = new GitHubService(githubAccount.access_token as string);
      
      for (const project of resumeData.projects) {
        if (project.url && project.url.includes("github.com")) {
          try {
            const parts = project.url.split("github.com/")[1].split("/");
            const owner = parts[0];
            const repoName = parts[1];

            if (owner && repoName) {
              const repo = await github.octokit.rest.repos.get({ owner, repo: repoName });
              if (repo.data) {
                // Verify if user is actually a contributor or owner
                const { data: participation } = await github.octokit.rest.repos.getParticipationStats({
                  owner,
                  repo: repoName
                });

                const isOwner = repo.data.owner.login.toLowerCase() === user.username?.toLowerCase();
                
                const hasCommits = participation.owner && (participation.owner as number[]).some(c => c > 0);

                if (isOwner || hasCommits) {
                  signals.push({
                    type: "github_project",
                    status: "verified",
                    payload: { name: project.name, url: project.url, isOwner }
                  });
                }
              }
            }
          } catch (e) {
            console.error(`Verification failed for ${project.url}`, e);
          }
        }
      }
    }

    // 4. GitHub Contributions (Live heatmap check)
    if (githubAccount && user.username) {
        const github = new GitHubService(githubAccount.access_token as string);
        const heatmap = await github.getContributionHeatmap(user.username);
        
        if (heatmap && heatmap.totalContributions > 0) {
            signals.push({
                type: "github_contribution",
                status: "verified",
                payload: { 
                    totalContributions: heatmap.totalContributions,
                    message: `Verified ${heatmap.totalContributions} contributions in the last year`
                }
            });
        }
    }

    // Clear existing and save new
    await prisma.verificationSignal.deleteMany({ where: { resumeId } });
    
    await Promise.all(signals.map(s => 
      prisma.verificationSignal.create({
        data: {
          resumeId,
          type: s.type,
          status: s.status,
          payload: s.payload
        }
      })
    ));
  }
}
