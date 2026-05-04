"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Crown,
  Key,
  Settings,
  LifeBuoy,
  X,
  Menu,
} from "lucide-react";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { icon: Rocket, label: "What's New", href: "/whats-new", color: "text-primary" },
    { icon: Crown, label: "Premium Plans", href: "/pricing", color: "text-yellow-400" },
    { icon: Key, label: "API Access", href: "/api-access", color: "text-blue-400" },
    { icon: Settings, label: "Settings", href: "/settings", color: "text-gray-300" },
    { icon: LifeBuoy, label: "FAQ & Help", href: "/faq", color: "text-purple-400" },
  ];

  const socialLinks = [
    { label: "X (Twitter)", href: "https://twitter.com/advision", hoverColor: "#1DA1F2", emoji: "𝕏" },
    { label: "Facebook", href: "https://facebook.com/advision", hoverColor: "#1877F2", emoji: "📘" },
    { label: "Apple", href: "https://apps.apple.com/advision", hoverColor: "#999", emoji: "🍎" },
  ];

  const legalLinks = [
    { label: "Terms", href: "/terms" },
    { label: "DMCA", href: "/dmca" },
    { label: "Affiliates", href: "/affiliates" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-20 z-40 p-3 bg-dark-card border border-white/10 rounded-lg hover:bg-white/10 transition-all shadow-lg"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-dark-bg via-dark-card to-dark-bg border-r border-white/10 z-50 overflow-y-auto shadow-2xl"
            >
              <div className="flex flex-col h-full p-6">
                {/* Logo */}
                <div className="mb-8 pt-16">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-emerald-500 rounded-lg flex items-center justify-center">
                      <Rocket className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold gradient-text">Ad-Vision AI</span>
                  </Link>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 space-y-2 mb-8">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={index}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                          isActive(item.href)
                            ? "bg-gradient-to-r from-primary/20 to-emerald-500/20 border border-primary/30 text-white"
                            : "text-gray-300 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive(item.href) ? item.color : "text-gray-400 group-hover:" + item.color}`} />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>

                {/* Divider */}
                <div className="border-t border-white/10 my-6" />

                {/* Legal Links */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                  {legalLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Social Media Links */}
                <div className="flex items-center gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 transition-all text-lg w-10 h-10 flex items-center justify-center"
                      style={{ "--hover-color": social.hoverColor } as React.CSSProperties}
                      onMouseEnter={(e) => (e.currentTarget.style.color = social.hoverColor)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                      aria-label={social.label}
                    >
                      {social.emoji}
                    </a>
                  ))}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
