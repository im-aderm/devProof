import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { goal } = await req.json();

    if (!goal) {
      return NextResponse.json({ error: "Goal is required" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email! },
      data: {
        onboardingGoal: goal,
        onboardingCompleted: true,
      },
    });

    return NextResponse.json({ message: "Onboarding completed", user: updatedUser });
  } catch (error) {
    console.error("ONBOARDING_ERROR", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
