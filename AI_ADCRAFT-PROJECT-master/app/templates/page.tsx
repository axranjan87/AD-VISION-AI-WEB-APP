"use client";

import { useState, useEffect } from "react";
import { LayoutTemplate, Sparkles, Copy, Play, Plus } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

interface Template {
  id: string;
  name: string;
  description: string;
  product: string;
  audience: string;
  tone: string;
  platform: string;
  type: "text" | "video";
  usageCount: number;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load templates from localStorage or API
    const savedTemplates = JSON.parse(localStorage.getItem("templates") || "[]");
    setTemplates(savedTemplates);
    setIsLoading(false);
  }, []);

  const defaultTemplates: Template[] = [
    {
      id: "1",
      name: "E-commerce Product Launch",
      description: "Perfect for launching new products on social media",
      product: "Premium Wireless Headphones",
      audience: "Tech enthusiasts and music lovers",
      tone: "persuasive",
      platform: "Instagram",
      type: "video",
      usageCount: 0,
    },
    {
      id: "2",
      name: "SaaS Service Promotion",
      description: "Professional B2B service advertisement",
      product: "Cloud-based Project Management Tool",
      audience: "Business professionals and teams",
      tone: "professional",
      platform: "LinkedIn",
      type: "text",
      usageCount: 0,
    },
    {
      id: "3",
      name: "Local Business Promotion",
      description: "Friendly and approachable local business ad",
      product: "Family Restaurant",
      audience: "Local families and food lovers",
      tone: "friendly",
      platform: "Facebook",
      type: "text",
      usageCount: 0,
    },
    {
      id: "4",
      name: "Luxury Brand Campaign",
      description: "High-end product showcase",
      product: "Premium Watch Collection",
      audience: "Affluent consumers",
      tone: "luxury",
      platform: "Instagram",
      type: "video",
      usageCount: 0,
    },
  ];

  const allTemplates = templates.length > 0 ? templates : defaultTemplates;

  const handleUseTemplate = (template: Template) => {
    // Store template data and redirect to home
    localStorage.setItem("selectedTemplate", JSON.stringify(template));
    toast.success(`Template "${template.name}" selected! Redirecting...`);
    // Redirect to home with template data
    setTimeout(() => {
      window.location.href = "/?template=" + template.id;
    }, 500);
  };

  const handleSaveAsTemplate = () => {
    toast.info("Save your current ad as a template from the home page");
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <LayoutTemplate className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">Ad Templates</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Choose from pre-built templates or create your own
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-gradient-to-b from-white/5 to-white/0 border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  {template.type === "video" ? (
                    <Play className="w-5 h-5 text-primary" />
                  ) : (
                    <Copy className="w-5 h-5 text-primary" />
                  )}
                  <h3 className="font-semibold text-lg">{template.name}</h3>
                </div>
                <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">
                  {template.usageCount} uses
                </span>
              </div>

              <p className="text-sm text-gray-400 mb-4">{template.description}</p>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Product:</span>
                  <span className="text-gray-300">{template.product}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Audience:</span>
                  <span className="text-gray-300">{template.audience}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Tone:</span>
                  <span className="text-gray-300 capitalize">{template.tone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Platform:</span>
                  <span className="text-gray-300">{template.platform}</span>
                </div>
              </div>

              <button
                onClick={() => handleUseTemplate(template)}
                className="w-full bg-primary text-primary-900 font-semibold py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Use Template
              </button>
            </div>
          ))}

          {/* Create New Template Card */}
          <Link
            href="/"
            className="bg-gradient-to-b from-white/5 to-white/0 border-2 border-dashed border-white/20 rounded-xl p-6 hover:border-primary/50 transition-all flex flex-col items-center justify-center min-h-[300px] text-center"
          >
            <Plus className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Create New Template</h3>
            <p className="text-sm text-gray-400">
              Generate an ad and save it as a reusable template
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}


