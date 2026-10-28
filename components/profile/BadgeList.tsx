"use client";

import React, { useState } from "react";
import { BadgeCheck, Sparkles, Terminal, ShieldCheck, Crown, Heart, Zap, Star } from "lucide-react";
import { Badge } from "@/lib/types";

interface BadgeListProps {
  verified?: boolean;
  badges: Badge[];
}

export const BadgeList: React.FC<BadgeListProps> = ({ verified, badges }) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "badgecheck":
      case "verified":
        return <BadgeCheck className="w-3.5 h-3.5" />;
      case "sparkles":
        return <Sparkles className="w-3.5 h-3.5" />;
      case "terminal":
        return <Terminal className="w-3.5 h-3.5" />;
      case "shieldcheck":
      case "elite":
        return <ShieldCheck className="w-3.5 h-3.5" />;
      case "crown":
      case "vip":
        return <Crown className="w-3.5 h-3.5" />;
      case "heart":
        return <Heart className="w-3.5 h-3.5" />;
      case "zap":
        return <Zap className="w-3.5 h-3.5" />;
      default:
        return <Star className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="flex items-center flex-wrap justify-center gap-1.5 mt-2">
      {verified && (
        <div
          onMouseEnter={() => setActiveTooltip("verified")}
          onMouseLeave={() => setActiveTooltip(null)}
          className="relative group cursor-pointer flex items-center space-x-1 px-2 py-0.5 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-400 text-[11px] font-medium backdrop-blur-sm"
        >
          <BadgeCheck className="w-3.5 h-3.5 fill-sky-500/20 text-sky-400" />
          <span>Verified</span>

          {activeTooltip === "verified" && (
            <div className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-black/90 border border-white/10 text-white text-[10px] whitespace-nowrap z-50 shadow-xl pointer-events-none">
              Official Verified Identity
            </div>
          )}
        </div>
      )}

      {badges.map((badge) => (
        <div
          key={badge.id}
          onMouseEnter={() => setActiveTooltip(badge.id)}
          onMouseLeave={() => setActiveTooltip(null)}
          className="relative group cursor-pointer flex items-center space-x-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-[11px] font-medium backdrop-blur-sm hover:border-white/25 transition-all"
          style={{
            borderColor: badge.color ? `${badge.color}40` : undefined,
            color: badge.color || undefined,
          }}
        >
          <span style={{ color: badge.color || undefined }}>
            {getIcon(badge.icon)}
          </span>
          <span className="text-white/90">{badge.name}</span>

          {activeTooltip === badge.id && (
            <div className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-black/90 border border-white/10 text-white text-[10px] whitespace-nowrap z-50 shadow-xl pointer-events-none">
              {badge.description}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
