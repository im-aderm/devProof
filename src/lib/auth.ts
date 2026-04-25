import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          githubUsername: profile.login,
        };
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Invalid credentials");
        }

        if (!user.emailVerified) {
          throw new Error("UNVERIFIED");
        }

        // Return typed object — matches next-auth.d.ts User interface
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          githubUsername: user.githubUsername ?? undefined,
          onboardingCompleted: user.onboardingCompleted,
          isAdmin: user.isAdmin,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        // All fields are typed via src/types/next-auth.d.ts — no `as any` needed
        session.user.id = token.id ?? token.sub ?? "";
        session.user.onboardingCompleted = token.onboardingCompleted;
        session.user.githubUsername = token.githubUsername;
        session.user.isAdmin = token.isAdmin;
        session.accessToken = token.accessToken;
      }
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.onboardingCompleted = user.onboardingCompleted;
        token.githubUsername = user.githubUsername;
        token.isAdmin = user.isAdmin;
      }
      if (account && account.provider === "github") {
        token.accessToken = account.access_token;
        token.githubUsername = (profile as { login: string }).login;

        // Persist github username and fetch latest isAdmin from DB
        const updated = await prisma.user.update({
          where: { id: token.id as string },
          data: { githubUsername: (profile as { login: string }).login },
          select: { isAdmin: true, onboardingCompleted: true },
        });
        token.isAdmin = updated.isAdmin;
        token.onboardingCompleted = updated.onboardingCompleted;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
