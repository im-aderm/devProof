// ---------------------------------------------------------------------------
// Pure functional scoring engine for public GitHub analysis
// ---------------------------------------------------------------------------

export interface RepoMetrics {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  pushedAt: string;
  languages: Record<string, number>;
  readme?: string | null;
}

export interface ReadinessResult {
  score: number;
  projectQuality: number;
  consistency: number;
  collaboration: number;
  documentation: number;
  technicalBreadth: number;
  recommendations: string[];
  checklist: { name: string; score: number }[];
}

export class ScoringEngine {
  /**
   * Calculates a score based on README content and length.
   */
  static calculateReadmeScore(readme: string | null): number {
    if (!readme) return 0;

    let score = 20; // Base score for having a README

    if (readme.length > 500) score += 20;
    if (readme.length > 2000) score += 20;

    const keywords = ["installation", "usage", "license", "contributing", "getting started", "features"];
    keywords.forEach((word) => {
      if (readme.toLowerCase().includes(word)) score += 5;
    });

    return Math.min(score, 100);
  }

  /**
   * Calculates a complexity score based on metadata.
   */
  static calculateComplexityScore(stars: number, forks: number, hasLanguage: boolean): number {
    let score = 40; // Base score
    score += Math.min(stars * 2, 30);
    score += Math.min(forks * 5, 20);
    if (hasLanguage) score += 10;
    return Math.min(score, 100);
  }

  /**
   * Calculates freshness score based on last push date.
   */
  static calculateFreshnessScore(pushedAt: string): number {
    const pushDate = new Date(pushedAt);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - pushDate.getTime()) / (1000 * 3600 * 24));

    if (diffInDays < 30) return 100;
    if (diffInDays < 90) return 80;
    if (diffInDays < 180) return 50;
    if (diffInDays < 365) return 30;

    return 10;
  }

  /**
   * Calculates Public GitHub Readiness Score.
   */
  static calculateReadinessScore(repos: RepoMetrics[], profile?: any): ReadinessResult {
    let projectQuality = 0;
    let consistency = 0;
    let documentation = 0;
    let technicalBreadth = 0;

    if (repos.length > 0) {
      // Project Quality — based on metadata and README scores (if available)
      const qualityScores = repos.map(r => {
        const comp = this.calculateComplexityScore(r.stars, r.forks, !!r.language);
        const read = r.readme !== undefined ? this.calculateReadmeScore(r.readme) : 50; // default if not fetched
        return (comp + read) / 2;
      });
      projectQuality = Math.round(qualityScores.reduce((a, b) => a + b, 0) / repos.length);

      // Consistency — freshness of most recently pushed repo
      const sortedRepos = [...repos].sort((a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime());
      consistency = this.calculateFreshnessScore(sortedRepos[0].pushedAt);

      // Documentation — derived from project quality
      documentation = Math.round(projectQuality * 0.8);

      // Technical Breadth — unique languages across all repos
      const uniqueLanguages = new Set(repos.flatMap((r) => Object.keys(r.languages)));
      technicalBreadth = Math.min(uniqueLanguages.size * 10, 100);
    }

    // Collaboration: Use real stats if provided, otherwise estimate from repo metadata
    const collaboration = profile?.prCount !== undefined
      ? Math.min(profile.prCount * 5 + profile.issueCount * 2 + profile.reviewCount * 5, 100)
      : Math.min(repos.reduce((acc, r) => acc + r.forks, 0) * 2, 100);

    const totalScore = Math.round(
      projectQuality * 0.3 +
        consistency * 0.2 +
        collaboration * 0.15 +
        documentation * 0.15 +
        technicalBreadth * 0.2
    );

    const recommendations: string[] = [];
    if (projectQuality < 70) recommendations.push("Increase repository complexity and stars.");
    if (consistency < 70) recommendations.push("Maintain more frequent commit activity.");
    if (documentation < 70) recommendations.push("Improve README quality across projects.");
    if (technicalBreadth < 70) recommendations.push("Broaden your tech stack across more languages.");

    return {
      score: totalScore,
      projectQuality,
      consistency,
      collaboration,
      documentation,
      technicalBreadth,
      recommendations,
      checklist: [
        { name: "Project Quality", score: projectQuality },
        { name: "Consistency", score: consistency },
        { name: "Collaboration", score: collaboration },
        { name: "Documentation", score: documentation },
        { name: "Technical Breadth", score: technicalBreadth },
      ],
    };
  }
}
