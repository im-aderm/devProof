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
}
