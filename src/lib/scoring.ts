// ---------------------------------------------------------------------------
// Typed interfaces for the scoring engine
// ---------------------------------------------------------------------------
export interface RepoWithMetrics {
  pushedAt: Date;
  stars: number;
  forks: number;
  language: string | null;
  metrics: RepoMetric | null;
  languages: { name: string; size: number }[];
}

export interface RepoMetric {
  readmeScore: number | null;
  complexity: number | null;
  freshness: number | null;
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

    // Length check
    if (readme.length > 500) score += 20;
    if (readme.length > 2000) score += 20;

    // Keywords check (best practices)
    const keywords = [
      "installation",
      "usage",
      "license",
      "contributing",
      "getting started",
      "features",
    ];
    keywords.forEach((word) => {
      if (readme.toLowerCase().includes(word)) score += 5;
    });

    return Math.min(score, 100);
  }

  /**
   * Calculates a complexity score based on metadata.
   */
  static calculateComplexityScore(
    stars: number,
    forks: number,
    language: string | null
  ): number {
    let score = 40; // Base score

    score += Math.min(stars * 2, 30); // Stars impact
    score += Math.min(forks * 5, 20); // Forks impact

    if (language) score += 10; // Extra points for defined language

    return Math.min(score, 100);
  }

  /**
   * Calculates freshness score based on last push date.
   */
  static calculateFreshnessScore(pushedAt: Date): number {
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - pushedAt.getTime()) / (1000 * 3600 * 24)
    );

    if (diffInDays < 30) return 100;
    if (diffInDays < 90) return 80;
    if (diffInDays < 180) return 50;
    if (diffInDays < 365) return 30;

    return 10;
  }

  /**
   * Calculates MLH/Internship Readiness Score.
   *
   * Weights:
   *  - Project Quality:    30% (avg README + Complexity from stored metrics)
   *  - Consistency:        20% (freshness of most recently pushed repo)
   *  - Collaboration:      15% (proxied at 75 — replace with real PR/issue data)
   *  - Documentation:      15% (derived from README quality)
   *  - Technical Breadth:  20% (unique language count across all repos)
   *
   * @param repos  Full repository records including their metrics and languages.
   *               NOTE: pushedAt is on the Repository, NOT on RepositoryMetric.
   */
  static calculateReadinessScore(repos: RepoWithMetrics[]): ReadinessResult {
    let projectQuality = 0;
    let consistency = 0;
    let documentation = 0;
    let technicalBreadth = 0;

    if (repos.length > 0) {
      // Project Quality — average of stored README and Complexity scores
      const analyzedRepos = repos.filter((r) => r.metrics?.readmeScore != null);

      if (analyzedRepos.length > 0) {
        const avgReadme =
          analyzedRepos.reduce((acc, r) => acc + (r.metrics!.readmeScore ?? 0), 0) /
          analyzedRepos.length;
        const avgComplexity =
          analyzedRepos.reduce((acc, r) => acc + (r.metrics!.complexity ?? 0), 0) /
          analyzedRepos.length;
        projectQuality = Math.round((avgReadme + avgComplexity) / 2);
      }

      // Consistency — FIX: pushedAt lives on Repository, not RepositoryMetric
      const latestRepo = repos
        .slice()
        .sort((a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime())[0];
      consistency = ScoringEngine.calculateFreshnessScore(new Date(latestRepo.pushedAt));

      // Documentation — derived from README quality
      documentation = Math.round(projectQuality * 0.75);

      // Technical Breadth — unique languages across all repos
      const uniqueLanguages = new Set(repos.flatMap((r) => r.languages.map((l) => l.name)));
      technicalBreadth = Math.min(uniqueLanguages.size * 10, 100);
    }

    // Collaboration: proxied at 75 until GitHub PR/issue data is integrated.
    // TODO: Replace with real data from GitHub API (contributions, PRs, reviews).
    const collaboration = 75;

    const totalScore = Math.round(
      projectQuality * 0.3 +
        consistency * 0.2 +
        collaboration * 0.15 +
        documentation * 0.15 +
        technicalBreadth * 0.2
    );

    const recommendations: string[] = [];
    if (projectQuality < 70)
      recommendations.push("Improve READMEs and project complexity for better quality scores.");
    if (consistency < 70)
      recommendations.push("Maintain consistent commit activity across your repositories.");
    if (collaboration < 70)
      recommendations.push(
        "Consider contributing to open-source projects or collaborating on team projects."
      );
    if (documentation < 70)
      recommendations.push(
        "Ensure all projects have clear documentation, including setup and usage instructions."
      );
    if (technicalBreadth < 70)
      recommendations.push(
        "Explore new programming languages or frameworks to broaden your technical scope."
      );

    const checklist = [
      { name: "Project Quality", score: projectQuality },
      { name: "Consistency", score: consistency },
      { name: "Collaboration", score: collaboration },
      { name: "Documentation", score: documentation },
      { name: "Technical Breadth", score: technicalBreadth },
    ];

    return {
      score: totalScore,
      projectQuality,
      consistency,
      collaboration,
      documentation,
      technicalBreadth,
      recommendations,
      checklist,
    };
  }
}
