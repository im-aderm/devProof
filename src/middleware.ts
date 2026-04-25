import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

/**
 * Next.js Middleware — Server-side route protection.
 *
 * This replaces all the client-side `useEffect` redirect patterns that allowed
 * brief flashes of protected content before redirecting unauthenticated users.
 *
 * Protects:
 *  - /dashboard/*
 *  - /settings
 *  - /resume
 *  - /readiness
 *  - /repositories/*
 *  - /onboarding
 *  - /admin/*
 *
 * The admin/* routes get an additional server-side isAdmin check via the API.
 */
export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Admin routes require isAdmin flag in JWT
    if (pathname.startsWith("/admin")) {
      if (!token?.isAdmin) {
        const url = req.nextUrl.clone();
        url.pathname = "/dashboard";
        url.searchParams.set("error", "insufficient_permissions");
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Return true to allow withAuth to continue (will redirect to signIn if no token)
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/settings/:path*",
    "/resume/:path*",
    "/readiness/:path*",
    "/repositories/:path*",
    "/onboarding/:path*",
    "/admin/:path*",
  ],
};
