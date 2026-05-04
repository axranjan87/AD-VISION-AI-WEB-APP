"use client";

import { useState, useEffect } from "react";
import { AdForm } from "@/components/AdForm";
import { AdResults } from "@/components/AdResults";
import { ModeToggle } from "@/components/ModeToggle";
import toast from "react-hot-toast";
import Link from "next/link";
import { Sparkles, Video, FileText, Zap, ArrowRight, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { ThreeDCard } from "@/components/ThreeDCard";
import { Testimonials } from "@/components/Testimonials";

export type AdMode = "text" | "video";

export default function Home() {
  const [mode, setMode] = useState<AdMode>("text");
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Check if user is logged in
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Check URL parameters for mode
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const modeParam = params.get("mode");
    if (modeParam === "video" || modeParam === "text") {
      setMode(modeParam);
    }
  }, []);
  const [results, setResults] = useState<{
    type: AdMode;
    content: string;
    metadata?: {
      videoUrl?: string;
      variations?: string[];
      fallback?: boolean;
      message?: string;
      product?: string;
      audience?: string;
      tone?: string;
      platform?: string;
      language?: string;
      length?: string;
      jobId?: string;
      status?: string;
      demo?: boolean;
    };
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const metrics = [
    { label: "Ads Generated", value: "12.4k", sub: "+320 this week" },
    { label: "Avg. CTR Lift", value: "27%", sub: "vs previous campaigns" },
    { label: "Time Saved", value: "18 hrs", sub: "per campaign" },
    { label: "Languages", value: "40+", sub: "global reach" },
  ];

  return (
    <div className="min-h-screen flex flex-col relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-8 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-3 tracking-tight gradient-text"
        >
          Ad-Vision AI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-lg"
        >
          Create high-converting ad copy and video ads in seconds with AI
        </motion.p>
      </motion.div>
      
      <main className="container mx-auto px-6 py-8 flex-1 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6"
        >
          <ModeToggle mode={mode} onModeChange={setMode} />
        </motion.div>

        <ThreeDCard>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-b from-white/5 to-white/0 border border-white/10 rounded-2xl backdrop-blur-sm shadow-2xl p-6 md:p-8 glass"
          >
          <AdForm
            mode={mode}
            onGenerate={async (formData) => {
              setIsGenerating(true);
              setError(null); // Clear previous errors
              try {
                const response = await fetch(
                  mode === "text" ? "/api/generate-text" : "/api/generate-video",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                  }
                );

                if (!response.ok) {
                  const errorData = await response.json();
                  // Show detailed error message with user's input
                  if (errorData.details) {
                    const details = errorData.details;
                    const errorMsg = `${errorData.error || "Generation failed"}\n\n` +
                      `Product: ${details.product || formData.product}\n` +
                      (details.message ? `\n${details.message}\n` : '') +
                      (details.solution ? `\nSolution: ${details.solution}` : '') +
                      (details.setupInstructions ? `\n\nSetup Instructions:\n${details.setupInstructions}` : '');
                    throw new Error(errorMsg);
                  }
                  throw new Error(errorData.error || errorData.message || "Generation failed");
                }

                const data = await response.json();
                const result = {
                  type: mode,
                  content: data.content || data.text || "",
                  metadata: {
                    ...data.metadata,
                    fallback: data.metadata?.fallback || false,
                    message: data.metadata?.message,
                    product: formData.product,
                    audience: formData.audience,
                    tone: formData.tone,
                    platform: formData.platform,
                    language: formData.language,
                    length: formData.length,
                    generationMode: formData.generationMode,
                    style: formData.style,
                    dimensions: formData.dimensions,
                  },
                };
                setResults(result);
              } catch (error) {
                console.error("Generation error:", error);
                const errorMessage = error instanceof Error ? error.message : "Failed to generate ad";
                setError(errorMessage);
                setResults(null); // Clear any previous results
                // Also show toast for better UX
                toast.error(errorMessage.split('\n')[0]); // Show first line as toast
              } finally {
                setIsGenerating(false);
              }
            }}
            isGenerating={isGenerating}
          />

          {error && (
            <div className="mt-8 bg-red-500/10 border border-red-500/30 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="text-red-400 text-xl">❌</div>
                <div className="flex-1">
                  <h3 className="text-red-300 font-semibold mb-2">Generation Failed</h3>
                  <pre className="whitespace-pre-wrap text-sm text-red-200 font-mono">
                    {error}
                  </pre>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="text-red-400 hover:text-red-300"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {results && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <AdResults results={results} />
            </motion.div>
          )}
          </motion.div>
        </ThreeDCard>
      </main>

      {/* Metrics Section */}
      <section className="container mx-auto px-6 py-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {metrics.map((metric, idx) => (
            <ThreeDCard key={metric.label}>
              <motion.div
                className="p-4 bg-white/5 border border-white/10 rounded-xl glass"
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-xs uppercase tracking-wide text-gray-400">{metric.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{metric.value}</p>
                <p className="text-xs text-primary/90 mt-1">{metric.sub}</p>
              </motion.div>
            </ThreeDCard>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Why Choose Ad-Vision AI?</h2>
          <p className="text-gray-400 text-lg">
            Powerful features to supercharge your advertising campaigns
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: Sparkles, title: "AI-Powered", desc: "Advanced AI technology generates high-quality ads in seconds", color: "text-primary" },
            { icon: Video, title: "Video & Text", desc: "Create both video and text ads optimized for any platform", color: "text-blue-400" },
            { icon: Zap, title: "Lightning Fast", desc: "Generate professional ads in seconds, not hours", color: "text-yellow-400" },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <ThreeDCard key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-gradient-to-b from-white/5 to-white/0 border border-white/10 rounded-xl p-6 glass hover:border-primary/50 transition-all"
                >
                  <Icon className={`w-8 h-8 ${feature.color} mb-4`} />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </motion.div>
              </ThreeDCard>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Link
            href="/features"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-900 font-semibold rounded-lg hover:bg-primary/90 transition-colors animate-pulse-glow"
          >
            Explore All Features
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Banner */}
      <section className="container mx-auto px-6 pb-16 max-w-5xl">
        <ThreeDCard>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-8 md:p-10 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 border border-primary/30 shadow-2xl shadow-primary/15"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left space-y-2">
                <p className="text-sm uppercase tracking-[0.2em] text-primary-900/80">Next step</p>
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  Launch your best-performing ad in minutes
                </h3>
                <p className="text-gray-100/80 text-sm md:text-base">
                  Start with templates, tweak the tone, and ship across platforms with one click.
                </p>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-3">
                <Link
                  href="/"
                  className="px-6 py-3 bg-white text-primary-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Start Creating
                </Link>
                <Link
                  href="/pricing"
                  className="px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/30 text-white font-semibold rounded-lg hover:bg-yellow-500/30 transition-colors flex items-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  View Pricing
                </Link>
                <Link
                  href="/templates"
                  className="px-6 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                >
                  Browse Templates
                </Link>
              </div>
            </div>
          </motion.div>
        </ThreeDCard>
      </section>

    </div>
  );
}
