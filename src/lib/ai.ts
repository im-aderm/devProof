import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
// Use gemini-1.5-flash as it has more stable free-tier quotas than 2.0-flash
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export class AIService {
  /**
   * Generates a professional summary of a developer based on their profile and repositories.
   */
  static async generateUserSummary(profile: any, repos: any[]) {
    const repoDetails = repos
      .map(r => `${r.name}: ${r.description || "No description"} (${r.language})`)
      .join("\n");
    
    const prompt = `
      You are a technical recruiter assistant. Based on the following GitHub profile and repositories, 
      provide a professional summary of the developer's persona, top skills, and growth areas.
      
      Profile Bio: ${profile.bio || "N/A"}
      Location: ${profile.location || "N/A"}
      Repositories:
      ${repoDetails}
      
      Return the response strictly as a JSON object with:
      - summary: A 2-3 sentence professional bio.
      - persona: A title for the developer (e.g., "Full-Stack System Architect").
      - topSkills: An array of 5 identified technical skills.
      - growthAreas: An array of 3 suggested areas for improvement.
    `;

    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      // Clean up potential markdown code blocks from Gemini response
      const jsonStr = text.replace(/```json\n?|\n?```/g, "").trim();
      
      try {
        return JSON.parse(jsonStr || "{}");
      } catch (parseError) {
        console.error("AI_JSON_PARSE_ERROR", parseError, "Raw text:", text);
        return {
          summary: "Could not parse detailed summary, but profile indicates active development.",
          persona: "Developer",
          topSkills: [],
          growthAreas: []
        };
      }
    } catch (error: any) {
      console.error("AI_USER_SUMMARY_ERROR", error);
      
      // Specific handling for quota errors
      if (error?.message?.includes("429") || error?.message?.includes("quota")) {
        return {
          summary: "Deep analysis is currently paused due to API rate limits. Please wait a moment or try again later.",
          persona: "Developer (Analyzing...)",
          topSkills: ["GitHub Proficiency"],
          growthAreas: ["Analyze Profile Later"]
        };
      }

      return {
        summary: "Profile summary unavailable at this time.",
        persona: "Developer",
        topSkills: [],
        growthAreas: []
      };
    }
  }

  /**
   * Generates a professional summary for a single repository.
   */
  static async generateRepoSummary(repo: any) {
    const prompt = `
      Summarize the following GitHub repository professionally for a portfolio.
      Name: ${repo.name}
      Description: ${repo.description || "N/A"}
      Language: ${repo.language}
      
      Explain what the project likely does and why it is technically significant.
      Max 3 sentences. Return as a plain string.
    `;

    try {
      const result = await model.generateContent(prompt);
      return result.response.text().trim();
    } catch (error) {
      console.error("AI_REPO_SUMMARY_ERROR", error);
      return "Repository summary unavailable.";
    }
  }
}
