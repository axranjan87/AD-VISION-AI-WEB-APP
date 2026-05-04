import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      product = "",
      audience = "",
      tone = "persuasive",
      platform = "generic",
      language = "English",
      length = "short",
      generationMode = "standard",
      style = "modern",
      dimensions = "16:9",
    } = body;

    if (!product) {
      return NextResponse.json(
        { error: "Missing product description" },
        { status: 400 }
      );
    }

    const akoolApiKey = process.env.AKOOL_API_KEY;

    // If no API key, return a helpful response with user's input details
    // This allows the UI to show what would be generated
    if (!akoolApiKey) {
      const durationMap: Record<string, number> = {
        short: 8,
        medium: 15,
        long: 30,
      };
      const duration = durationMap[length] || 8;

      // Build the prompt that would be used (so user can see their input is being used)
      let videoPrompt = `Create a professional ${tone} video advertisement for: "${product}"`;
      if (audience && audience.trim()) {
        videoPrompt += `\nTarget Audience: ${audience}`;
      }
      videoPrompt += `\nPlatform: ${platform}`;
      videoPrompt += `\nLanguage: ${language}`;
      videoPrompt += `\nDuration: ${duration} seconds`;

      return NextResponse.json({
        content: "Video generation preview",
        metadata: {
          message: `Your video ad for "${product}" is ready to generate! Get your Akool AI API key to create the actual video.`,
          prompt: videoPrompt,
          product: product,
          audience: audience,
          tone: tone,
          platform: platform,
          language: language,
          length: length,
          duration: duration,
          generationMode: generationMode,
          style: style,
          dimensions: dimensions,
          requiresApiKey: true,
          setupInstructions: {
            step1: "Visit https://akool.com and sign up for an account",
            step2: "Go to your dashboard and copy your API key",
            step3: "Add AKOOL_API_KEY=your_key_here to .env.local file",
            step4: "Restart your development server (npm run dev)",
            step5: "Generate your video again"
          },
          apiKeyHelp: "Get your API key from: https://akool.com/dashboard/api-keys"
        },
      });
    }

    const durationMap: Record<string, number> = {
      short: 8,
      medium: 15,
      long: 30,
    };
    const duration = durationMap[length] || 8;

    // Build comprehensive, detailed video prompt using ALL user inputs
    let videoPrompt = `Create a professional ${tone} video advertisement for: "${product}"`;
    
    // Add detailed product description
    videoPrompt += `\n\nProduct/Service Details: ${product}`;
    
    // Add target audience with specific targeting
    if (audience && audience.trim()) {
      videoPrompt += `\nTarget Audience: ${audience}`;
      videoPrompt += `\nFocus on appealing to ${audience} with relevant messaging and visuals.`;
    } else {
      videoPrompt += `\nTarget Audience: General public`;
    }
    
    // Platform-specific optimization
    const platformGuidance: Record<string, string> = {
      "Google Ads": "Optimize for search intent, clear value proposition, quick attention grab. Use text overlays and clear CTAs.",
      "Facebook": "Social engagement focused, relatable content, shareable moments. Use engaging visuals and social proof.",
      "Instagram": "Visually stunning, trendy, story-driven, mobile-optimized. Use vibrant colors and modern aesthetics.",
      "LinkedIn": "Professional, B2B focused, thought leadership, business value. Use corporate style and data-driven visuals.",
      "Twitter/X": "Quick, punchy, trending topics, concise messaging. Use bold text and eye-catching graphics.",
      "generic": "Universal appeal, clear messaging, broad audience. Use versatile and accessible visuals.",
    };
      videoPrompt += `\nPlatform: ${platform}`;
      videoPrompt += `\nPlatform Optimization: ${platformGuidance[platform] || platformGuidance.generic}`;
      
      // Dimensions and aspect ratio
      videoPrompt += `\nDimensions: ${dimensions}`;
      const dimensionGuidance: Record<string, string> = {
        "16:9": "Landscape format (1920x1080). Optimize for widescreen displays, YouTube, TV ads.",
        "9:16": "Vertical format (1080x1920). Optimize for mobile, TikTok, Instagram Reels, Stories.",
        "1:1": "Square format (1080x1080). Perfect for Instagram posts, Facebook feed.",
        "4:5": "Portrait format (1080x1350). Ideal for Instagram feed posts, Facebook.",
        "4:3": "Classic format (1440x1080). Great for presentations, classic video format.",
        "21:9": "Ultra-wide format (2560x1080). Cinematic, premium look for wide displays.",
      };
      videoPrompt += `\nAspect Ratio Details: ${dimensionGuidance[dimensions] || dimensionGuidance["16:9"]}`;
      
      // Generation mode (quality/speed)
      videoPrompt += `\nGeneration Mode: ${generationMode}`;
      const modeGuidance: Record<string, string> = {
        "fast": "Prioritize speed. Use simpler animations, fewer effects, quick rendering.",
        "standard": "Balanced quality and speed. Use standard rendering settings.",
        "high-quality": "High quality output. Use advanced effects, smooth animations, detailed rendering.",
        "ultra": "Ultra quality. Maximum detail, premium effects, cinematic quality, extended processing for best results.",
      };
      videoPrompt += `\nQuality Settings: ${modeGuidance[generationMode] || modeGuidance.standard}`;
      
      // Style customization
      videoPrompt += `\nVisual Style: ${style}`;
      const styleGuidance: Record<string, string> = {
        "modern": "Contemporary, sleek, minimalist design with clean lines and modern aesthetics.",
        "cinematic": "Movie-like quality with dramatic lighting, depth, and professional cinematography.",
        "minimalist": "Simple, clean, focused on essential elements with lots of white space.",
        "bold": "Vibrant colors, strong contrasts, eye-catching graphics, high energy.",
        "elegant": "Sophisticated, refined, graceful with subtle animations and premium feel.",
        "playful": "Fun, colorful, animated with lively movements and cheerful atmosphere.",
        "professional": "Corporate, trustworthy, business-focused with clean and polished look.",
        "artistic": "Creative, unique, visually striking with artistic elements and creative composition.",
        "corporate": "Formal, structured, brand-consistent with professional business aesthetics.",
        "lifestyle": "Relatable, authentic, showing real-life scenarios and everyday situations.",
      };
      videoPrompt += `\nStyle Details: ${styleGuidance[style] || styleGuidance.modern}`;
    
    // Language and localization
    videoPrompt += `\nLanguage: ${language}`;
    if (language !== "English") {
      videoPrompt += `\nAll text, narration, and on-screen text must be in ${language}.`;
    }
    
    // Duration and pacing
    videoPrompt += `\nDuration: ${duration} seconds`;
    const pacingGuide = {
      short: "Fast-paced, high energy, quick cuts, immediate impact",
      medium: "Balanced pacing, clear narrative flow, engaging throughout",
      long: "Detailed storytelling, comprehensive information, smooth transitions"
    };
    videoPrompt += `\nPacing: ${pacingGuide[length as keyof typeof pacingGuide] || pacingGuide.short}`;

    // Tone-specific detailed instructions
    const toneInstructions: Record<string, string> = {
      persuasive: "Use compelling visuals, emotional appeal, and strong persuasive elements. Show benefits clearly. Include social proof, testimonials, or before/after scenarios. Use dynamic camera movements and impactful music.",
      friendly: "Use warm, approachable visuals. Create a welcoming and relatable atmosphere. Show real people, everyday situations, and genuine interactions. Use soft colors and friendly animations.",
      professional: "Use clean, corporate-style visuals. Focus on credibility and trustworthiness. Include data visualizations, professional settings, and authoritative imagery. Use sophisticated color schemes.",
      witty: "Use creative, humorous visuals. Make it memorable and entertaining. Include unexpected elements, clever transitions, and playful animations. Use bold colors and dynamic editing.",
      luxury: "Use high-end, premium visuals. Emphasize quality, exclusivity, and sophistication. Include elegant settings, refined aesthetics, and polished cinematography. Use sophisticated color palettes.",
    };
    videoPrompt += `\n\nTone & Style Requirements: ${toneInstructions[tone] || toneInstructions.persuasive}`;
    
    // Additional creative direction
    videoPrompt += `\n\nCreative Direction:
- Start with a strong hook (first 2-3 seconds) that grabs attention
- Clearly showcase the product/service: ${product}
- Highlight key benefits and value proposition
- Include a compelling call-to-action (CTA) at the end
- Use appropriate music that matches the ${tone} tone
- Ensure all visuals are high-quality and professional
- Make it shareable and memorable for ${platform} platform`;
    
    // Final instructions
    videoPrompt += `\n\nTechnical Requirements:
- Resolution: 1080p HD quality
- Format: MP4
- Aspect ratio optimized for ${platform}
- Smooth transitions and professional editing
- Clear audio (if narration is included)
- Brand-consistent visuals throughout`;

    // Akool AI video generation
    try {
      // Calculate resolution based on dimensions
      const resolutionMap: Record<string, string> = {
        "16:9": "1920x1080",
        "9:16": "1080x1920",
        "1:1": "1080x1080",
        "4:5": "1080x1350",
        "4:3": "1440x1080",
        "21:9": "2560x1080",
      };
      const resolution = resolutionMap[dimensions] || "1920x1080";
      
      const response = await fetch("https://api.akool.com/v1/video/generate", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${akoolApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: videoPrompt,
          duration: duration,
          resolution: resolution,
          aspect_ratio: dimensions,
          style: style,
          quality: generationMode === "ultra" ? "ultra" : generationMode === "high-quality" ? "high" : "standard",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Video generation failed");
      }

      const data = await response.json();
      
      // If Akool returns a job ID, return it for client-side polling
      // (Next.js API routes have timeout limits, so we can't poll here)
      if (data.job_id || data.id) {
        const jobId = data.job_id || data.id;
        
        // Return job ID for client to poll, or try a quick status check
        try {
          // Quick status check (non-blocking)
          const statusResponse = await fetch(
            `https://api.akool.com/v1/video/status/${jobId}`,
            {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${akoolApiKey}`,
              },
            }
          );

          if (statusResponse.ok) {
            const statusData = await statusResponse.json() as {
              status?: string;
              video_url?: string;
              url?: string;
            };
            
            if (statusData.status === "completed" && (statusData.video_url || statusData.url)) {
              return NextResponse.json({
                content: "Video generated",
                metadata: {
                  videoUrl: statusData.video_url || statusData.url,
                  generatedAt: Date.now(),
                },
              });
            } else if (statusData.status === "failed") {
              throw new Error("Video generation failed on server");
            }
          }
        } catch (statusError) {
          // If status check fails, return job ID for client polling
          console.log("Status check failed, returning job ID for client polling");
        }

        // Return job ID for client-side polling with user input details
        return NextResponse.json({
          content: "Video generation started",
          metadata: {
            jobId: jobId,
            status: "processing",
            message: `Generating custom video ad for "${product}" based on your inputs. This may take 1-2 minutes.`,
            pollUrl: `/api/generate-video/status?jobId=${jobId}`,
            product: product,
            audience: audience,
            tone: tone,
            platform: platform,
            generationMode: generationMode,
            style: style,
            dimensions: dimensions,
            prompt: videoPrompt.substring(0, 500) + "...", // Include first 500 chars of prompt for reference
          },
        });
      }

      // If video URL is returned directly
      if (data.video_url || data.url) {
        return NextResponse.json({
          content: "Video generated",
          metadata: {
            videoUrl: data.video_url || data.url,
            generatedAt: Date.now(),
          },
        });
      }

      throw new Error("Unexpected response format from Akool AI");
    } catch (akoolError: any) {
      console.error("Akool AI video generation error:", akoolError);
      
      const errorMessage = akoolError.message || "Failed to generate video ad";
      const errorResponse = akoolError.response?.data || {};
      
      // Check if it's an API key or authentication error
      if (errorMessage.includes("401") || errorMessage.includes("403") || errorMessage.includes("unauthorized") || errorMessage.includes("invalid") || errorResponse.status === 401 || errorResponse.status === 403) {
        return NextResponse.json(
          { 
            error: "Invalid or expired Akool AI API key",
            details: {
              product: product,
              audience: audience,
              tone: tone,
              platform: platform,
              message: `Failed to generate video for "${product}". Your AKOOL_API_KEY appears to be invalid or expired.`,
              solution: "Please get a valid API key from https://akool.com and update it in .env.local",
              apiKeyHelp: "Visit https://akool.com → Sign up → Get API key → Add to .env.local as AKOOL_API_KEY=your_key",
              setupInstructions: {
                step1: "Go to https://akool.com and sign up for an account",
                step2: "Navigate to your dashboard and find your API key",
                step3: "Add AKOOL_API_KEY=your_key_here to your .env.local file",
                step4: "Restart your development server (npm run dev)",
                step5: "Try generating your video again"
              }
            }
          },
          { status: 401 }
        );
      }
      
      // For other API errors, return detailed error with user's input
      return NextResponse.json(
        { 
          error: "Video generation failed",
          details: {
            product: product,
            audience: audience,
            tone: tone,
            platform: platform,
            language: language,
            length: length,
            prompt: videoPrompt,
            apiError: errorMessage,
            message: `Failed to generate video ad for "${product}". The API returned an error.`,
            suggestion: "Please check your API key, credits, and try again. If the issue persists, contact Akool AI support."
          }
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Video generation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate video ad" },
      { status: 500 }
    );
  }
}

