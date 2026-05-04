"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Rocket, Check, ArrowRight, Sparkles, Video, Globe, Zap } from "lucide-react";
import { ThreeDCard } from "@/components/ThreeDCard";

export default function WhatsNewPage() {
  const updates = [
    {
      date: "December 2024",
      version: "v2.0",
      title: "Major Platform Launch",
      icon: Rocket,
      color: "text-primary",
      features: [
        "Complete redesign with modern UI",
        "New launch page with full features",
        "Premium pricing tiers (Free, Pro, Ultra)",
        "24/7 Help chatbox integrated",
        "Enhanced navigation with sidebar",
      ],
    },
    {
      date: "November 2024",
      version: "v1.5",
      title: "Video Generation Enhancement",
      icon: Video,
      color: "text-blue-400",
      features: [
        "Faster video generation times",
        "Improved video quality",
        "New video templates",
        "Batch video processing",
      ],
    },
    {
      date: "October 2024",
      version: "v1.3",
      title: "Multi-Language Support",
      icon: Globe,
      color: "text-green-400",
      features: [
        "40+ languages supported",
        "Improved translation accuracy",
        "Regional tone optimization",
        "Cultural adaptation features",
      ],
    },
    {
      date: "September 2024",
      version: "v1.0",
      title: "Initial Release",
      icon: Sparkles,
      color: "text-purple-400",
      features: [
        "AI-powered text ad generation",
        "Video ad creation",
        "Multiple tone options",
        "Platform-specific optimization",
      ],
    },
  ];

  const upcoming = [
    {
      icon: Zap,
      title: "Advanced Analytics Dashboard",
      description: "Real-time performance tracking and insights",
      eta: "Q1 2025",
    },
    {
      icon: Video,
      title: "Live Video Editing",
      description: "Edit and customize videos in real-time",
      eta: "Q1 2025",
    },
    {
      icon: Globe,
      title: "API v2 Release",
      description: "Enhanced API with webhooks and more features",
      eta: "Q2 2025",
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/50 rounded-full text-primary text-sm font-semibold mb-6"
          >
            <Rocket className="w-4 h-4" />
            <span>What's New</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            <span className="gradient-text">Latest Updates</span>
            <br />
            <span className="text-white">& Features</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Stay updated with the latest improvements and new features
          </p>
        </motion.div>

        {/* Updates Timeline */}
        <div className="space-y-8 mb-20">
          {updates.map((update, index) => {
            const Icon = update.icon;
            return (
              <ThreeDCard key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl p-8"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-12 h-12 ${update.color} bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full font-semibold">
                          {update.version}
                        </span>
                        <span className="text-sm text-gray-400">{update.date}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{update.title}</h3>
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {update.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-300">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </ThreeDCard>
            );
          })}
        </div>

        {/* Upcoming Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-8 gradient-text text-center">Coming Soon</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {upcoming.map((item, index) => {
              const Icon = item.icon;
              return (
                <ThreeDCard key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-6"
                  >
                    <Icon className="w-8 h-8 text-primary mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                    <span className="text-xs text-primary font-semibold">{item.eta}</span>
                  </motion.div>
                </ThreeDCard>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <ThreeDCard>
            <div className="bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 border border-primary/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Try New Features?</h3>
              <p className="text-gray-300 mb-6">Start creating amazing ads with our latest updates</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/"
                  className="px-8 py-4 bg-primary text-primary-900 font-bold rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/pricing"
                  className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </ThreeDCard>
        </motion.div>
      </div>
    </div>
  );
}
