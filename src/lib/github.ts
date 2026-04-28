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

  /**
   * Checks current rate limits to prevent unnecessary 403s.
   */
  async checkRateLimit() {
    try {
      const { data } = await this.octokit.rest.rateLimit.get();
      return data.resources.core;
    } catch (e) {
      return null;
    }
  }

  async getUserProfile(username: string) {
    const { data } = await this.octokit.rest.users.getByUsername({
      username,
    });
    return data;
  }

  /**
   * Fetches public repositories for a user.
   * @param max Optional limit on how many repos to fetch.
   */
  async getUserRepositories(username: string, max?: number) {
    let allRepos: any[] = [];
    let page = 1;
    const perPage = max && max < 100 ? max : 100;

    try {
      // Try to get authenticated user to see if we should fetch private repos
      const { data: authUser } = await this.octokit.rest.users.getAuthenticated();
      const isSelf = authUser.login === username;

      while (true) {
        let response;
        if (isSelf) {
          response = await this.octokit.rest.repos.listForAuthenticatedUser({
            sort: "updated",
            per_page: perPage,
            page,
            visibility: "all",
            affiliation: "owner",
          });
        } else {
          response = await this.octokit.rest.repos.listForUser({
            username,
            sort: "updated",
            per_page: perPage,
            page,
            type: "owner",
          });
        }

        allRepos = [...allRepos, ...response.data];
        if (response.data.length < perPage || (max && allRepos.length >= max)) break;
        page++;
      }
    } catch (error) {
      // Fallback to public list if authenticated user fails or isn't the same
      while (true) {
        const { data } = await this.octokit.rest.repos.listForUser({
          username,
          sort: "updated",
          per_page: perPage,
          page,
          type: "owner",
        });

        allRepos = [...allRepos, ...data];
        if (data.length < perPage || (max && allRepos.length >= max)) break;
        page++;
      }
    }

    return max ? allRepos.slice(0, max) : allRepos;
  }

  // Legacy name for compatibility
  async getAllUserRepositories(username: string) {
    return this.getUserRepositories(username);
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
    try {
      const { data } = await this.octokit.rest.search.issuesAndPullRequests({
        q,
        per_page: 1,
      });
      return data.total_count;
    } catch (error) {
      return 0;
    }
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
   * Fetches full repository details including languages and topics in parallel.
   */
  async getDetailedRepositories(username: string, limit = 10) {
    try {
      // 1. Fetch repositories
      const repos = await this.getUserRepositories(username, limit);
      
      // 2. Concurrency Control: Fetch languages in small batches to avoid secondary rate limits
      const detailedRepos = [];
      const batchSize = 3;
      
      for (let i = 0; i < repos.length; i += batchSize) {
        const batch = repos.slice(i, i + batchSize);
        const batchResults = await Promise.all(
          batch.map(async (repo) => {
            try {
              const languages = await this.getRepositoryLanguages(username, repo.name);
              return {
                ...repo,
                languages,
                topics: repo.topics || [],
              };
            } catch (e) {
              console.error(`[GitHubService] Error fetching details for ${repo.name}:`, e);
              return {
                ...repo,
                languages: {},
                topics: repo.topics || [],
              };
            }
          })
        );
        detailedRepos.push(...batchResults);
      }

      return detailedRepos;
    } catch (error) {
      console.error("[GitHubService] Failed to get detailed repositories:", error);
      return [];
    }
  }

  async getUserOrganizations(username: string) {
    try {
      const { data } = await this.octokit.rest.orgs.listForUser({
        username,
      });
      return data.map(org => ({
        login: org.login,
        avatar_url: org.avatar_url,
        description: org.description,
      }));
    } catch (error) {
      return [];
    }
  }

  /**
   * Fetches contribution heatmap data using GitHub GraphQL API.
   */
  async getContributionHeatmap(username: string) {
    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                  color
                }
              }
            }
          }
        }
      }
    `;

    try {
      const response: any = await this.octokit.graphql(query, { username });
      return response.user.contributionsCollection.contributionCalendar;
    } catch (error) {
      console.error("GITHUB_GRAPHQL_ERROR", error);
      return null;
    }
  }
}
