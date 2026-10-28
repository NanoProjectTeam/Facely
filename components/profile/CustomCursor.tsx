"use client";

import React, { useEffect, useState } from "react";
import { CursorType } from "@/lib/types";

interface CustomCursorProps {
  cursorType: CursorType;
  accentColor?: string;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({
  cursorType,
  accentColor = "#a855f7",
}) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (cursorType === "default") return;

    // Detect touch device
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.classList.contains("cursor-pointer"))
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorType]);

  if (cursorType === "default" || !isVisible) return null;

  if (cursorType === "crosshair") {
    return (
      <div
        className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      >
        <div className="relative w-6 h-6 flex items-center justify-center">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          {/* Crosshair lines */}
          <div
            className="absolute w-6 h-[1px] opacity-60"
            style={{ backgroundColor: accentColor }}
          />
          <div
            className="absolute h-6 w-[1px] opacity-60"
            style={{ backgroundColor: accentColor }}
          />
        </div>
      </div>
    );
  }

  if (cursorType === "dot" || cursorType === "glow-orb") {
    return (
      <div
        className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 transition-all duration-75 ease-out"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      >
        <div
          className={`rounded-full transition-all duration-200 ${
            isHovering ? "scale-150" : "scale-100"
          }`}
          style={{
            width: cursorType === "glow-orb" ? "20px" : "8px",
            height: cursorType === "glow-orb" ? "20px" : "8px",
            backgroundColor: cursorType === "glow-orb" ? `${accentColor}40` : accentColor,
            border: cursorType === "glow-orb" ? `1px solid ${accentColor}` : "none",
            boxShadow: `0 0 12px ${accentColor}`,
          }}
        />
      </div>
    );
  }

  return null;
};
