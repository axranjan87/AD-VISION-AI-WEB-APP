"use client";

import Link from "next/link";
import {
  MessageCircle,
  Sparkles,
} from "lucide-react";

export function Footer() {
  const legalLinks = [
    { label: "Terms", href: "/terms" },
    { label: "DMCA", href: "/dmca" },
    { label: "Affiliates", href: "/affiliates" },
  ];

  const socialLinks = [
    { label: "X (Twitter)", href: "https://twitter.com/advision", hoverColor: "#1DA1F2", emoji: "𝕏" },
    { label: "Facebook", href: "https://facebook.com/advision", hoverColor: "#1877F2", emoji: "📘" },
    { label: "Apple", href: "https://apps.apple.com/advision", hoverColor: "#999", emoji: "🍎" },
  ];

  return (
    <footer className="border-t border-white/10 bg-dark-bg/80 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and Copyright */}
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-primary" />
            <div>
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} Ad-Vision AI. All rights reserved.
              </p>
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4 text-sm text-gray-400">
            {legalLinks.map((link, index) => (
              <span key={index} className="flex items-center gap-4">
                <Link
                  href={link.href}
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
                {index < legalLinks.length - 1 && (
                  <span className="text-white/20">|</span>
                )}
              </span>
            ))}
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-3">
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
      </div>
    </footer>
  );
}
