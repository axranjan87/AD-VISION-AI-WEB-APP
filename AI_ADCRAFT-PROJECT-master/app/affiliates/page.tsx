"use client";

import { motion } from "framer-motion";
import { Users, DollarSign, Share2, Check } from "lucide-react";
import { ThreeDCard } from "@/components/ThreeDCard";
import Link from "next/link";

export default function AffiliatesPage() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Earn Commissions",
      description: "Get 30% recurring commission on all referrals",
      color: "text-green-400",
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share your unique affiliate link via social media, email, or blog",
      color: "text-blue-400",
    },
    {
      icon: Users,
      title: "Unlimited Referrals",
      description: "No limit on the number of people you can refer",
      color: "text-purple-400",
    },
  ];

  const steps = [
    "Sign up for an affiliate account",
    "Get your unique affiliate link",
    "Share your link with others",
    "Earn commissions when they subscribe",
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
            <Users className="w-4 h-4" />
            <span>Affiliate Program</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            <span className="gradient-text">Join Our Affiliate</span>
            <br />
            <span className="text-white">Program</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Earn money by referring Ad-Vision AI to others. Get 30% recurring commission on every subscription.
          </p>
        </motion.div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <ThreeDCard key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 text-center"
                >
                  <Icon className={`w-12 h-12 ${benefit.color} mx-auto mb-4`} />
                  <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </motion.div>
              </ThreeDCard>
            );
          })}
        </div>

        {/* How It Works */}
        <ThreeDCard>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 border border-primary/30 rounded-xl p-8 mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                    {index + 1}
                  </div>
                  <p className="text-gray-300">{step}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </ThreeDCard>

        {/* Commission Structure */}
        <ThreeDCard>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 rounded-xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Commission Structure</h2>
            <div className="space-y-4">
              {[
                { plan: "Pro Plan ($29/month)", commission: "$8.70/month recurring" },
                { plan: "Ultra Plan ($99/month)", commission: "$29.70/month recurring" },
                { plan: "Annual Pro Plan ($290/year)", commission: "$87 one-time + recurring" },
                { plan: "Annual Ultra Plan ($990/year)", commission: "$297 one-time + recurring" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                  <span className="text-gray-300">{item.plan}</span>
                  <span className="text-primary font-bold">{item.commission}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
              <p className="text-white font-semibold">
                💡 Commissions are paid monthly via PayPal or bank transfer
              </p>
            </div>
          </motion.div>
        </ThreeDCard>

        {/* Requirements */}
        <ThreeDCard>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 rounded-xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Requirements</h2>
            <ul className="space-y-3">
              {[
                "Must have an active Ad-Vision AI account",
                "Must comply with our terms of service",
                "No spam or unethical marketing practices",
                "Valid PayPal or bank account for payments",
              ].map((req, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </ThreeDCard>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <ThreeDCard>
            <div className="bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 border border-primary/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Earning?</h3>
              <p className="text-gray-300 mb-6">
                Join our affiliate program today and start earning commissions
              </p>
              <Link
                href="/signup?ref=affiliate"
                className="inline-block px-8 py-4 bg-primary text-primary-900 font-bold rounded-lg hover:bg-primary/90 transition-all"
              >
                Join Affiliate Program
              </Link>
            </div>
          </ThreeDCard>
        </motion.div>
      </div>
    </div>
  );
}
