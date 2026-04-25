import { DefaultSession, DefaultJWT } from "next-auth";

/**
 * Extends NextAuth's default Session and JWT types to include all
 * custom fields injected in the auth callbacks (auth.ts).
 *
 * This eliminates `(session.user as any).id` casts throughout the codebase.
 */

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      githubUsername?: string | null;
      onboardingCompleted?: boolean;
      isAdmin?: boolean;
    } & DefaultSession["user"];
    accessToken?: string;
  }

  interface User {
    id: string;
    githubUsername?: string | null;
    onboardingCompleted?: boolean;
    isAdmin?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    githubUsername?: string | null;
    onboardingCompleted?: boolean;
    accessToken?: string;
    isAdmin?: boolean;
  }
}
