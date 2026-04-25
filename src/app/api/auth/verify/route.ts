import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  if (!token || !email) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login?error=InvalidToken`);
  }

  const verificationToken = await prisma.verificationToken.findFirst({
    where: {
      identifier: email,
      token: token,
    },
  });

  if (!verificationToken || verificationToken.expires < new Date()) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login?error=TokenExpired`);
  }

  await prisma.user.update({
    where: { email },
    data: { emailVerified: new Date() },
  });

  await prisma.verificationToken.delete({
    where: { token },
  });

  // Redirect to a success page or login with a success message
  return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login?verified=true`);
}
