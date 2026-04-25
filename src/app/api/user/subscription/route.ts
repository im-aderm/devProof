import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    // Default to free plan if no subscription found
    if (!subscription) {
      return NextResponse.json({ plan: "free", status: "active", currentPeriodEnd: null });
    }

    return NextResponse.json(subscription);
  } catch (error: any) {
    console.error("SUBSCRIPTION_GET_ERROR", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
