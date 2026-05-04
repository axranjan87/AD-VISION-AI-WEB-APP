import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const jobId = searchParams.get("jobId");
    const akoolApiKey = process.env.AKOOL_API_KEY;

    if (!jobId) {
      return NextResponse.json(
        { error: "Missing job ID" },
        { status: 400 }
      );
    }

    if (!akoolApiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    try {
      const statusResponse = await fetch(
        `https://api.akool.com/v1/video/status/${jobId}`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${akoolApiKey}`,
          },
        }
      );

      if (!statusResponse.ok) {
        throw new Error(`Status check failed: ${statusResponse.status}`);
      }

      const statusData = await statusResponse.json() as {
        status?: string;
        video_url?: string;
        url?: string;
        message?: string;
      };

      if (statusData.status === "completed" && (statusData.video_url || statusData.url)) {
        return NextResponse.json({
          status: "completed",
          videoUrl: statusData.video_url || statusData.url,
          generatedAt: Date.now(),
        });
      } else if (statusData.status === "failed") {
        return NextResponse.json(
          { 
            status: "failed",
            error: statusData.message || "Video generation failed"
          },
          { status: 500 }
        );
      } else {
        return NextResponse.json({
          status: statusData.status || "processing",
          message: "Video generation in progress...",
        });
      }
    } catch (error: any) {
      console.error("Status check error:", error);
      return NextResponse.json(
        { 
          status: "error",
          error: error.message || "Failed to check video status"
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Video status check error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to check video status" },
      { status: 500 }
    );
  }
}

