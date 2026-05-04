"use client";

import {
  Sparkles,
  Video,
  FileText,
  Globe,
  Zap,
  Shield,
  Palette,
  BarChart3,
  Smartphone,
  Cloud,
  ArrowRight,
  Check,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { CloudStorageDemo } from "@/components/CloudStorageDemo";
import { motion } from "framer-motion";
import { ThreeDCard } from "@/components/ThreeDCard";

export default function FeaturesPage() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedPlatform, setSelectedPlatform] = useState("Google Ads");
  const [selectedTone, setSelectedTone] = useState("persuasive");

  const languages = [
    "English", "Spanish", "French", "German", "Italian", "Portuguese",
    "Chinese", "Japanese", "Korean", "Arabic", "Hindi", "Russian"
  ];

  const platforms = [
    "Google Ads", "Facebook", "Instagram", "LinkedIn", "Twitter/X",
    "TikTok", "YouTube", "Pinterest", "Snapchat"
  ];

  const tones = [
    "persuasive", "friendly", "professional", "witty", "luxury"
  ];

  const handleFeatureClick = (feature: string) => {
    switch (feature) {
      case "AI-Powered Generation":
        router.push("/");
        break;
      case "Video Ad Creation":
        router.push("/?mode=video");
        break;
      case "Text Ad Generation":
        router.push("/?mode=text");
        break;
      case "Cloud Storage":
        const user = localStorage.getItem("user");
        if (user) {
          router.push("/dashboard");
        } else {
          toast.error("Please login to access your saved ads");
          router.push("/login");
        }
        break;
      case "Multi-Language Support":
        toast.success(`Language selector: ${selectedLanguage} selected`);
        break;
      case "Platform Optimization":
        toast.success(`Platform: ${selectedPlatform} selected`);
        break;
      case "Customizable Styles":
        toast.success(`Tone: ${selectedTone} selected`);
        break;
      default:
        break;
    }
  };

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Generation",
      description: "Leverage advanced AI to create high-converting ad copy and video content automatically.",
      color: "text-primary",
      action: "Try Now",
      onClick: () => handleFeatureClick("AI-Powered Generation"),
    },
    {
      icon: Video,
      title: "Video Ad Creation",
      description: "Generate professional video advertisements tailored to your brand and target audience.",
      color: "text-blue-400",
      action: "Create Video",
      onClick: () => handleFeatureClick("Video Ad Creation"),
    },
    {
      icon: FileText,
      title: "Text Ad Generation",
      description: "Create compelling ad copy with multiple variations optimized for different platforms.",
      color: "text-green-400",
      action: "Generate Text",
      onClick: () => handleFeatureClick("Text Ad Generation"),
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Generate ads in multiple languages to reach global audiences effectively.",
      color: "text-purple-400",
      action: "Select Language",
      onClick: () => handleFeatureClick("Multi-Language Support"),
      interactive: true,
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate professional ads in seconds, not hours. Speed up your marketing workflow.",
      color: "text-yellow-400",
      action: null,
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data and generated content are secure. We prioritize your privacy.",
      color: "text-red-400",
      action: null,
    },
    {
      icon: Palette,
      title: "Customizable Styles",
      description: "Choose from various tones and styles: persuasive, friendly, professional, witty, or luxury.",
      color: "text-pink-400",
      action: "Choose Style",
      onClick: () => handleFeatureClick("Customizable Styles"),
      interactive: true,
    },
    {
      icon: BarChart3,
      title: "Platform Optimization",
      description: "Optimized for Google Ads, Facebook, Instagram, LinkedIn, Twitter/X, and more.",
      color: "text-cyan-400",
      action: "Select Platform",
      onClick: () => handleFeatureClick("Platform Optimization"),
      interactive: true,
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Beautiful, modern interface that works seamlessly on desktop and mobile devices.",
      color: "text-orange-400",
      action: null,
    },
    {
      icon: Cloud,
      title: "Cloud Storage",
      description: "Save and manage your ads with Convex backend. Access your content anywhere.",
      color: "text-indigo-400",
      action: "View Dashboard",
      onClick: () => handleFeatureClick("Cloud Storage"),
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Powerful Features for Modern Marketers
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to create, manage, and optimize your advertising campaigns
            in one powerful platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <ThreeDCard>
                  <div
                    className={`bg-gradient-to-b from-white/5 to-white/0 border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all glass ${
                      feature.onClick ? "cursor-pointer" : ""
                    }`}
                    onClick={feature.onClick}
                  >
                <div className={`${feature.color} mb-4`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{feature.description}</p>
                
                {feature.interactive && feature.title === "Multi-Language Support" && (
                  <div className="mt-4">
                    <select
                      value={selectedLanguage}
                      onChange={(e) => {
                        setSelectedLanguage(e.target.value);
                        toast.success(`Language changed to ${e.target.value}`);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full bg-dark-muted border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                    >
                      {languages.map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>
                )}

                {feature.interactive && feature.title === "Platform Optimization" && (
                  <div className="mt-4">
                    <select
                      value={selectedPlatform}
                      onChange={(e) => {
                        setSelectedPlatform(e.target.value);
                        toast.success(`Platform changed to ${e.target.value}`);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full bg-dark-muted border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                    >
                      {platforms.map((platform) => (
                        <option key={platform} value={platform}>{platform}</option>
                      ))}
                    </select>
                  </div>
                )}

                {feature.interactive && feature.title === "Customizable Styles" && (
                  <div className="mt-4">
                    <select
                      value={selectedTone}
                      onChange={(e) => {
                        setSelectedTone(e.target.value);
                        toast.success(`Style changed to ${e.target.value}`);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full bg-dark-muted border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                    >
                      {tones.map((tone) => (
                        <option key={tone} value={tone} className="capitalize">{tone}</option>
                      ))}
                    </select>
                  </div>
                )}

                {feature.action && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (feature.onClick) feature.onClick();
                    }}
                    className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary font-semibold rounded-lg transition-colors text-sm"
                  >
                    {feature.action}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                  </div>
                </ThreeDCard>
              </motion.div>
            );
          })}
        </div>

        {/* Cloud Storage Demo Section */}
        <div className="mb-12">
          <CloudStorageDemo />
        </div>

        {/* Additional Info Section */}
        <div className="bg-gradient-to-b from-white/5 to-white/0 border border-white/10 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Ad-Vision AI?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10x</div>
              <p className="text-gray-400">Faster than manual ad creation</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <p className="text-gray-400">Ad variations per generation</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-gray-400">Available anytime, anywhere</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold mb-6">Ready to Get Started?</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3 bg-primary text-primary-900 font-semibold rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Generate Your First Ad
            </Link>
            <Link
              href="/templates"
              className="px-6 py-3 bg-dark-muted border border-white/10 text-white font-semibold rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Browse Templates
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-dark-muted border border-white/10 text-white font-semibold rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <Cloud className="w-5 h-5" />
              View Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


