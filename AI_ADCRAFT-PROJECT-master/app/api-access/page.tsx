"use client";

import { motion } from "framer-motion";
import { Key, Code, Book, Terminal, Copy, Check } from "lucide-react";
import { ThreeDCard } from "@/components/ThreeDCard";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function APIAccessPage() {
  const [apiKey, setApiKey] = useState("sk_live_advision_xxxxxxxxxxxxxxxxxxxxx");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    toast.success("API Key copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const codeExample = `// Generate Text Ad
curl -X POST https://api.advision.ai/v1/ads/text \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "product": "Premium Headphones",
    "audience": "Tech enthusiasts",
    "tone": "persuasive",
    "platform": "Google Ads",
    "language": "English",
    "length": "medium"
  }'`;

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
            <Key className="w-4 h-4" />
            <span>API Access</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            <span className="gradient-text">Developer API</span>
            <br />
            <span className="text-white">Integration Made Easy</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Integrate Ad-Vision AI into your applications with our powerful REST API
          </p>
        </motion.div>

        {/* API Key Card */}
        <ThreeDCard>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-primary/20 to-emerald-500/20 border border-primary/30 rounded-xl p-8 mb-12"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Your API Key</h2>
                <p className="text-gray-300 text-sm">Keep this secure and don't share it publicly</p>
              </div>
              <Key className="w-12 h-12 text-primary" />
            </div>
            <div className="flex items-center gap-3">
              <code className="flex-1 px-4 py-3 bg-dark-bg border border-white/10 rounded-lg text-white font-mono text-sm">
                {apiKey}
              </code>
              <button
                onClick={copyToClipboard}
                className="px-6 py-3 bg-primary text-primary-900 font-semibold rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Active</span>
              <span>• Pro Plan • Unlimited requests</span>
            </div>
          </motion.div>
        </ThreeDCard>

        {/* Quick Start */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 gradient-text">Quick Start</h2>
          <ThreeDCard>
            <div className="bg-dark-card border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-white">cURL Example</h3>
              </div>
              <pre className="bg-dark-bg p-4 rounded-lg overflow-x-auto text-sm text-gray-300 font-mono">
                <code>{codeExample}</code>
              </pre>
            </div>
          </ThreeDCard>
        </motion.div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Code,
              title: "REST API",
              description: "Standard REST endpoints for easy integration",
              color: "text-blue-400",
            },
            {
              icon: Book,
              title: "Documentation",
              description: "Comprehensive docs with examples",
              color: "text-green-400",
            },
            {
              icon: Key,
              title: "API Keys",
              description: "Secure authentication with API keys",
              color: "text-purple-400",
            },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <ThreeDCard key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <Icon className={`w-8 h-8 ${feature.color} mb-4`} />
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              </ThreeDCard>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <ThreeDCard>
            <div className="bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 border border-primary/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Need API Access?</h3>
              <p className="text-gray-300 mb-6">
                API access is available on Pro and Ultra plans. Upgrade now to get started!
              </p>
              <Link
                href="/pricing"
                className="inline-block px-8 py-4 bg-primary text-primary-900 font-bold rounded-lg hover:bg-primary/90 transition-all"
              >
                View Pricing Plans
              </Link>
            </div>
          </ThreeDCard>
        </motion.div>
      </div>
    </div>
  );
}
