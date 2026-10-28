"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Sparkles } from "lucide-react";

interface ClickToEnterOverlayProps {
  enterText?: string;
  subtext?: string;
  accentColor?: string;
  onEnter: () => void;
}

export const ClickToEnterOverlay: React.FC<ClickToEnterOverlayProps> = ({
  enterText = "[ click to enter ]",
  subtext = "tap anywhere to explore profile",
  accentColor = "#a855f7",
  onEnter,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsVisible(false);
    onEnter();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleClick}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl cursor-pointer select-none px-4 text-center"
        >
          {/* Subtle glowing orb behind text */}
          <div
            className="absolute w-72 h-72 rounded-full blur-3xl opacity-25 pointer-events-none transition-all duration-700 animate-pulse-glow"
            style={{ backgroundColor: accentColor }}
          />

          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="relative flex flex-col items-center space-y-3 z-10"
          >
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-zinc-400">
              <Sparkles className="w-3.5 h-3.5" style={{ color: accentColor }} />
              <span>FACELY BIO-LINK</span>
            </div>

            <motion.h1
              animate={{ opacity: [0.75, 1, 0.75] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="text-2xl sm:text-4xl font-mono tracking-wider font-bold text-white drop-shadow-md"
            >
              {enterText}
            </motion.h1>

            {subtext && (
              <p className="text-xs sm:text-sm text-zinc-400 font-sans tracking-wide">
                {subtext}
              </p>
            )}

            <div className="pt-4 flex items-center space-x-2 text-xs text-zinc-500 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              <Volume2 className="w-3.5 h-3.5 text-zinc-400" />
              <span>Audio will autoplay</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
