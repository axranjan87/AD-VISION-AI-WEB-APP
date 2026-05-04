import { v } from "convex/values";
import { action, mutation } from "./_generated/server";

// Akool AI API integration for content generation
const AKOOL_API_URL = "https://api.akool.com";

// Note: In Convex, API keys should be passed as parameters or stored as secrets
// You can set secrets via: npx convex env set AKOOL_API_KEY your_key_here
// Then access them in your Convex dashboard

/**
 * Generate ad copy using Akool AI
 */
export const generateAdCopy = action({
  args: {
    product: v.string(),
    audience: v.string(),
    tone: v.string(),
    platform: v.string(),
    language: v.string(),
    length: v.string(),
    apiKey: v.optional(v.string()), // Optional API key parameter
  },
  handler: async (ctx, args) => {
    const apiKey = args.apiKey;
    
    if (!apiKey) {
      // Fallback to template if no API key
      return {
        text: generateFallbackAdCopy(args),
        variations: [],
      };
    }

    try {
      // Build prompt for Akool AI
      const prompt = `Create a ${args.length} ${args.tone} advertisement for: "${args.product}"
Target Audience: ${args.audience || "General"}
Platform: ${args.platform}
Language: ${args.language}

Generate 3 distinct ad variations with compelling copy, clear value propositions, and strong calls-to-action.`;

      // Call Akool AI API for text generation using fetch
      const response = await fetch(`${AKOOL_API_URL}/v1/text/generate`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          language: args.language,
          tone: args.tone,
          length: args.length,
          variations: 3,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json() as {
        content?: string;
        text?: string;
        variations?: string[];
      };

      return {
        text: data.content || data.text || "Failed to generate content",
        variations: data.variations || [],
      };
    } catch (error: any) {
      console.error("Akool AI error:", error.message);
      
      // Fallback to a simple template-based generation if API fails
      return {
        text: generateFallbackAdCopy(args),
        variations: [],
      };
    }
  },
});

/**
 * Generate visual assets using Akool AI
 */
export const generateVisuals = action({
  args: {
    product: v.string(),
    audience: v.string(),
    tone: v.string(),
    platform: v.string(),
    language: v.string(),
    apiKey: v.optional(v.string()), // Optional API key parameter
  },
  handler: async (ctx, args) => {
    const apiKey = args.apiKey;
    
    if (!apiKey) {
      return {
        images: [],
      };
    }

    try {
      const prompt = `Create professional advertisement visuals for: "${args.product}"
Style: ${args.tone}
Platform: ${args.platform}
Target: ${args.audience || "General audience"}`;

      const response = await fetch(`${AKOOL_API_URL}/v1/image/generate`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          style: args.tone,
          platform: args.platform,
          count: 3,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json() as {
        images?: string[];
        urls?: string[];
      };

      return {
        images: data.images || data.urls || [],
      };
    } catch (error: any) {
      console.error("Akool AI visual generation error:", error.message);
      return {
        images: [],
      };
    }
  },
});

/**
 * Generate video ad using Akool AI
 */
export const generateVideo = action({
  args: {
    product: v.string(),
    audience: v.string(),
    tone: v.string(),
    platform: v.string(),
    language: v.string(),
    length: v.string(),
    apiKey: v.optional(v.string()), // Optional API key parameter
  },
  handler: async (ctx, args) => {
    const apiKey = args.apiKey;
    
    if (!apiKey) {
      throw new Error("API key is required. Pass it as 'apiKey' parameter or configure via Convex secrets.");
    }

    try {
      const prompt = `Create a ${args.length} ${args.tone} video advertisement for: "${args.product}"
Target Audience: ${args.audience || "General"}
Platform: ${args.platform}
Language: ${args.language}`;

      const response = await fetch(`${AKOOL_API_URL}/v1/video/generate`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          duration: args.length === "short" ? 8 : args.length === "medium" ? 15 : 30,
          style: args.tone,
          platform: args.platform,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})) as { message?: string };
        throw new Error(errorData.message || `API error: ${response.status}`);
      }

      const data = await response.json() as {
        video_url?: string;
        url?: string;
        job_id?: string;
        id?: string;
      };

      return {
        videoUrl: data.video_url || data.url,
        jobId: data.job_id || data.id,
      };
    } catch (error: any) {
      console.error("Akool AI video generation error:", error.message);
      throw new Error(`Failed to generate video ad: ${error.message}`);
    }
  },
});

/**
 * Fallback ad copy generator (when API is unavailable)
 */
function generateFallbackAdCopy(args: {
  product: string;
  audience: string;
  tone: string;
  platform: string;
  language: string;
  length: string;
}): string {
  const templates = {
    persuasive: `🚀 ${args.product}
Transform your business today! Experience the power of innovation.

✨ Key Benefits:
• Revolutionary solution
• Proven results
• Trusted by thousands

🎯 Perfect for: ${args.audience || "Everyone"}

👉 Get started now!`,

    friendly: `Hey there! 👋
Looking for ${args.product}? You're in the right place!

We've got something special just for you. Whether you're part of ${args.audience || "our community"}, we're here to help.

Let's make great things happen together! 🌟`,

    professional: `Introducing ${args.product}

A comprehensive solution designed for ${args.audience || "professionals"} seeking excellence.

Features:
• Enterprise-grade quality
• Scalable architecture
• Industry-leading support

Schedule a consultation today.`,

    witty: `Tired of the same old ${args.product}? 😏

We've got something that'll make you say "Why didn't I try this sooner?"

Perfect for ${args.audience || "smart people"} who know better.

Ready to level up? Let's go! 🚀`,

    luxury: `Experience ${args.product}

Where sophistication meets excellence. Crafted for the discerning ${args.audience || "individual"}.

Indulge in premium quality. Elevate your standards.

Discover exclusivity.`,
  };

  return templates[args.tone as keyof typeof templates] || templates.persuasive;
}

