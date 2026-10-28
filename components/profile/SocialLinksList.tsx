"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Twitter,
  Instagram,
  Youtube,
  Twitch,
  Send, // for Telegram
  Music,
  Gamepad2, // for Steam
  Globe,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { SocialLink } from "@/lib/types";

// Custom Discord SVG Icon
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

// Custom Spotify SVG
const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.508 17.302c-.216.353-.674.468-1.027.252-2.812-1.718-6.353-2.107-10.52-1.155-.403.092-.806-.157-.898-.56-.092-.403.157-.806.56-.898 4.562-1.042 8.487-.6 11.633 1.334.353.216.468.674.252 1.027zm1.47-3.262c-.272.441-.849.584-1.29.312-3.22-1.979-8.129-2.55-11.936-1.393-.497.151-1.027-.134-1.178-.631-.151-.497.134-1.027.631-1.178 4.356-1.322 9.775-.688 13.46 1.579.442.272.584.85.313 1.291zm.126-3.41c-3.86-2.292-10.226-2.503-13.914-1.383-.591.179-1.219-.158-1.398-.749-.179-.591.158-1.219.749-1.398 4.243-1.288 11.272-1.042 15.698 1.586.531.315.706 1.004.391 1.535-.315.531-1.004.706-1.526.409z" />
  </svg>
);

interface SocialLinksListProps {
  links: SocialLink[];
  accentColor?: string;
  onLinkClick?: (linkId: string) => void;
}

export const SocialLinksList: React.FC<SocialLinksListProps> = ({
  links,
  accentColor = "#a855f7",
  onLinkClick,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "discord":
        return <DiscordIcon className="w-4 h-4 text-[#5865F2]" />;
      case "github":
        return <Github className="w-4 h-4 text-white" />;
      case "spotify":
        return <SpotifyIcon className="w-4 h-4 text-[#1DB954]" />;
      case "twitter":
      case "x":
        return <Twitter className="w-4 h-4 text-[#1DA1F2]" />;
      case "steam":
        return <Gamepad2 className="w-4 h-4 text-[#66c0f4]" />;
      case "telegram":
        return <Send className="w-4 h-4 text-[#229ED9]" />;
      case "instagram":
        return <Instagram className="w-4 h-4 text-[#E1306C]" />;
      case "youtube":
        return <Youtube className="w-4 h-4 text-[#FF0000]" />;
      case "twitch":
        return <Twitch className="w-4 h-4 text-[#9146FF]" />;
      case "tiktok":
        return <Music className="w-4 h-4 text-[#00f2fe]" />;
      default:
        return <Globe className="w-4 h-4 text-zinc-300" />;
    }
  };

  const handleClick = (link: SocialLink, e: React.MouseEvent) => {
    if (link.copyOnClick) {
      e.preventDefault();
      navigator.clipboard.writeText(link.url);
      setCopiedId(link.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
    if (onLinkClick) {
      onLinkClick(link.id);
    }
  };

  if (!links || links.length === 0) return null;

  return (
    <div className="w-full flex flex-col space-y-2 mt-4">
      {links.map((link, index) => {
        const isCopied = copiedId === link.id;

        return (
          <motion.a
            key={link.id || index}
            href={link.copyOnClick ? "#" : link.url}
            target={link.copyOnClick ? undefined : "_blank"}
            rel={link.copyOnClick ? undefined : "noopener noreferrer"}
            onClick={(e) => handleClick(link, e)}
            whileHover={{ scale: 1.015, y: -2 }}
            whileTap={{ scale: 0.985 }}
            className="group relative flex items-center justify-between px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-300 shadow-sm"
            style={{
              borderColor: "rgba(255, 255, 255, 0.12)",
            }}
          >
            {/* Subtle glow highlight on hover */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                boxShadow: `inset 0 0 20px -4px ${accentColor}30, 0 4px 20px -2px ${accentColor}20`,
              }}
            />

            <div className="flex items-center space-x-3 z-10 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-white/20 transition-colors">
                {getPlatformIcon(link.platform)}
              </div>
              <div className="flex flex-col min-w-0 text-left">
                <span className="text-xs font-semibold text-white truncate group-hover:text-white transition-colors">
                  {link.title}
                </span>
                <span className="text-[10px] text-zinc-400 truncate max-w-[190px] sm:max-w-[240px]">
                  {link.url.replace(/^https?:\/\//, "")}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 z-10 text-zinc-400 group-hover:text-white transition-colors shrink-0">
              {link.copyOnClick ? (
                isCopied ? (
                  <span className="flex items-center space-x-1 text-[11px] text-emerald-400 font-mono">
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </span>
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )
              ) : (
                <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
              )}
            </div>
          </motion.a>
        );
      })}
    </div>
  );
};
