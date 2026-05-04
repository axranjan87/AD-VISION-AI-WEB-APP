import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      product,
      audience,
      tone,
      platform,
      language,
      length,
      type,
      content,
      metadata,
    } = body;

    // In production, save to Convex database
    // For now, return success (client-side saves to localStorage)
    return NextResponse.json({
      success: true,
      message: "Ad saved successfully",
      adId: Date.now().toString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to save ad" },
      { status: 500 }
    );
  }
}




