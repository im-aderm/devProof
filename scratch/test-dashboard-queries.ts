import { prisma } from "../src/lib/prisma";

async function main() {
  const userId = "cmoei3slx0001ptjlk68orsmi";
  try {
    console.log("Starting parallel fetch...");
    const [profile, repos, languages, readiness] = await Promise.all([
      prisma.githubProfile.findUnique({ where: { userId } }),
      prisma.repository.findMany({
        where: { userId },
        orderBy: { pushedAt: "desc" },
        take: 5,
      }),
      prisma.repositoryLanguage.findMany({
        where: { repository: { userId } },
      }),
      prisma.readinessScore.findUnique({ where: { userId } }),
    ]);
    console.log("Fetch successful!");
    console.log("Profile:", profile);
    console.log("Repos count:", repos.length);
    console.log("Languages count:", languages.length);
    console.log("Readiness:", readiness);
  } catch (error) {
    console.error("Fetch failed!", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
