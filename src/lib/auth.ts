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

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.sub;
        (session.user as any).onboardingCompleted = token.onboardingCompleted;
        (session.user as any).githubUsername = token.githubUsername;
        (session.user as any).accessToken = token.accessToken;
      }
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.onboardingCompleted = (user as any).onboardingCompleted;
        token.githubUsername = (user as any).githubUsername;
      }
      if (account && account.provider === "github") {
        token.accessToken = account.access_token;
        token.githubUsername = (profile as any).login;

        // Update user with github username if not present
        await prisma.user.update({
          where: { id: token.id as string },
          data: { githubUsername: (profile as any).login },
        });
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
