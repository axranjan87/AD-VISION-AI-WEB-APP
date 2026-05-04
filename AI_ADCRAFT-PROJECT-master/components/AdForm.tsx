"use client";

import { useState, useEffect, FormEvent } from "react";
import { AdMode } from "@/app/page";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, Lock } from "lucide-react";

interface AdFormProps {
  mode: AdMode;
  onGenerate: (formData: {
    product: string;
    audience: string;
    tone: string;
    platform: string;
    language: string;
    length: string;
    generationMode?: string;
    style?: string;
    dimensions?: string;
  }) => Promise<void>;
  isGenerating: boolean;
}

export function AdForm({ mode, onGenerate, isGenerating }: AdFormProps) {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [formData, setFormData] = useState({
    product: "",
    audience: "",
    tone: "persuasive",
    platform: "generic",
    language: "English",
    length: "short",
    generationMode: "standard",
    style: "modern",
    dimensions: "16:9",
  });

  // Check if user is logged in
  useEffect(() => {
    const checkUser = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    };
    
    checkUser();
    
    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener("storage", checkUser);
    
    // Also listen for custom storage event (same tab)
    window.addEventListener("userUpdated", checkUser);
    
    return () => {
      window.removeEventListener("storage", checkUser);
      window.removeEventListener("userUpdated", checkUser);
    };
  }, []);

  // Load template data if available
  useEffect(() => {
    const template = localStorage.getItem("selectedTemplate");
    if (template) {
      try {
        const templateData = JSON.parse(template);
        setFormData({
          product: templateData.product || "",
          audience: templateData.audience || "",
          tone: templateData.tone || "persuasive",
          platform: templateData.platform || "generic",
          language: "English",
          length: "short",
        });
        if (templateData.type === "video") {
          // Switch to video mode if template is for video
          const modeToggle = document.querySelector('[data-mode="video"]');
          if (modeToggle) (modeToggle as HTMLElement).click();
        }
      } catch (e) {
        console.error("Error loading template:", e);
      }
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (!userData) {
      toast.error("Please login to generate ads");
      router.push("/login?redirect=/");
      return;
    }
    
    if (!formData.product.trim()) {
      toast.error("Please enter a product/service description");
      return;
    }

    await onGenerate(formData);
  };

  // Show login prompt if user is not logged in
  if (!user) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 border-2 border-primary/30 rounded-xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Login Required</h3>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            You need to be logged in to generate ads. Create an account or login to continue.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="px-6 py-3 bg-gradient-to-r from-primary to-emerald-500 text-white font-bold rounded-lg hover:from-primary/90 hover:to-emerald-500/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/30"
            >
              <LogIn className="w-5 h-5" />
              Login Now
            </Link>
            <Link
              href="/signup"
              className="px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
            >
              Create Account
            </Link>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            Free accounts can generate up to 10 text ads and 2 video ads per month
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Product / Service
        </label>
        <textarea
          name="product"
          value={formData.product}
          onChange={(e) => setFormData({ ...formData, product: e.target.value })}
          placeholder="Describe what you're advertising"
          required
          className="w-full bg-dark-card border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[110px] resize-y"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Target Audience
          </label>
          <input
            type="text"
            name="audience"
            value={formData.audience}
            onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
            placeholder="e.g., Busy professionals"
            className="w-full bg-dark-card border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Tone
          </label>
          <select
            name="tone"
            value={formData.tone}
            onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
            className="w-full bg-dark-card border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="persuasive">Persuasive</option>
            <option value="friendly">Friendly</option>
            <option value="professional">Professional</option>
            <option value="witty">Witty</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Platform
          </label>
          <select
            name="platform"
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="w-full bg-dark-card border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="generic">Generic</option>
            <option value="Google Ads">Google Ads</option>
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Twitter/X">Twitter/X</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Language
          </label>
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
            placeholder="English"
            className="w-full bg-dark-card border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Length
          </label>
          <select
            name="length"
            value={formData.length}
            onChange={(e) => setFormData({ ...formData, length: e.target.value })}
            className="w-full bg-dark-card border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>

        {mode === "video" && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Generation Mode
            </label>
            <select
              name="generationMode"
              value={formData.generationMode}
              onChange={(e) => setFormData({ ...formData, generationMode: e.target.value })}
              className="w-full bg-dark-card border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="fast">Fast (30-60s)</option>
              <option value="standard">Standard (1-2 min)</option>
              <option value="high-quality">High Quality (3-5 min)</option>
              <option value="ultra">Ultra Quality (5-10 min)</option>
            </select>
          </div>
        )}
      </div>

      {mode === "video" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Style
            </label>
            <select
              name="style"
              value={formData.style}
              onChange={(e) => setFormData({ ...formData, style: e.target.value })}
              className="w-full bg-dark-card border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="modern">Modern</option>
              <option value="cinematic">Cinematic</option>
              <option value="minimalist">Minimalist</option>
              <option value="bold">Bold & Vibrant</option>
              <option value="elegant">Elegant</option>
              <option value="playful">Playful</option>
              <option value="professional">Professional</option>
              <option value="artistic">Artistic</option>
              <option value="corporate">Corporate</option>
              <option value="lifestyle">Lifestyle</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Dimensions (Aspect Ratio)
            </label>
            <select
              name="dimensions"
              value={formData.dimensions}
              onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
              className="w-full bg-dark-card border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="16:9">16:9 (Landscape - YouTube, TV)</option>
              <option value="9:16">9:16 (Vertical - TikTok, Instagram Reels, Stories)</option>
              <option value="1:1">1:1 (Square - Instagram Posts, Facebook)</option>
              <option value="4:5">4:5 (Portrait - Instagram Posts)</option>
              <option value="4:3">4:3 (Classic - Presentations)</option>
              <option value="21:9">21:9 (Ultra Wide - Cinematic)</option>
            </select>
            <p className="text-xs text-gray-500 mt-2">
              {formData.dimensions === "16:9" && "Best for: YouTube, TV ads, LinkedIn"}
              {formData.dimensions === "9:16" && "Best for: TikTok, Instagram Reels, Stories, Shorts"}
              {formData.dimensions === "1:1" && "Best for: Instagram posts, Facebook feed"}
              {formData.dimensions === "4:5" && "Best for: Instagram feed posts"}
              {formData.dimensions === "4:3" && "Best for: Presentations, classic format"}
              {formData.dimensions === "21:9" && "Best for: Cinematic content, ultra-wide displays"}
            </p>
          </div>
        </div>
      )}

      {mode === "text" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Generation Mode
            </label>
            <select
              name="generationMode"
              value={formData.generationMode}
              onChange={(e) => setFormData({ ...formData, generationMode: e.target.value })}
              className="w-full bg-dark-card border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="standard">Standard (1 variation)</option>
              <option value="multiple">Multiple (3 variations)</option>
              <option value="extensive">Extensive (5 variations)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Writing Style
            </label>
            <select
              name="style"
              value={formData.style}
              onChange={(e) => setFormData({ ...formData, style: e.target.value })}
              className="w-full bg-dark-card border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="modern">Modern</option>
              <option value="classic">Classic</option>
              <option value="conversational">Conversational</option>
              <option value="formal">Formal</option>
              <option value="casual">Casual</option>
              <option value="creative">Creative</option>
            </select>
          </div>
        </div>
      )}

      <div className="flex items-end justify-end pt-2">
        <motion.button
          type="submit"
          disabled={isGenerating}
          whileHover={{ scale: isGenerating ? 1 : 1.05 }}
          whileTap={{ scale: isGenerating ? 1 : 0.95 }}
          className="w-full md:w-auto bg-gradient-to-b from-primary to-primary/80 text-primary-900 font-bold px-6 py-3 rounded-lg shadow-lg shadow-primary/35 hover:shadow-xl hover:shadow-primary/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-lg animate-pulse-glow"
        >
          {isGenerating ? (
            <span className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                ⚡
              </motion.span>
              Generating...
            </span>
          ) : (
            "Generate Ads"
          )}
        </motion.button>
      </div>
    </form>
  );
}

