"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LifeBuoy, ChevronDown, HelpCircle, MessageCircle, Book } from "lucide-react";
import { ThreeDCard } from "@/components/ThreeDCard";
import Link from "next/link";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "How do I get started with Ad-Vision AI?",
          a: "Simply sign up for a free account, and you can start generating ads immediately. No credit card required for the free plan.",
        },
        {
          q: "What's the difference between Free, Pro, and Ultra plans?",
          a: "Free plan offers 10 text ads and 2 video ads per month. Pro ($29/mo) offers unlimited text ads, 50 video ads, and advanced features. Ultra ($99/mo) includes everything unlimited plus enterprise features and dedicated support.",
        },
        {
          q: "Do I need to install anything?",
          a: "No! Ad-Vision AI is a web-based platform. Just visit our website, sign up, and start creating ads in your browser.",
        },
      ],
    },
    {
      category: "Features & Usage",
      questions: [
        {
          q: "What platforms are supported?",
          a: "We support all major advertising platforms including Google Ads, Facebook, Instagram, LinkedIn, Twitter/X, TikTok, YouTube, Pinterest, and Snapchat.",
        },
        {
          q: "How many languages are supported?",
          a: "We support 40+ languages including English, Spanish, French, German, Italian, Portuguese, Chinese, Japanese, Korean, Arabic, Hindi, and many more.",
        },
        {
          q: "How long does video generation take?",
          a: "Video generation typically takes 1-2 minutes depending on complexity. You'll receive a notification when your video is ready.",
        },
        {
          q: "Can I customize the generated ads?",
          a: "Yes! You can edit, modify, and customize all generated ads. Premium plans include advanced customization options.",
        },
      ],
    },
    {
      category: "Billing & Plans",
      questions: [
        {
          q: "Can I change plans anytime?",
          a: "Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately.",
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit cards, debit cards, and PayPal. Enterprise plans also support bank transfers.",
        },
        {
          q: "Is there a refund policy?",
          a: "Yes, we offer a 30-day money-back guarantee on all paid plans. No questions asked.",
        },
        {
          q: "Do you offer yearly discounts?",
          a: "Yes! Annual plans save you up to 17% compared to monthly billing.",
        },
      ],
    },
    {
      category: "Technical Support",
      questions: [
        {
          q: "What if I encounter an error?",
          a: "Check our troubleshooting guide in the help section, or contact our 24/7 support team via the chatbox. We're here to help!",
        },
        {
          q: "Do you offer API access?",
          a: "Yes! API access is available on Pro and Ultra plans. Visit the API Access page for documentation and examples.",
        },
        {
          q: "Is my data secure?",
          a: "Absolutely! We use enterprise-grade encryption and follow industry best practices to keep your data safe and secure.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-4xl">
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
            <LifeBuoy className="w-4 h-4" />
            <span>FAQ & Help</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            <span className="gradient-text">Frequently Asked</span>
            <br />
            <span className="text-white">Questions</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions and get help with Ad-Vision AI
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-8 mb-12">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-bold text-white mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, index) => {
                  const globalIndex = categoryIndex * 100 + index;
                  const isOpen = openIndex === globalIndex;
                  
                  return (
                    <ThreeDCard key={index}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                        >
                          <span className="font-semibold text-white pr-4">{faq.q}</span>
                          <ChevronDown
                            className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                              isOpen ? "transform rotate-180" : ""
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-6 pb-4"
                          >
                            <p className="text-gray-300 leading-relaxed">{faq.a}</p>
                          </motion.div>
                        )}
                      </motion.div>
                    </ThreeDCard>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Help Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Need More Help?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: MessageCircle,
                title: "24/7 Chat Support",
                description: "Get instant help from our support team",
                action: "Open Chat",
                color: "text-blue-400",
              },
              {
                icon: Book,
                title: "Documentation",
                description: "Comprehensive guides and tutorials",
                action: "View Docs",
                color: "text-green-400",
              },
              {
                icon: HelpCircle,
                title: "Contact Us",
                description: "Reach out via email or support ticket",
                action: "Contact",
                color: "text-purple-400",
              },
            ].map((resource, index) => {
              const Icon = resource.icon;
              return (
                <ThreeDCard key={index}>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                    <Icon className={`w-10 h-10 ${resource.color} mx-auto mb-4`} />
                    <h3 className="text-lg font-bold text-white mb-2">{resource.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{resource.description}</p>
                    <button className="px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors text-sm font-semibold">
                      {resource.action}
                    </button>
                  </div>
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
              <h3 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h3>
              <p className="text-gray-300 mb-6">
                Our support team is available 24/7 to help you
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/"
                  className="px-8 py-4 bg-primary text-primary-900 font-bold rounded-lg hover:bg-primary/90 transition-all"
                >
                  Start Chat
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </ThreeDCard>
        </motion.div>
      </div>
    </div>
  );
}
