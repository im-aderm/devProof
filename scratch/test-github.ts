import { GitHubService } from "../src/lib/github";
import * as dotenv from "dotenv";

dotenv.config();

async function testFetch(username: string) {
  try {
    console.log(`Using GitHubService to fetch for ${username}...`);
    const github = new GitHubService();
    
    const profile = await github.getUserProfile(username);
    console.log("Profile fetched successfully:", profile.login);

    const repos = await github.getDetailedRepositories(username, 5);
    console.log(`Fetched ${repos.length} detailed repos.`);

    for (const repo of repos) {
        console.log(`Repo: ${repo.name}, Languages:`, Object.keys(repo.languages));
    }

    const collab = await github.getUserCollaborationStats(username);
    console.log("Collab stats:", collab);

  } catch (error: any) {
    console.error("Fetch failed!");
    console.error("Status:", error.status);
    console.error("Message:", error.message);
  }
}

testFetch("octocat");
