"use client";

import React, { useEffect, useRef } from "react";
import { ProfileEffects, ProfileTheme } from "@/lib/types";

interface BackgroundEffectsProps {
  theme: ProfileTheme;
  effects: ProfileEffects;
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({
  theme,
  effects,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Particles animation canvas
  useEffect(() => {
    if (effects.particles === "none" || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle types
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      rotation?: number;
      rotationSpeed?: number;
    }

    const particles: Particle[] = [];
    const count = effects.particles === "rain" ? 100 : 50;

    for (let i = 0; i < count; i++) {
      if (effects.particles === "snow") {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2.5 + 1,
          speedX: Math.random() * 0.8 - 0.4,
          speedY: Math.random() * 1.2 + 0.5,
          opacity: Math.random() * 0.6 + 0.2,
          color: "#ffffff",
        });
      } else if (effects.particles === "sakura") {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 5 + 4,
          speedX: Math.random() * 1.5 - 0.2,
          speedY: Math.random() * 1.4 + 0.8,
          opacity: Math.random() * 0.6 + 0.3,
          color: Math.random() > 0.5 ? "#f472b6" : "#fbcfe8",
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 0.05,
        });
      } else if (effects.particles === "embers") {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.8,
          speedY: -(Math.random() * 1.6 + 0.8), // float upward
          opacity: Math.random() * 0.8 + 0.2,
          color: Math.random() > 0.5 ? "#ef4444" : "#f97316",
        });
      } else if (effects.particles === "sparkles") {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.9 + 0.1,
          color: theme.accentColor || "#a855f7",
        });
      } else if (effects.particles === "rain") {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 1,
          speedX: -1,
          speedY: Math.random() * 12 + 10,
          opacity: Math.random() * 0.4 + 0.2,
          color: "#93c5fd",
        });
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around
        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
        } else if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;

        ctx.save();
        ctx.globalAlpha = p.opacity;

        if (effects.particles === "sakura") {
          ctx.translate(p.x, p.y);
          p.rotation = (p.rotation || 0) + (p.rotationSpeed || 0.02);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          // Draw petal ellipse
          ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (effects.particles === "rain") {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - 3, p.y + 16);
          ctx.stroke();
        } else {
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [effects.particles, theme.accentColor]);

  const isVideo =
    theme.backgroundType === "video" &&
    theme.backgroundUrl &&
    (theme.backgroundUrl.endsWith(".mp4") ||
      theme.backgroundUrl.endsWith(".webm") ||
      theme.backgroundUrl.includes("video"));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 1. Underlying background media/color */}
      {isVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{
            filter: `blur(${theme.backgroundBlur}px)`,
          }}
          src={theme.backgroundUrl}
        />
      ) : theme.backgroundType === "image" && theme.backgroundUrl ? (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: `url(${theme.backgroundUrl})`,
            filter: `blur(${theme.backgroundBlur}px)`,
            transform: theme.backgroundBlur > 0 ? "scale(1.05)" : "none", // Prevent white borders on blur
          }}
        />
      ) : theme.backgroundType === "gradient" ? (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${theme.accentColor}25 0%, ${theme.backgroundColor} 75%)`,
          }}
        />
      ) : (
        <div
          className="absolute inset-0 w-full h-full"
          style={{ backgroundColor: theme.backgroundColor }}
        />
      )}

      {/* 2. Adjustable Darkness Layer */}
      <div
        className="absolute inset-0 bg-black transition-opacity duration-500"
        style={{ opacity: theme.backgroundDarkness / 100 }}
      />

      {/* 3. Canvas Particles */}
      {effects.particles !== "none" && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />
      )}

      {/* 4. Film Grain Overlay */}
      {effects.filmGrain && <div className="grain-overlay" />}

      {/* 5. Vignette Overlay */}
      {effects.vignette && <div className="vignette-overlay" />}

      {/* 6. CRT Scanlines Overlay */}
      {effects.crtScanlines && <div className="crt-overlay" />}
    </div>
  );
};
