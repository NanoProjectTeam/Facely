"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Eye, Users, Sparkles } from "lucide-react";
import { Profile } from "@/lib/types";
import { BadgeList } from "./BadgeList";
import { TypewriterBio } from "./TypewriterBio";
import { DiscordPresence } from "./DiscordPresence";
import { SocialLinksList } from "./SocialLinksList";
import { formatNumber } from "@/lib/utils";

interface ProfileCardProps {
  profile: Profile;
  onLinkClick?: (linkId: string) => void;
  isInteractivePreview?: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onLinkClick,
  isInteractivePreview = false,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // 3D Tilt calculations
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!profile.effects.cardTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const { theme, effects } = profile;

  // Font class selection
  const fontClass =
    theme.font === "mono"
      ? "font-mono-custom"
      : theme.font === "serif"
      ? "font-serif-custom"
      : theme.font === "pixel"
      ? "font-pixel"
      : "font-aesthetic";

  return (
    <div className="w-full flex justify-center items-center py-10 px-4 perspective-1000">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: effects.cardTilt ? rotateX : 0,
          rotateY: effects.cardTilt ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`relative w-full max-w-sm sm:max-w-md flex flex-col items-center p-6 sm:p-8 transition-shadow duration-500 ${fontClass}`}
      >
        {/* Glassmorphic Background Panel */}
        <div
          className="absolute inset-0 transition-all duration-300 pointer-events-none"
          style={{
            borderRadius: `${theme.cardBorderRadius}px`,
            backgroundColor: `rgba(10, 10, 15, ${theme.cardOpacity / 100})`,
            backdropFilter: `blur(${theme.cardBlur}px)`,
            WebkitBackdropFilter: `blur(${theme.cardBlur}px)`,
            border: `1px solid ${theme.cardBorderColor || "rgba(255, 255, 255, 0.12)"}`,
            boxShadow: `0 20px 50px -10px rgba(0, 0, 0, 0.7), 0 0 ${
              theme.cardGlowIntensity
            }px -5px ${theme.cardGlowColor || theme.accentColor}35`,
          }}
        />

        {/* Inner Card Content */}
        <div className="relative z-10 w-full flex flex-col items-center">
          {/* Avatar with Glow Border */}
          <div className="relative group cursor-pointer">
            <div
              className="absolute -inset-1 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse-glow"
              style={{ backgroundColor: theme.cardGlowColor || theme.accentColor }}
            />
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl bg-black">
              <img
                src={
                  profile.avatarUrl ||
                  "https://api.dicebear.com/7.x/bottts/svg?seed=" + profile.username
                }
                alt={profile.displayName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Online Indicator Badge */}
            <div
              className="absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-black bg-emerald-500 flex items-center justify-center shadow-lg"
              title="Online"
            >
              <div className="w-2 h-2 rounded-full bg-white animate-ping opacity-60" />
            </div>
          </div>

          {/* Display Name & Username */}
          <div className="flex flex-col items-center text-center mt-4">
            <h1
              className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-md flex items-center space-x-1.5"
              style={{ color: theme.textColor || "#ffffff" }}
            >
              <span>{profile.displayName || profile.username}</span>
            </h1>
            <span className="text-xs text-zinc-400 font-mono tracking-wide mt-0.5">
              @{profile.username}
            </span>
          </div>

          {/* Badges List */}
          <BadgeList verified={profile.verified} badges={profile.badges || []} />

          {/* Bio (Standard or Typewriter) */}
          <div className="mt-3.5 w-full">
            <TypewriterBio
              text={profile.bio || "Welcome to my Facely bio profile."}
              enabled={effects.typewriterBio}
              accentColor={theme.accentColor}
            />
          </div>

          {/* Discord & Spotify Live Presence */}
          {profile.discordId && (
            <DiscordPresence
              discordId={profile.discordId}
              accentColor={theme.accentColor}
            />
          )}

          {/* Social Links List */}
          <SocialLinksList
            links={profile.socialLinks || []}
            accentColor={theme.accentColor}
            onLinkClick={onLinkClick}
          />

          {/* Profile View Counter Footer */}
          <div className="flex items-center justify-center space-x-4 mt-6 pt-4 border-t border-white/10 w-full text-[11px] text-zinc-400 font-mono">
            <div className="flex items-center space-x-1.5">
              <Eye className="w-3.5 h-3.5 text-zinc-500" />
              <span>{formatNumber(profile.viewsCount)} views</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-zinc-600" />
            <div className="flex items-center space-x-1.5">
              <Users className="w-3.5 h-3.5 text-zinc-500" />
              <span>{formatNumber(profile.uniqueVisitorsCount)} unique</span>
            </div>
          </div>

          {/* Facely Branding Badge */}
          <div className="mt-3">
            <a
              href="/"
              target={isInteractivePreview ? "_blank" : undefined}
              className="inline-flex items-center space-x-1 text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors uppercase tracking-widest font-mono"
            >
              <Sparkles className="w-2.5 h-2.5" style={{ color: theme.accentColor }} />
              <span>facely.me</span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
