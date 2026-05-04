"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  Video,
  FileText,
  Zap,
  Globe,
  Shield,
  Palette,
  BarChart3,
  Smartphone,
  Cloud,
  ArrowRight,
  Check,
  Rocket,
  Star,
  Users,
  TrendingUp,
  Clock,
  Award,
  MessageCircle,
  HelpCircle,
  Book,
  Settings,
  Crown,
} from "lucide-react";
import { ThreeDCard } from "@/components/ThreeDCard";
import toast from "react-hot-toast";

export default function LaunchPage() {
  const [isLaunched, setIsLaunched] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (isLaunched) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            window.location.href = "/";
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isLaunched]);

  const handleLaunch = () => {
    setIsLaunched(true);
    toast.success("Launching Ad-Vision AI...");
  };

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Generation",
      description: "Advanced AI creates high-converting ads in seconds",
      color: "text-primary",
      gradient: "from-green-500/20 to-emerald-500/20",
    },
    {
      icon: Video,
      title: "Video Ad Creation",
      description: "Generate professional video advertisements instantly",
      color: "text-blue-400",
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: FileText,
      title: "Text Ad Generation",
      description: "Create compelling ad copy with multiple variations",
      color: "text-purple-400",
      gradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      icon: Globe,
      title: "40+ Languages",
      description: "Multi-language support for global reach",
      color: "text-yellow-400",
      gradient: "from-yellow-500/20 to-orange-500/20",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate ads in seconds, not hours",
      color: "text-red-400",
      gradient: "from-red-500/20 to-rose-500/20",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise security",
      color: "text-indigo-400",
      gradient: "from-indigo-500/20 to-violet-500/20",
    },
    {
      icon: Palette,
      title: "Customizable Styles",
      description: "Multiple tones and styles to match your brand",
      color: "text-pink-400",
      gradient: "from-pink-500/20 to-rose-500/20",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track performance and optimize your campaigns",
      color: "text-teal-400",
      gradient: "from-teal-500/20 to-cyan-500/20",
    },
    {
      icon: Smartphone,
      title: "Multi-Platform",
      description: "Optimized for all major advertising platforms",
      color: "text-orange-400",
      gradient: "from-orange-500/20 to-amber-500/20",
    },
  ];

  const stats = [
    { icon: Users, label: "Active Users", value: "50K+", color: "text-blue-400" },
    { icon: TrendingUp, label: "Ads Generated", value: "500K+", color: "text-green-400" },
    { icon: Clock, label: "Time Saved", value: "10K+ hrs", color: "text-purple-400" },
    { icon: Award, label: "Success Rate", value: "98%", color: "text-yellow-400" },
  ];

  const benefits = [
    "Generate ads in 30 seconds",
    "40+ language support",
    "AI-powered optimization",
    "Professional templates",
    "Real-time collaboration",
    "24/7 support available",
    "Secure cloud storage",
    "Multi-platform export",
  ];

  if (isLaunched) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-purple-500/10 to-blue-500/10">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mx-auto"
          >
            <Rocket className="w-24 h-24 text-primary" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold gradient-text">
            Launching Ad-Vision AI...
          </h2>
          <p className="text-xl text-gray-300">
            Redirecting in {countdown} seconds
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-primary text-primary-900 font-bold rounded-xl hover:bg-primary/90 transition-all transform hover:scale-105"
          >
            Go Now →
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            {/* Launch Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/50 rounded-full text-primary text-sm font-semibold"
            >
              <Star className="w-4 h-4 fill-primary" />
              <span>Official Launch - Full Features</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight"
            >
              <span className="gradient-text">Ad-Vision AI</span>
              <br />
              <span className="text-white">Is Now Live!</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            >
              Experience the future of AI-powered advertising. Create stunning ads in seconds with our full-featured platform.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-8"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <ThreeDCard key={index}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="bg-gradient-to-b from-white/10 to-white/5 border border-white/20 rounded-xl p-4 text-center glass"
                    >
                      <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                      <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                    </motion.div>
                  </ThreeDCard>
                );
              })}
            </motion.div>

            {/* Launch Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
            >
              <button
                onClick={handleLaunch}
                className="group relative px-12 py-6 bg-gradient-to-r from-primary via-emerald-500 to-primary text-white font-bold text-lg rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-primary/50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Rocket className="w-6 h-6" />
                  Launch App Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/80 to-emerald-500/80"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </button>
              <Link
                href="/pricing"
                className="px-12 py-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/30 text-white font-semibold text-lg rounded-xl hover:bg-yellow-500/30 transition-all transform hover:scale-105"
              >
                View Pricing
              </Link>
              <Link
                href="/features"
                className="px-12 py-6 border-2 border-white/30 text-white font-semibold text-lg rounded-xl hover:bg-white/10 transition-all transform hover:scale-105"
              >
                Explore Features
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-dark-bg/50">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Complete Feature Set
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to create, manage, and optimize your advertising campaigns
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <ThreeDCard key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-gradient-to-br ${feature.gradient} border border-white/10 rounded-xl p-6 glass hover:border-primary/50 transition-all h-full`}
                  >
                    <div className={`w-12 h-12 ${feature.color} bg-white/10 rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-300 text-sm">{feature.description}</p>
                  </motion.div>
                </ThreeDCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <ThreeDCard>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 border border-primary/30 rounded-2xl p-8 md:p-12"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
                    Why Choose Ad-Vision AI?
                  </h2>
                  <p className="text-lg text-gray-300 mb-6">
                    Join thousands of marketers who are already using AI to transform their advertising workflow.
                  </p>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 text-gray-200"
                      >
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: MessageCircle, text: "24/7 Support", color: "bg-blue-500/20 text-blue-400" },
                    { icon: HelpCircle, text: "Help Center", color: "bg-purple-500/20 text-purple-400" },
                    { icon: Book, text: "Documentation", color: "bg-green-500/20 text-green-400" },
                    { icon: Settings, text: "Easy Setup", color: "bg-orange-500/20 text-orange-400" },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className={`${item.color} rounded-xl p-6 text-center`}
                      >
                        <Icon className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm font-semibold">{item.text}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </ThreeDCard>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-dark-bg/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Start free, upgrade as you grow. Cancel anytime.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              {
                name: "Free",
                price: "$0",
                desc: "Perfect for getting started",
                features: ["10 Text ads/month", "2 Video ads/month", "Basic templates"],
                color: "from-gray-500/20 to-slate-500/20",
                icon: Sparkles,
              },
              {
                name: "Pro",
                price: "$29",
                desc: "For professionals",
                popular: true,
                features: ["Unlimited Text ads", "50 Video ads/month", "All features"],
                color: "from-primary/20 to-emerald-500/20",
                icon: Zap,
              },
              {
                name: "Ultra",
                price: "$99",
                desc: "For agencies",
                features: ["Unlimited everything", "Priority support", "Enterprise features"],
                color: "from-yellow-500/20 to-orange-500/20",
                icon: Crown,
              },
            ].map((plan, index) => {
              const Icon = plan.icon;
              return (
                <ThreeDCard key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-gradient-to-br ${plan.color} border-2 rounded-xl p-6 ${
                      plan.popular ? "border-primary shadow-xl shadow-primary/20" : "border-white/10"
                    }`}
                  >
                    {plan.popular && (
                      <span className="inline-block px-3 py-1 bg-primary text-primary-900 text-xs font-bold rounded-full mb-4">
                        Most Popular
                      </span>
                    )}
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-3xl font-bold text-white">{plan.price}</span>
                      {plan.price !== "$0" && <span className="text-gray-400">/mo</span>}
                    </div>
                    <p className="text-gray-300 text-sm mb-4">{plan.desc}</p>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/pricing"
                      className={`block w-full text-center py-3 rounded-lg font-semibold transition-all ${
                        plan.popular
                          ? "bg-gradient-to-r from-primary to-emerald-500 text-white hover:from-primary/90 hover:to-emerald-500/90"
                          : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                      }`}
                    >
                      Choose Plan
                    </Link>
                  </motion.div>
                </ThreeDCard>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold"
            >
              View All Plans & Features
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              Ready to Transform Your Advertising?
            </h2>
            <p className="text-xl text-gray-300">
              Start creating high-converting ads in seconds. No credit card required for free plan.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleLaunch}
                className="px-10 py-5 bg-primary text-primary-900 font-bold text-lg rounded-xl hover:bg-primary/90 transition-all transform hover:scale-105 shadow-xl shadow-primary/50 flex items-center gap-2"
              >
                <Rocket className="w-5 h-5" />
                Launch Now
              </button>
              <Link
                href="/pricing"
                className="px-10 py-5 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/30 text-white font-semibold text-lg rounded-xl hover:bg-yellow-500/30 transition-all"
              >
                View Pricing
              </Link>
              <Link
                href="/about"
                className="px-10 py-5 border-2 border-white/30 text-white font-semibold text-lg rounded-xl hover:bg-white/10 transition-all"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
