import { NextRequest, NextResponse } from "next/server";

// Template-based ad copy generator (fallback when APIs are unavailable)
function generateTemplateAdCopy({
  product,
  audience,
  tone,
  platform,
  language,
  length,
}: {
  product: string;
  audience: string;
  tone: string;
  platform: string;
  language: string;
  length: string;
}): string {
  const lengthMap: Record<string, string> = {
    short: "brief",
    medium: "moderate",
    long: "detailed",
  };

  const templates: Record<string, string> = {
    persuasive: `🚀 ${product}

Transform your business today! Experience the power of innovation and see real results.

✨ Key Benefits:
• Revolutionary solution that delivers
• Proven results you can trust
• Trusted by thousands of satisfied customers

🎯 Perfect for: ${audience}

💡 Why Choose Us?
- Industry-leading quality
- Exceptional customer support
- Fast and reliable service

👉 Get started now and see the difference!

---

Variation 2:
${product} - Your Path to Success

Join the revolution! Discover how ${product} can transform your ${audience === "General" ? "workflow" : audience.toLowerCase()} experience.

Key Features:
✓ Cutting-edge technology
✓ Easy to use
✓ Results-driven approach

Start your journey today!

---

Variation 3:
Unlock the Power of ${product}

Ready to take your business to the next level? ${product} offers everything you need to succeed.

Benefits:
• Streamlined processes
• Increased efficiency
• Better outcomes

Ideal for: ${audience}

Get started →`,

    friendly: `Hey there! 👋

Looking for ${product}? You're in the right place!

We've got something special just for you. Whether you're part of ${audience}, we're here to help make your life easier.

What makes us different?
✨ We care about you
✨ Simple and straightforward
✨ Always here to help

Let's make great things happen together! 🌟

---

Variation 2:
Welcome! We're excited to introduce ${product}

Think of us as your friendly neighborhood solution. We understand what ${audience} needs, and we're here to deliver.

Why you'll love us:
• Approachable and easy to work with
• No complicated processes
• Real people, real support

Ready to get started? We'd love to help!

---

Variation 3:
Hi! 👋 Meet ${product}

We're so glad you're here! ${product} is designed with ${audience} in mind.

What you can expect:
✓ Friendly service
✓ Clear communication
✓ Genuine care for your success

Let's chat and see how we can help!`,

    professional: `Introducing ${product}

A comprehensive solution designed for ${audience} seeking excellence and reliability.

Enterprise Features:
• Scalable architecture
• Industry-leading security
• 24/7 dedicated support
• Proven track record

Why Industry Leaders Choose Us:
- Enterprise-grade quality
- Compliance and security standards
- Expert implementation team
- Ongoing optimization

Schedule a consultation to learn more.

---

Variation 2:
${product} - Enterprise Solution

Built for professionals who demand the best. ${product} delivers the reliability and performance ${audience} requires.

Key Capabilities:
✓ Advanced analytics
✓ Seamless integration
✓ Comprehensive reporting
✓ Expert guidance

Contact our team for a personalized demo.

---

Variation 3:
Professional-Grade ${product}

Trusted by leading organizations worldwide. ${product} provides the tools ${audience} needs to excel.

Enterprise Benefits:
• Robust infrastructure
• Data security compliance
• Customizable solutions
• Strategic partnership

Request a consultation today.`,

    witty: `Tired of the same old ${product}? 😏

We've got something that'll make you say "Why didn't I try this sooner?"

Perfect for ${audience} who know better and want more.

What's the catch? There isn't one! Just pure awesomeness. 🚀

Ready to level up? Let's go!

---

Variation 2:
${product} - Because Life's Too Short for Boring Solutions

Let's be honest: you deserve better. And that's exactly what ${product} delivers.

Why settle when you can have:
✨ Innovation that actually works
✨ Solutions that make sense
✨ Results that speak for themselves

Join the smart ${audience} who've already made the switch!

---

Variation 3:
${product}: Finally, Something That Actually Works

No fluff. No nonsense. Just results.

If you're part of ${audience}, you'll appreciate our no-BS approach. We deliver what we promise, period.

See the difference →`,

    luxury: `Experience ${product}

Where sophistication meets excellence. Crafted for the discerning ${audience}.

Premium Features:
• Exquisite attention to detail
• Uncompromising quality standards
• Exclusive access
• Personalized service

Indulge in premium quality. Elevate your standards.

Discover exclusivity. Experience the difference.

---

Variation 2:
${product} - A Statement of Excellence

For those who appreciate the finer things. ${product} represents the pinnacle of quality and refinement.

Luxury Benefits:
✓ Handcrafted precision
✓ Exclusive materials
✓ Limited availability
✓ Concierge-level service

Reserve your experience today.

---

Variation 3:
The Art of ${product}

More than a product—it's an experience. ${product} embodies luxury, quality, and timeless elegance.

Exclusive Offerings:
• Bespoke customization
• Premium craftsmanship
• Elite membership
• Unparalleled service

Join an exclusive circle. Experience true luxury.`,
  };

  const template = templates[tone] || templates.persuasive;
  return template;
}

export async function POST(request: NextRequest) {
  let body: any = {}; // ✅ FIX: global scope

  try {
    body = await request.json(); // ✅ FIX

    const {
      product = "",
      audience = "",
      tone = "persuasive",
      platform = "generic",
      language = "English",
      length = "short",
      generationMode = "standard",
      style = "modern",
    } = body;

    if (!product) {
      return NextResponse.json(
        { error: "Missing product description" },
        { status: 400 }
      );
    }

    const akoolApiKey = process.env.AKOOL_API_KEY;

    // Use Akool AI only - primary service
    if (akoolApiKey) {
      try {
        const variations = generationMode === "standard" ? 1 : generationMode === "multiple" ? 3 : 5;
        const response = await fetch("https://api.akool.com/v1/text/generate", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${akoolApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: `Create a ${tone} ${length} ad copy in ${style} style for: ${product}. Target audience: ${audience || "General"}. Platform: ${platform}. Language: ${language}. Generation mode: ${generationMode}. Provide ${variations} variation(s).`,
            max_tokens: generationMode === "extensive" ? 1000 : 500,
            temperature: 0.8,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.text || data.content || data.response) {
            return NextResponse.json({
              content: data.text || data.content || data.response || "",
              metadata: {
                variations: data.variations || [],
                generatedAt: Date.now(),
                source: "akool",
              },
            });
          }
        } else {
          const errorData = await response.json().catch(() => ({}));
          const errorMessage = errorData.message || errorData.error || `Akool AI API error: ${response.status}`;
          
          if (response.status === 401 || response.status === 403) {
            return NextResponse.json(
              {
                error: "Invalid Akool AI API key",
                details: {
                  message: "Your AKOOL_API_KEY is invalid or expired.",
                  solution: "Please get a valid API key from https://akool.com and update it in .env.local",
                  apiKeyHelp: "Visit https://akool.com → Sign up → Get API key → Add to .env.local as AKOOL_API_KEY=your_key",
                },
              },
              { status: 401 }
            );
          }
          
          throw new Error(errorMessage);
        }
      } catch (akoolError: any) {
        console.error("Akool AI error:", akoolError);
        
        if (akoolError.message?.includes("401") || akoolError.message?.includes("403") || akoolError.message?.includes("unauthorized")) {
          return NextResponse.json(
            {
              error: "Akool AI authentication failed",
              details: {
                message: "Unable to authenticate with Akool AI. Please check your API key.",
                solution: "Get your API key from https://akool.com and add it to .env.local",
              },
            },
            { status: 401 }
          );
        }
        
        console.log("Akool AI failed, trying fallback...");
      }
    }

    const fallbackContent = generateTemplateAdCopy({
      product,
      audience: audience || "General",
      tone,
      platform,
      language,
      length,
    });

    return NextResponse.json({
      content: fallbackContent,
      metadata: {
        generatedAt: Date.now(),
        fallback: true,
        message: "Akool AI API key not configured. Using template-based generation.",
      },
    });

  } catch (error: any) {
    console.error("Text generation error:", error);

    // ✅ NOW body works here (FIXED)
    if (error.message && !error.message.includes("401") && !error.message.includes("403")) {
      const fallbackContent = generateTemplateAdCopy({
        product: body.product || "",
        audience: body.audience || "General",
        tone: body.tone || "persuasive",
        platform: body.platform || "generic",
        language: body.language || "English",
        length: body.length || "short",
      });

      return NextResponse.json({
        content: fallbackContent,
        metadata: {
          generatedAt: Date.now(),
          fallback: true,
        },
      });
    }

    return NextResponse.json(
      { error: error.message || "Failed to generate ad copy" },
      { status: 500 }
    );
  }
}