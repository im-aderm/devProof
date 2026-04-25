import { Octokit } from "octokit";

export class GitHubService {
  private octokit: Octokit;

  constructor(accessToken?: string) {
    this.octokit = new Octokit({
      auth: accessToken || process.env.GITHUB_TOKEN, // Use system token if user token is missing
    });
  }

  async getUserProfile(username: string) {
    const { data } = await this.octokit.rest.users.getByUsername({
      username,
    });
    return data;
  }

  async getUserRepositories(username: string) {
    const { data } = await this.octokit.rest.repos.listForUser({
      username,
      sort: "updated",
      per_page: 100,
    });
    return data;
  }

  async getRepositoryLanguages(owner: string, repo: string) {
    const { data } = await this.octokit.rest.repos.listLanguages({
      owner,
      repo,
    });
    return data;
  }

  async getRepositoryReadme(owner: string, repo: string) {
    try {
      const { data } = await this.octokit.rest.repos.getReadme({
        owner,
        repo,
        headers: {
          accept: "application/vnd.github.raw",
        },
      });
      return data as unknown as string;
    } catch (error) {
      return null;
    }
  }
}
