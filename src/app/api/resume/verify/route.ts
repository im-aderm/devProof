import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { VerificationService } from "@/lib/verification";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { resumeId } = await req.json();

    if (!resumeId) {
      return NextResponse.json({ error: "Resume ID is required" }, { status: 400 });
    }

    const resume = await prisma.resume.findUnique({
      where: { id: resumeId, userId: session.user.id }
    });

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    // Trigger signal generation
    await VerificationService.generateSignalsForResume(resumeId, session.user.id);

    // Calculate new trust score
    const trustScore = await VerificationService.calculateTrustScore(resumeId);
    const signals = await prisma.verificationSignal.findMany({
      where: { resumeId }
    });

    return NextResponse.json({ 
      success: true, 
      trustScore,
      signals 
    });

  } catch (error: any) {
    console.error("VERIFICATION_ERROR", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const resumeId = searchParams.get("resumeId");

    if (!resumeId) {
        return NextResponse.json({ error: "Resume ID is required" }, { status: 400 });
    }

    try {
        const trustScore = await VerificationService.calculateTrustScore(resumeId);
        const signals = await prisma.verificationSignal.findMany({
            where: { resumeId }
        });

        return NextResponse.json({ 
            trustScore,
            signals 
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
