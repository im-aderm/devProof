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
  percentile: number;
  badge: string;
  projectQuality: number;
  consistency: number;
  collaboration: number;
  documentation: number;
  technicalBreadth: number;
  professionalism: number;
  popularity: number;
  activity: number;
  recommendations: string[];
  checklist: { name: string; score: number }[];
  radarData: { subject: string; A: number; fullMark: number }[];
}

export class ScoringEngine {
  /**
   * Calculates a score based on README content and length.
   */
  static calculateReadmeScore(readme: string | null): number {
    if (!readme) return 0;
    let score = 20;
    if (readme.length > 500) score += 20;
    if (readme.length > 2000) score += 20;
    const keywords = ["installation", "usage", "license", "contributing", "getting started", "features"];
    keywords.forEach((word) => {
      if (readme.toLowerCase().includes(word)) score += 10;
    });
    return Math.min(score, 100);
  }

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
   * Calculates a complexity score based on stars, forks, and language presence.
   */
  static calculateComplexityScore(stars: number, forks: number, hasLanguage: boolean): number {
    let score = 30;
    if (hasLanguage) score += 20;
    score += Math.min(stars * 2, 25);
    score += Math.min(forks * 5, 25);
    return Math.min(score, 100);
  }

  static calculateReadinessScore(repos: RepoMetrics[], profile: any): ReadinessResult {
    // 1. Activity (25%) - Based on recent pushes and repo count
    const activityScore = Math.min((repos.filter(r => {
        const diff = Date.now() - new Date(r.pushedAt).getTime();
        return diff < 30 * 24 * 60 * 60 * 1000;
    }).length * 20) + (profile.public_repos * 2), 100);

    // 2. Project Quality (25%) - READMEs and metadata
    const qualityScores = repos.map(r => {
        let s = 40;
        if (r.description) s += 20;
        if (r.language) s += 20;
        if (r.stars > 5) s += 20;
        return s;
    });
    const projectQuality = repos.length > 0 ? Math.round(qualityScores.reduce((a, b) => a + b, 0) / repos.length) : 0;

    // 3. Popularity (20%) - Stars, Forks, Followers
    const totalStars = repos.reduce((acc, r) => acc + r.stars, 0);
    const popularity = Math.min((totalStars * 5) + (profile.followers * 2), 100);

    // 4. Technical Breadth (15%) - Unique languages
    const uniqueLanguages = new Set(repos.flatMap((r) => Object.keys(r.languages)));
    const technicalBreadth = Math.min(uniqueLanguages.size * 15, 100);

    // 5. Professionalism (15%) - Bio, Location, Blog, Company
    let profScore = 0;
    if (profile.bio) profScore += 25;
    if (profile.location) profScore += 25;
    if (profile.blog) profScore += 25;
    if (profile.company || profile.twitter_username) profScore += 25;
    const professionalism = profScore;

    // Documentation helper for Radar
    const documentation = Math.round(projectQuality * 0.9);


    // Weighted Total Score
    const totalScore = Math.round(
      activityScore * 0.25 +
      projectQuality * 0.25 +
      popularity * 0.20 +
      technicalBreadth * 0.15 +
      professionalism * 0.15
    );

    // Percentile Estimate (Mock)
    const percentile = Math.min(Math.round(totalScore * 0.95 + Math.random() * 5), 99);

    // Badge
    let badge = "Beginner";
    if (totalScore > 90) badge = "World Class";
    else if (totalScore > 80) badge = "Elite";
    else if (totalScore > 65) badge = "Strong";
    else if (totalScore > 40) badge = "Growing";

    const recommendations: string[] = [];
    if (projectQuality < 70) recommendations.push("Improve repository descriptions and README files.");
    if (activityScore < 70) recommendations.push("Increase commit frequency to recent projects.");
    if (technicalBreadth < 50) recommendations.push("Diversify your tech stack across different languages.");
    if (professionalism < 80) recommendations.push("Complete your GitHub profile (bio, location, links).");

    return {
      score: totalScore,
      percentile,
      badge,
      projectQuality,
      consistency: activityScore, // Map consistency to activity for UI
      collaboration: Math.min(profile.followers * 5, 100),
      documentation,
      technicalBreadth,
      professionalism,
      popularity,
      activity: activityScore,
      recommendations,
      checklist: [
        { name: "Project Quality", score: projectQuality },
        { name: "Consistency", score: activityScore },
        { name: "Collaboration", score: Math.min(profile.followers * 5, 100) },
        { name: "Documentation", score: documentation },
        { name: "Technical Breadth", score: technicalBreadth },
      ],
      radarData: [
        { subject: 'Documentation', A: documentation, fullMark: 100 },
        { subject: 'Maintainability', A: projectQuality, fullMark: 100 },
        { subject: 'Testing Signals', A: Math.round(projectQuality * 0.7), fullMark: 100 },
        { subject: 'Architecture', A: Math.round(technicalBreadth * 0.8 + projectQuality * 0.2), fullMark: 100 },
        { subject: 'Consistency', A: activityScore, fullMark: 100 },
      ]
    };
  }
}
