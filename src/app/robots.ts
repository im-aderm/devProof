import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/dashboard/",
        "/admin/",
        "/settings/",
        "/onboarding/",
        "/readiness/",
        "/resume/"
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
