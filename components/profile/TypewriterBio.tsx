"use client";

import React, { useEffect, useState } from "react";

interface TypewriterBioProps {
  text: string;
  enabled: boolean;
  accentColor?: string;
}

export const TypewriterBio: React.FC<TypewriterBioProps> = ({
  text,
  enabled,
  accentColor = "#a855f7",
}) => {
  const [displayedText, setDisplayedText] = useState<string>(enabled ? "" : text);
  const [isTyping, setIsTyping] = useState<boolean>(enabled);

  useEffect(() => {
    if (!enabled) {
      setDisplayedText(text);
      setIsTyping(false);
      return;
    }

    setDisplayedText("");
    setIsTyping(true);
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [text, enabled]);

  return (
    <div className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed whitespace-pre-line text-center px-2">
      {displayedText}
      {isTyping && (
        <span
          className="inline-block w-1.5 h-3.5 ml-1 animate-pulse"
          style={{ backgroundColor: accentColor }}
        />
      )}
    </div>
  );
};
