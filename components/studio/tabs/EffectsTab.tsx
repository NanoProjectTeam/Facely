"use client";

import React from "react";
import { Sparkles, Terminal, Tv, Wand2, Eye } from "lucide-react";
import { Profile, ProfileEffects, ProfileOverlay, ParticleEffect, CursorType } from "@/lib/types";

interface EffectsTabProps {
  profile: Profile;
  onChange: (updated: Partial<Profile>) => void;
}

export const EffectsTab: React.FC<EffectsTabProps> = ({ profile, onChange }) => {
  const effects = profile.effects;
  const overlay = profile.overlay;

  const updateEffects = (fields: Partial<ProfileEffects>) => {
    onChange({
      effects: {
        ...effects,
        ...fields,
      },
    });
  };

  const updateOverlay = (fields: Partial<ProfileOverlay>) => {
    onChange({
      overlay: {
        ...overlay,
        ...fields,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Click to Enter Overlay */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Click to Enter Overlay</h3>
              <p className="text-xs text-zinc-400">
                Aesthetic splash screen that prompts visitors to tap and unlocks audio
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={overlay.enabled}
              onChange={(e) => updateOverlay({ enabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>

        {overlay.enabled && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                Main Banner Text
              </label>
              <input
                type="text"
                value={overlay.enterText}
                onChange={(e) => updateOverlay({ enterText: e.target.value })}
                className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-xs text-white font-mono outline-none focus:border-purple-500"
                placeholder="[ click to enter ]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                Subtext Instructions
              </label>
              <input
                type="text"
                value={overlay.subtext || ""}
                onChange={(e) => updateOverlay({ subtext: e.target.value })}
                className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-xs text-white outline-none focus:border-purple-500"
                placeholder="tap anywhere to explore"
              />
            </div>
          </div>
        )}
      </div>

      {/* 2. Particles & Atmosphere */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center space-x-2">
          <span>Background Particles</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {[
            { id: "none", label: "None (Off)" },
            { id: "snow", label: "Snow Drifts" },
            { id: "sakura", label: "Sakura Petals 🌸" },
            { id: "embers", label: "Fiery Embers 🔥" },
            { id: "sparkles", label: "Magic Sparkles ✨" },
            { id: "rain", label: "Cyber Rain 🌧️" },
          ].map((item) => {
            const isSelected = effects.particles === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => updateEffects({ particles: item.id as ParticleEffect })}
                className={`p-2.5 rounded-lg border text-xs font-medium transition-all text-center ${
                  isSelected
                    ? "border-purple-500 bg-purple-500/20 text-purple-300 font-semibold shadow-md shadow-purple-500/20"
                    : "border-white/10 bg-black/30 text-zinc-400 hover:border-white/20"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Screen Overlays & Visual Filters */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
          Visual FX & Filters
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="flex items-center space-x-2.5 p-3 rounded-lg bg-black/30 border border-white/10 cursor-pointer hover:bg-black/40 transition-colors">
            <input
              type="checkbox"
              checked={effects.crtScanlines}
              onChange={(e) => updateEffects({ crtScanlines: e.target.checked })}
              className="rounded border-zinc-700 text-purple-600 focus:ring-purple-500"
            />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-white flex items-center space-x-1.5">
                <Tv className="w-3.5 h-3.5 text-purple-400" />
                <span>CRT Retro Scanlines</span>
              </span>
              <span className="text-[10px] text-zinc-400">
                Vintage arcade cathode-ray tube line overlay
              </span>
            </div>
          </label>

          <label className="flex items-center space-x-2.5 p-3 rounded-lg bg-black/30 border border-white/10 cursor-pointer hover:bg-black/40 transition-colors">
            <input
              type="checkbox"
              checked={effects.filmGrain}
              onChange={(e) => updateEffects({ filmGrain: e.target.checked })}
              className="rounded border-zinc-700 text-purple-600 focus:ring-purple-500"
            />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-white flex items-center space-x-1.5">
                <Wand2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Film Grain Noise</span>
              </span>
              <span className="text-[10px] text-zinc-400">
                Subtle textured analog film grain
              </span>
            </div>
          </label>

          <label className="flex items-center space-x-2.5 p-3 rounded-lg bg-black/30 border border-white/10 cursor-pointer hover:bg-black/40 transition-colors">
            <input
              type="checkbox"
              checked={effects.vignette}
              onChange={(e) => updateEffects({ vignette: e.target.checked })}
              className="rounded border-zinc-700 text-purple-600 focus:ring-purple-500"
            />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-white">Vignette Shading</span>
              <span className="text-[10px] text-zinc-400">
                Smooth radial dark shadow along viewport corners
              </span>
            </div>
          </label>

          <label className="flex items-center space-x-2.5 p-3 rounded-lg bg-black/30 border border-white/10 cursor-pointer hover:bg-black/40 transition-colors">
            <input
              type="checkbox"
              checked={effects.cardTilt}
              onChange={(e) => updateEffects({ cardTilt: e.target.checked })}
              className="rounded border-zinc-700 text-purple-600 focus:ring-purple-500"
            />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-white">3D Card Tilt Effect</span>
              <span className="text-[10px] text-zinc-400">
                Card tilts smoothly towards the cursor on hover
              </span>
            </div>
          </label>

          <label className="flex items-center space-x-2.5 p-3 rounded-lg bg-black/30 border border-white/10 cursor-pointer hover:bg-black/40 transition-colors">
            <input
              type="checkbox"
              checked={effects.typewriterBio}
              onChange={(e) => updateEffects({ typewriterBio: e.target.checked })}
              className="rounded border-zinc-700 text-purple-600 focus:ring-purple-500"
            />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-white flex items-center space-x-1.5">
                <Terminal className="w-3.5 h-3.5 text-purple-400" />
                <span>Typewriter Bio Animation</span>
              </span>
              <span className="text-[10px] text-zinc-400">
                Animates bio text character by character
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* 4. Custom Mouse Cursor */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
          Custom Cursor Style
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { id: "default", label: "Default Browser" },
            { id: "crosshair", label: "FPS Crosshair ✚" },
            { id: "dot", label: "Minimal Dot •" },
            { id: "glow-orb", label: "Glowing Orb ✧" },
          ].map((item) => {
            const isSelected = effects.cursor === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => updateEffects({ cursor: item.id as CursorType })}
                className={`p-2.5 rounded-lg border text-xs font-medium transition-all text-center ${
                  isSelected
                    ? "border-purple-500 bg-purple-500/20 text-purple-300 font-semibold shadow-md shadow-purple-500/20"
                    : "border-white/10 bg-black/30 text-zinc-400 hover:border-white/20"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
