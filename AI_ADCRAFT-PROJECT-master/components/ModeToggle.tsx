"use client";

import { AdMode } from "@/app/page";
import { motion } from "framer-motion";

interface ModeToggleProps {
  mode: AdMode;
  onModeChange: (mode: AdMode) => void;
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="flex gap-2 justify-center">
      <motion.button
        onClick={() => onModeChange("text")}
        data-mode="text"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${
          mode === "text"
            ? "bg-gradient-to-b from-primary to-primary/80 text-primary-900 shadow-lg shadow-primary/30"
            : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/8"
        }`}
      >
        Text Ads
      </motion.button>
      <motion.button
        onClick={() => onModeChange("video")}
        data-mode="video"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${
          mode === "video"
            ? "bg-gradient-to-b from-primary to-primary/80 text-primary-900 shadow-lg shadow-primary/30"
            : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/8"
        }`}
      >
        Video Ads
      </motion.button>
    </div>
  );
}

