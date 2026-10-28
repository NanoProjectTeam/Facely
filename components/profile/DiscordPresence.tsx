"use client";

import React, { useEffect, useState } from "react";
import { Music, Radio, Disc, ExternalLink } from "lucide-react";
import { useLanyard } from "@/lib/lanyard";

interface DiscordPresenceProps {
  discordId?: string;
  accentColor?: string;
}

export const DiscordPresence: React.FC<DiscordPresenceProps> = ({
  discordId,
  accentColor = "#a855f7",
}) => {
  const { data: lanyard, loading } = useLanyard(discordId);
  const [spotifyProgress, setSpotifyProgress] = useState<number>(0);

  // Live timer for Spotify progress
  useEffect(() => {
    if (!lanyard?.spotify) return;

    const interval = setInterval(() => {
      const start = lanyard.spotify?.timestamps.start || 0;
      const end = lanyard.spotify?.timestamps.end || 0;
      const now = Date.now();
      const total = end - start;
      const elapsed = now - start;

      if (total > 0) {
        setSpotifyProgress(Math.min(100, Math.max(0, (elapsed / total) * 100)));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lanyard?.spotify]);

  if (!discordId) return null;

  const statusColors: Record<string, { bg: string; ring: string; label: string }> = {
    online: { bg: "bg-emerald-500", ring: "ring-emerald-500/30", label: "Online" },
    idle: { bg: "bg-amber-500", ring: "ring-amber-500/30", label: "Idle" },
    dnd: { bg: "bg-rose-500", ring: "ring-rose-500/30", label: "Do Not Disturb" },
    offline: { bg: "bg-zinc-500", ring: "ring-zinc-500/30", label: "Offline" },
  };

  const status = lanyard?.discord_status || "offline";
  const currentStatus = statusColors[status] || statusColors.offline;

  // Custom status or game activity
  const gameActivity = lanyard?.activities?.find((a) => a.type === 0);
  const customStatus = lanyard?.activities?.find((a) => a.type === 4);

  return (
    <div className="w-full flex flex-col space-y-2.5 mt-3">
      {/* 1. Discord Live Status Pill */}
      <div className="flex items-center justify-between text-xs px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <div className="relative flex items-center justify-center">
            <span
              className={`w-2.5 h-2.5 rounded-full ${currentStatus.bg} ring-4 ${currentStatus.ring}`}
            />
            {status === "online" && (
              <span className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
            )}
          </div>
          <span className="font-mono text-zinc-300">
            Discord: <span className="capitalize font-semibold text-white">{status}</span>
          </span>
        </div>

        {customStatus?.state && (
          <span className="text-zinc-400 truncate max-w-[140px] text-[11px] italic">
            "{customStatus.state}"
          </span>
        )}
      </div>

      {/* 2. Game or App Activity */}
      {gameActivity && (
        <div className="flex items-center space-x-2.5 text-xs px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300">
          <Radio className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="font-medium text-white truncate">
              Playing {gameActivity.name}
            </span>
            {gameActivity.details && (
              <span className="text-[11px] text-zinc-400 truncate">
                {gameActivity.details}
              </span>
            )}
          </div>
        </div>
      )}

      {/* 3. Spotify Listening Widget */}
      {lanyard?.listening_to_spotify && lanyard.spotify && (
        <div className="relative group overflow-hidden rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-2.5 backdrop-blur-md transition-all hover:border-emerald-500/40">
          <div className="flex items-center space-x-3">
            {/* Album Cover Art */}
            <div className="relative w-11 h-11 shrink-0 rounded-lg overflow-hidden border border-white/10 shadow-md">
              <img
                src={lanyard.spotify.album_art_url}
                alt={lanyard.spotify.album}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Disc className="w-5 h-5 text-emerald-400 animate-spin-slow" />
              </div>
            </div>

            {/* Song / Artist Details */}
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-[10px] text-emerald-400 font-mono tracking-wider uppercase font-semibold">
                  <Music className="w-3 h-3" />
                  <span>Listening to Spotify</span>
                </div>
                <a
                  href={`https://open.spotify.com/track/${lanyard.spotify.track_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-emerald-400 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <span className="text-xs font-semibold text-white truncate drop-shadow-sm mt-0.5">
                {lanyard.spotify.song}
              </span>
              <span className="text-[11px] text-zinc-400 truncate">
                {lanyard.spotify.artist}
              </span>

              {/* Progress bar */}
              <div className="w-full bg-white/10 h-1 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${spotifyProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
