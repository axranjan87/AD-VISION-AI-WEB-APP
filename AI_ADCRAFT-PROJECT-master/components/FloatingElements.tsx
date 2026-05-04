"use client";

import { motion } from "framer-motion";
import { Sparkles, Video, FileText } from "lucide-react";

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      <motion.div
        className="absolute top-20 left-10 text-primary/25"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Sparkles className="w-16 h-16 drop-shadow-lg" />
      </motion.div>

      <motion.div
        className="absolute top-40 right-20 text-blue-400/25"
        animate={{
          y: [0, 40, 0],
          rotate: [0, -10, 10, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <Video className="w-20 h-20 drop-shadow-lg" />
      </motion.div>

      <motion.div
        className="absolute bottom-40 left-20 text-emerald-400/25"
        animate={{
          y: [0, -35, 0],
          rotate: [0, 12, -12, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <FileText className="w-14 h-14 drop-shadow-lg" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 text-purple-400/25"
        animate={{
          y: [0, 25, 0],
          rotate: [0, -12, 12, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      >
        <Sparkles className="w-12 h-12 drop-shadow-lg" />
      </motion.div>

      {/* Additional floating elements */}
      <motion.div
        className="absolute top-1/2 left-1/4 text-cyan-400/20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 360],
          scale: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <Sparkles className="w-10 h-10" />
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-1/3 text-orange-400/20"
        animate={{
          y: [0, 30, 0],
          rotate: [0, -360],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
        }}
      >
        <Sparkles className="w-8 h-8" />
      </motion.div>
    </div>
  );
}




