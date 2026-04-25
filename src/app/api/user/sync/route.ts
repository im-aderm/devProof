import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SyncService } from "@/lib/sync";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !(session as any).githubUsername) {
      return NextResponse.json({ error: "Unauthorized or GitHub not connected" }, { status: 401 });
    }

    const syncService = new SyncService(
      (session.user as any).id,
      (session as any).githubUsername,
      (session as any).accessToken
    );

    const result = await syncService.syncFullProfile();

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("SYNC_ROUTE_ERROR", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
