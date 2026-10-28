"use client";

import React, { useState } from "react";
import {
  Smartphone,
  Monitor,
  ExternalLink,
  Copy,
  Check,
  RotateCcw,
  Volume2,
  VolumeX,
} from "lucide-react";
import confetti from "canvas-confetti";
import { Profile } from "@/lib/types";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { BackgroundEffects } from "@/components/profile/BackgroundEffects";
import { AudioPlayerWidget } from "@/components/profile/AudioPlayerWidget";

interface LivePreviewPaneProps {
  profile: Profile;
}

export const LivePreviewPane: React.FC<LivePreviewPaneProps> = ({ profile }) => {
  const [deviceMode, setDeviceMode] = useState<"mobile" | "desktop">("mobile");
  const [copied, setCopied] = useState(false);
  const [testAudio, setTestAudio] = useState(false);

  const handleCopyLink = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://facely.me";
    const fullUrl = `${origin}/${profile.username}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch (e) {}

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-[#050507] border-l border-white/10 relative overflow-hidden">
      {/* Top Bar for Live Preview */}
      <div className="h-14 px-4 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md z-20 shrink-0">
        <div className="flex items-center space-x-2">
          <div className="flex items-center p-1 rounded-lg bg-white/5 border border-white/10">
            <button
              type="button"
              onClick={() => setDeviceMode("mobile")}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                deviceMode === "mobile"
                  ? "bg-purple-600 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
            <button
              type="button"
              onClick={() => setDeviceMode("desktop")}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                deviceMode === "desktop"
                  ? "bg-purple-600 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {profile.audio?.enabled && (
            <button
              type="button"
              onClick={() => setTestAudio(!testAudio)}
              title="Test Audio Playback in Preview"
              className={`p-2 rounded-lg border text-xs flex items-center space-x-1 transition-all ${
                testAudio
                  ? "border-purple-500 bg-purple-500/20 text-purple-400"
                  : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"
              }`}
            >
              {testAudio ? (
                <Volume2 className="w-3.5 h-3.5" />
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
            </button>
          )}

          <button
            type="button"
            onClick={handleCopyLink}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-mono">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
                <span>Copy URL</span>
              </>
            )}
          </button>

          <a
            href={`/${profile.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg border border-white/10 bg-purple-600 hover:bg-purple-500 text-white transition-colors"
            title="Open Live Profile Page"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Preview Canvas */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-4 sm:p-8 relative bg-[radial-gradient(#1e1e24_1px,transparent_1px)] [background-size:16px_16px]">
        {deviceMode === "mobile" ? (
          /* Mobile Mockup Device Frame */
          <div className="relative w-[340px] sm:w-[375px] h-[680px] rounded-[48px] border-[10px] border-zinc-800 shadow-[0_0_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden flex flex-col bg-black">
            {/* Dynamic Island / Speaker Notch */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-center border border-white/10">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800 ml-auto mr-3" />
            </div>

            {/* Simulated Mobile Viewport */}
            <div className="relative w-full h-full overflow-y-auto overflow-x-hidden">
              <BackgroundEffects theme={profile.theme} effects={profile.effects} />

              <div className="relative z-20 w-full min-h-full flex items-center justify-center pt-8 pb-16">
                <ProfileCard profile={profile} isInteractivePreview={true} />
              </div>

              {profile.audio?.enabled && (
                <AudioPlayerWidget
                  audio={profile.audio}
                  accentColor={profile.theme.accentColor}
                  autoPlayTrigger={testAudio}
                />
              )}
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full z-40 pointer-events-none" />
          </div>
        ) : (
          /* Desktop Browser Frame */
          <div className="relative w-full max-w-4xl h-[680px] rounded-2xl border border-white/15 shadow-2xl overflow-hidden flex flex-col bg-black">
            {/* Browser Top Window Bar */}
            <div className="h-9 px-4 bg-zinc-900/90 border-b border-white/10 flex items-center space-x-2 shrink-0 z-30">
              <div className="flex items-center space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex-1 max-w-sm mx-auto h-6 rounded-md bg-black/50 border border-white/10 px-3 flex items-center text-[11px] font-mono text-zinc-400 truncate">
                <span>https://facely.me/{profile.username}</span>
              </div>
            </div>

            {/* Browser Content */}
            <div className="relative flex-1 overflow-y-auto overflow-x-hidden">
              <BackgroundEffects theme={profile.theme} effects={profile.effects} />

              <div className="relative z-20 w-full min-h-full flex items-center justify-center py-10">
                <ProfileCard profile={profile} isInteractivePreview={true} />
              </div>

              {profile.audio?.enabled && (
                <AudioPlayerWidget
                  audio={profile.audio}
                  accentColor={profile.theme.accentColor}
                  autoPlayTrigger={testAudio}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
