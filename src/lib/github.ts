import { Octokit } from "octokit";

export class GitHubService {
  public octokit: Octokit;

  constructor(accessToken?: string) {
    const token = accessToken || process.env.GITHUB_TOKEN;
    if (!token) {
      console.warn("GitHubService: GITHUB_TOKEN is missing. Requests will be unauthenticated and rate-limited.");
    }
    this.octokit = new Octokit({
      auth: token,
    });
  }

  async getUserProfile(username: string) {
    const { data } = await this.octokit.rest.users.getByUsername({
      username,
    });
    return data;
  }

  /**
   * Fetches all public repositories for a user (beyond the 100 limit).
   */
  async getAllUserRepositories(username: string) {
    let allRepos: any[] = [];
    let page = 1;
    const perPage = 100;

    while (true) {
      const { data } = await this.octokit.rest.repos.listForUser({
        username,
        sort: "updated",
        per_page: perPage,
        page,
        type: "public",
      });

      allRepos = [...allRepos, ...data];
      if (data.length < perPage) break;
      page++;
    }

    return allRepos;
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

  async getSearchCount(q: string) {
    const { data } = await this.octokit.rest.search.issuesAndPullRequests({
      q,
      per_page: 1,
    });
    return data.total_count;
  }

  async getUserCollaborationStats(username: string) {
    const [prCount, issueCount, reviewCount] = await Promise.all([
      this.getSearchCount(`author:${username} type:pr`),
      this.getSearchCount(`author:${username} type:issue`),
      this.getSearchCount(`commenter:${username} type:pr`),
    ]);

    return { prCount, issueCount, reviewCount };
  }

  /**
   * Fetches full repository details including languages in parallel.
   */
  async getDetailedRepositories(username: string, limit = 10) {
    const repos = await this.getAllUserRepositories(username);
    const subset = repos.slice(0, limit);

    const detailedRepos = await Promise.all(
      subset.map(async (repo) => {
        const languages = await this.getRepositoryLanguages(username, repo.name);
        return {
          ...repo,
          languages,
        };
      })
    );

    return detailedRepos;
  }
}
