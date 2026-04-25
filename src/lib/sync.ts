import { prisma } from "./prisma";
import { GitHubService } from "./github";

export class SyncService {
  private githubService: GitHubService;
  private userId: string;
  private githubUsername: string;

  constructor(userId: string, githubUsername: string, accessToken?: string) {
    this.userId = userId;
    this.githubUsername = githubUsername;
    this.githubService = new GitHubService(accessToken);
  }

  async syncFullProfile() {
    const syncLog = await prisma.syncLog.create({
      data: {
        userId: this.userId,
        status: "IN_PROGRESS",
      },
    });

    try {
      // 1. Sync Profile
      const profileData = await this.githubService.getUserProfile(this.githubUsername);
      await prisma.githubProfile.upsert({
        where: { userId: this.userId },
        update: {
          bio: profileData.bio,
          publicRepos: profileData.public_repos,
          followers: profileData.followers,
          following: profileData.following,
          location: profileData.location,
          company: profileData.company,
          blog: profileData.blog,
          twitter: profileData.twitter_username,
          lastSyncedAt: new Date(),
        },
        create: {
          userId: this.userId,
          bio: profileData.bio,
          publicRepos: profileData.public_repos,
          followers: profileData.followers,
          following: profileData.following,
          location: profileData.location,
          company: profileData.company,
          blog: profileData.blog,
          twitter: profileData.twitter_username,
        },
      });

      // 2. Sync Repositories
      const repos = await this.githubService.getUserRepositories(this.githubUsername);
      
      for (const repo of repos) {
        const dbRepo = await prisma.repository.upsert({
          where: { githubId: repo.id },
          update: {
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description,
            url: repo.html_url,
            homepage: repo.homepage,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
            isPrivate: repo.private,
            pushedAt: new Date(repo.pushed_at!),
            updatedAt: new Date(repo.updated_at!),
          },
          create: {
            userId: this.userId,
            githubId: repo.id,
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description,
            url: repo.html_url,
            homepage: repo.homepage,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
            isPrivate: repo.private,
            pushedAt: new Date(repo.pushed_at!),
            createdAt: new Date(repo.created_at!),
            updatedAt: new Date(repo.updated_at!),
          },
        });

        // 3. Sync Languages for each repo
        const languages = await this.githubService.getRepositoryLanguages(
          this.githubUsername,
          repo.name
        );

        // Delete old languages and create new ones (simplest sync strategy)
        await prisma.repositoryLanguage.deleteMany({
          where: { repositoryId: dbRepo.id },
        });

        await prisma.repositoryLanguage.createMany({
          data: Object.entries(languages).map(([name, size]) => ({
            repositoryId: dbRepo.id,
            name,
            size: size as number,
          })),
        });
      }

      await prisma.syncLog.update({
        where: { id: syncLog.id },
        data: {
          status: "SUCCESS",
          endedAt: new Date(),
        },
      });

      return { success: true };
    } catch (error: any) {
      console.error("SYNC_ERROR", error);
      await prisma.syncLog.update({
        where: { id: syncLog.id },
        data: {
          status: "FAILED",
          error: error.message,
          endedAt: new Date(),
        },
      });
      throw error;
    }
  }
}
