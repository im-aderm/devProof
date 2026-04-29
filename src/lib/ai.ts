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
      You are an elite technical assessment agent. Analyze the following GitHub ledger and profile to generate a high-signal engineering intelligence report.
      
      Target Bio: ${profile.bio || "N/A"}
      Location: ${profile.location || "N/A"}
      Repository Matrix:
      ${repoDetails}
      
      Return a JSON object with this precise structure:
      - summary: A 2-3 sentence high-impact professional narrative. Avoid filler; focus on architectural depth and technical impact.
      - persona: A punchy, 2-4 word professional designation (e.g., "Distributed Systems Architect", "Full-Stack Security Specialist").
      - topSkills: Array of 5 most significant technical competencies identified from the codebase.
      - growthAreas: Array of 3 specific technical or documentation vectors for improvement.
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
      Perform an architectural summary of the following GitHub repository for a professional dossier.
      Identifier: ${repo.name}
      Description: ${repo.description || "N/A"}
      Primary Stack: ${repo.language}
      
      Synthesize the technical significance, core functionality, and architectural value.
      Maintain a professional, dense, and objective tone.
      Limit: 3 sentences. Plain text response only.
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
