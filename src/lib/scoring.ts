export class ScoringEngine {
  /**
   * Calculates a score based on README content and length.
   */
  static calculateReadmeScore(readme: string | null): number {
    if (!readme) return 0;
    
    let score = 20; // Base score for having a README
    
    // Length check
    if (readme.length > 500) score += 20;
    if (readme.length > 2000) score += 20;
    
    // Keywords check (best practices)
    const keywords = ["installation", "usage", "license", "contributing", "getting started", "features"];
    keywords.forEach(word => {
      if (readme.toLowerCase().includes(word)) score += 5;
    });

    return Math.min(score, 100);
  }

  /**
   * Calculates a complexity score based on metadata.
   */
  static calculateComplexityScore(stars: number, forks: number, language: string | null): number {
    let score = 40; // Base score
    
    score += Math.min(stars * 2, 30); // Stars impact
    score += Math.min(forks * 5, 20); // Forks impact
    
    if (language) score += 10; // Extra points for defined language
    
    return Math.min(score, 100);
  }

  /**
   * Calculates freshness score based on last update.
   */
  static calculateFreshnessScore(pushedAt: Date): number {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - pushedAt.getTime()) / (1000 * 3600 * 24));
    
    if (diffInDays < 30) return 100;
    if (diffInDays < 90) return 80;
    if (diffInDays < 180) return 50;
    if (diffInDays < 365) return 30;
    
    return 10;
  }

  /**
   * Calculates MLH/Internship Readiness Score.
   * Weights:
   * - Project Quality: 30% (README, Complexity)
   - Consistency: 20% (Freshness)
   - Collaboration: 15% (Mocked for now - ideally from contributions/PRs)
   - Documentation: 15% (README score)
   - Technical Breadth: 20% (Number of languages, diversity)
   */
  static calculateReadinessScore(repoMetrics: any[], userProfile: any, languages: any[]): { score: number; recommendations: string[]; checklist: { name: string; score: number }[] } {
    let projectQuality = 0;
    let consistency = 0;
    let collaboration = 0; // Mocked for now
    let documentation = 0;
    let technicalBreadth = 0;

    // Project Quality (average of README and Complexity, if available)
    if (repoMetrics && repoMetrics.length > 0) {
      const avgReadme = repoMetrics.reduce((acc, m) => acc + (m?.readmeScore || 0), 0) / repoMetrics.length;
      const avgComplexity = repoMetrics.reduce((acc, m) => acc + (m?.complexity || 0), 0) / repoMetrics.length;
      projectQuality = Math.round((avgReadme + avgComplexity) / 2);
    }

    // Freshness / Consistency
    if (repoMetrics && repoMetrics.length > 0) {
        const latestRepo = repoMetrics.sort((a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime())[0];
        consistency = ScoringEngine.calculateFreshnessScore(new Date(latestRepo.pushedAt));
    }

    // Documentation (based on README score)
    documentation = projectQuality * 0.75; // Assume README is a big part of doc score

    // Technical Breadth
    const uniqueLanguages = new Set(repoMetrics.flatMap(r => r.languages.map((l: any) => l.name)));
    technicalBreadth = Math.min(uniqueLanguages.size * 10, 100);

    // Mock Collaboration Score
    collaboration = 75; 

    const totalScore = Math.round(
      (projectQuality * 0.30) +
      (consistency * 0.20) +
      (collaboration * 0.15) +
      (documentation * 0.15) +
      (technicalBreadth * 0.20)
    );

    const recommendations = [];
    if (projectQuality < 70) recommendations.push("Improve READMEs and project complexity for better quality scores.");
    if (consistency < 70) recommendations.push("Maintain consistent commit activity across your repositories.");
    if (collaboration < 70) recommendations.push("Consider contributing to open-source projects or collaborating on team projects.");
    if (documentation < 70) recommendations.push("Ensure all projects have clear documentation, including setup and usage instructions.");
    if (technicalBreadth < 70) recommendations.push("Explore new programming languages or frameworks to broaden your technical scope.");

    const checklist = [
      { name: "Project Quality", score: projectQuality },
      { name: "Consistency", score: consistency },
      { name: "Collaboration", score: collaboration },
      { name: "Documentation", score: documentation },
      { name: "Technical Breadth", score: technicalBreadth },
    ];

    return { score: totalScore, recommendations, checklist };
  }
}
