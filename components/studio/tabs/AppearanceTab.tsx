"use client";

import React from "react";
import { Profile, ProfileTheme, ThemePreset } from "@/lib/types";

interface AppearanceTabProps {
  profile: Profile;
  onChange: (updated: Partial<Profile>) => void;
}

const PRESET_THEMES: Record<
  ThemePreset,
  { name: string; accent: string; bg: string; type: any; cardGlow: string }
> = {
  "guns-dark": {
    name: "Guns Dark",
    accent: "#a855f7",
    bg: "#070709",
    type: "image",
    cardGlow: "#a855f7",
  },
  "cyberpunk": {
    name: "Cyberpunk Neon",
    accent: "#06b6d4",
    bg: "#080c14",
    type: "gradient",
    cardGlow: "#06b6d4",
  },
  "midnight-blue": {
    name: "Midnight Ocean",
    accent: "#3b82f6",
    bg: "#030712",
    type: "gradient",
    cardGlow: "#3b82f6",
  },
  "crimson-blood": {
    name: "Crimson Blood",
    accent: "#ef4444",
    bg: "#050505",
    type: "image",
    cardGlow: "#ef4444",
  },
  "emerald-abyss": {
    name: "Emerald Abyss",
    accent: "#10b981",
    bg: "#02120b",
    type: "gradient",
    cardGlow: "#10b981",
  },
  "vaporwave": {
    name: "Vaporwave Dream",
    accent: "#f472b6",
    bg: "#180a22",
    type: "image",
    cardGlow: "#f472b6",
  },
  "minimal-light": {
    name: "Minimalist Slate",
    accent: "#e2e8f0",
    bg: "#18181b",
    type: "color",
    cardGlow: "#71717a",
  },
  "custom": {
    name: "Custom Theme",
    accent: "#a855f7",
    bg: "#070709",
    type: "gradient",
    cardGlow: "#a855f7",
  },
};

const SAMPLE_BACKGROUNDS = [
  {
    name: "Cyber Street",
    url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=80",
  },
  {
    name: "Crimson Neon",
    url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80",
  },
  {
    name: "Sakura Blossom",
    url: "https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=1920&q=80",
  },
  {
    name: "Tokyo Night",
    url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1920&q=80",
  },
  {
    name: "Dark Nebula",
    url: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1920&q=80",
  },
];

export const AppearanceTab: React.FC<AppearanceTabProps> = ({
  profile,
  onChange,
}) => {
  const theme = profile.theme;

  const updateTheme = (fields: Partial<ProfileTheme>) => {
    onChange({
      theme: {
        ...theme,
        ...fields,
      },
    });
  };

  const applyPreset = (key: ThemePreset) => {
    const preset = PRESET_THEMES[key];
    updateTheme({
      preset: key,
      accentColor: preset.accent,
      cardGlowColor: preset.cardGlow,
      backgroundColor: preset.bg,
      backgroundType: preset.type,
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Theme Presets */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
          Theme Presets
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {Object.entries(PRESET_THEMES).map(([key, item]) => {
            if (key === "custom") return null;
            const isSelected = theme.preset === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => applyPreset(key as ThemePreset)}
                className={`p-2.5 rounded-lg border text-left flex flex-col justify-between transition-all ${
                  isSelected
                    ? "border-purple-500 bg-purple-500/15 shadow-md shadow-purple-500/20"
                    : "border-white/10 bg-black/30 hover:border-white/20"
                }`}
              >
                <div className="flex items-center space-x-1.5 mb-2">
                  <div
                    className="w-3.5 h-3.5 rounded-full border border-white/20"
                    style={{ backgroundColor: item.accent }}
                  />
                  <span className="text-xs font-semibold text-white truncate">
                    {item.name}
                  </span>
                </div>
                <div
                  className="w-full h-1.5 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${item.accent}, ${item.bg})`,
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Background Settings */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
          Background Configuration
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Background Type
            </label>
            <select
              value={theme.backgroundType}
              onChange={(e) => updateTheme({ backgroundType: e.target.value as any })}
              className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-xs text-white outline-none focus:border-purple-500"
            >
              <option value="gradient">Aesthetic Gradient</option>
              <option value="image">Image / Wallpaper</option>
              <option value="video">Direct Video Loop (.mp4)</option>
              <option value="color">Solid Deep Color</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Base Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={theme.backgroundColor}
                onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                className="w-9 h-9 rounded-lg border border-white/10 bg-transparent cursor-pointer p-0.5"
              />
              <input
                type="text"
                value={theme.backgroundColor}
                onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                className="flex-1 rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-xs text-white font-mono"
              />
            </div>
          </div>
        </div>

        {(theme.backgroundType === "image" || theme.backgroundType === "video") && (
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Media URL (Image or MP4 Video Loop)
            </label>
            <input
              type="text"
              value={theme.backgroundUrl}
              onChange={(e) => updateTheme({ backgroundUrl: e.target.value })}
              className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-xs text-white font-mono outline-none focus:border-purple-500"
              placeholder="https://... image or video URL"
            />

            {/* Quick picker presets */}
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-[10px] text-zinc-500 self-center">Presets:</span>
              {SAMPLE_BACKGROUNDS.map((bg) => (
                <button
                  key={bg.name}
                  type="button"
                  onClick={() =>
                    updateTheme({ backgroundUrl: bg.url, backgroundType: "image" })
                  }
                  className="text-[10px] px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10"
                >
                  {bg.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sliders for Darkness and Blur */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <div className="flex justify-between text-xs text-zinc-400 mb-1">
              <span>Darkness Overlay</span>
              <span className="font-mono">{theme.backgroundDarkness}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="95"
              value={theme.backgroundDarkness}
              onChange={(e) => updateTheme({ backgroundDarkness: Number(e.target.value) })}
              className="w-full accent-purple-500 h-1.5 bg-white/10 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-zinc-400 mb-1">
              <span>Background Blur</span>
              <span className="font-mono">{theme.backgroundBlur}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              value={theme.backgroundBlur}
              onChange={(e) => updateTheme({ backgroundBlur: Number(e.target.value) })}
              className="w-full accent-purple-500 h-1.5 bg-white/10 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 3. Profile Card Appearance */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
          Glassmorphism & Card Style
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Accent Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={theme.accentColor}
                onChange={(e) =>
                  updateTheme({
                    accentColor: e.target.value,
                    cardGlowColor: e.target.value,
                  })
                }
                className="w-9 h-9 rounded-lg border border-white/10 bg-transparent cursor-pointer p-0.5"
              />
              <input
                type="text"
                value={theme.accentColor}
                onChange={(e) => updateTheme({ accentColor: e.target.value })}
                className="flex-1 rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-xs text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Typography Font Family
            </label>
            <select
              value={theme.font}
              onChange={(e) => updateTheme({ font: e.target.value as any })}
              className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-xs text-white outline-none focus:border-purple-500"
            >
              <option value="aesthetic">Aesthetic Modern (Outfit)</option>
              <option value="mono">Cyber Monospace (JetBrains Mono)</option>
              <option value="serif">Editorial Serif (Playfair)</option>
              <option value="pixel">Retro 8-Bit Pixel</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <div className="flex justify-between text-xs text-zinc-400 mb-1">
              <span>Card Glass Opacity</span>
              <span className="font-mono">{theme.cardOpacity}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="95"
              value={theme.cardOpacity}
              onChange={(e) => updateTheme({ cardOpacity: Number(e.target.value) })}
              className="w-full accent-purple-500 h-1.5 bg-white/10 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-zinc-400 mb-1">
              <span>Card Backdrop Blur</span>
              <span className="font-mono">{theme.cardBlur}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="24"
              value={theme.cardBlur}
              onChange={(e) => updateTheme({ cardBlur: Number(e.target.value) })}
              className="w-full accent-purple-500 h-1.5 bg-white/10 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-zinc-400 mb-1">
              <span>Border Glow Intensity</span>
              <span className="font-mono">{theme.cardGlowIntensity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={theme.cardGlowIntensity}
              onChange={(e) => updateTheme({ cardGlowIntensity: Number(e.target.value) })}
              className="w-full accent-purple-500 h-1.5 bg-white/10 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
