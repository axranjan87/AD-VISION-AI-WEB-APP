"use client";

import { Sparkles, Users, Target, Zap } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Ad-Vision AI</h1>
          <p className="text-gray-400 text-lg">
            Revolutionizing ad creation with the power of Artificial Intelligence
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-gradient-to-b from-white/5 to-white/0 border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              Ad Craft AI bridges the gap between marketing creativity and automation. 
              We empower businesses and marketers to create high-converting advertisements 
              in seconds, not hours. Our platform leverages cutting-edge AI technology to 
              generate personalized ad content that resonates with your target audience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-b from-white/5 to-white/0 border border-white/10 rounded-xl p-6 text-center">
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
              <p className="text-gray-400 text-sm">
                Advanced AI algorithms create compelling ad content
              </p>
            </div>
            <div className="bg-gradient-to-b from-white/5 to-white/0 border border-white/10 rounded-xl p-6 text-center">
              <Target className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Targeted</h3>
              <p className="text-gray-400 text-sm">
                Personalized ads for your specific audience
              </p>
            </div>
            <div className="bg-gradient-to-b from-white/5 to-white/0 border border-white/10 rounded-xl p-6 text-center">
              <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast</h3>
              <p className="text-gray-400 text-sm">
                Generate professional ads in seconds
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-b from-white/5 to-white/0 border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-primary mb-2">Frontend</p>
                <ul className="text-gray-400 space-y-1">
                  <li>• React 18 & Next.js 14</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• Responsive Design</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-primary mb-2">Backend & AI</p>
                <ul className="text-gray-400 space-y-1">
                  <li>• Convex Database</li>
                  <li>• Akool AI Integration</li>
                  <li>• OpenAI (Fallback)</li>
                  <li>• Real-time Updates</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-primary text-primary-900 font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Start Creating Ads
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

