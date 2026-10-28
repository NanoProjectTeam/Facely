"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Zap,
  Music,
  Tv,
  ArrowRight,
  ShieldCheck,
  Github,
  CheckCircle2,
  Sliders,
  ExternalLink,
  Flame,
  Radio,
  Eye,
} from "lucide-react";
import confetti from "canvas-confetti";
import { DEFAULT_PROFILES } from "@/lib/storage";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { BackgroundEffects } from "@/components/profile/BackgroundEffects";

export default function HomePage() {
  const router = useRouter();
  const [claimUsername, setClaimUsername] = useState("");
  const [selectedDemo, setSelectedDemo] = useState<string>("demo");

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = claimUsername.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
    if (!clean) return;

    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (e) {}

    setTimeout(() => {
      router.push(`/dashboard?claim=${clean}`);
    }, 400);
  };

  const currentProfile = DEFAULT_PROFILES[selectedDemo] || DEFAULT_PROFILES.demo;

  return (
    <div className="min-h-screen flex flex-col bg-[#070709] text-white selection:bg-purple-500/30 overflow-x-hidden">
      {/* 1. Header Navigation */}
      <header className="h-16 px-4 sm:px-8 border-b border-white/10 flex items-center justify-between bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-600/30">
            <Sparkles className="w-4 h-4 fill-white" />
          </div>
          <span className="font-bold tracking-tight text-lg">FACELY</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm text-zinc-400">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#showcase" className="hover:text-white transition-colors">
            Live Showcase
          </a>
          <a href="#open-source" className="hover:text-white transition-colors">
            Open Source
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </nav>

        <div className="flex items-center space-x-3">
          <a
            href="/login"
            className="text-xs sm:text-sm font-medium text-zinc-300 hover:text-white transition-colors px-3 py-1.5"
          >
            Sign In
          </a>
          <a
            href="/dashboard"
            className="text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-lg shadow-purple-600/30 active:scale-95"
          >
            Open Studio
          </a>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-20 pb-28 px-4 sm:px-8 max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Glow behind hero */}
        <div className="absolute top-1/4 w-[400px] h-[300px] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none" />

        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-medium mb-6 backdrop-blur-md">
          <Flame className="w-3.5 h-3.5 text-purple-400" />
          <span>The 100% Free, Open-Source guns.lol Alternative</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1] mb-6">
          Your personal bio-link, <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            elevated to aesthetic art.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mb-10 leading-relaxed">
          Craft glassmorphic profile cards with audio autoplay, live Discord & Spotify presence via Lanyard, falling particles, CRT scanlines, and 3D tilt. Free forever on Vercel.
        </p>

        {/* Claim Handle Input Form */}
        <form
          onSubmit={handleClaim}
          className="w-full max-w-md flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl focus-within:border-purple-500 transition-colors"
        >
          <div className="flex items-center pl-4 pr-2 py-2 w-full font-mono text-sm">
            <span className="text-zinc-500 select-none">facely.me/</span>
            <input
              type="text"
              value={claimUsername}
              onChange={(e) => setClaimUsername(e.target.value)}
              placeholder="yourname"
              className="bg-transparent border-none outline-none text-white w-full placeholder:text-zinc-600"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs whitespace-nowrap transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center space-x-1.5 shrink-0"
          >
            <span>Claim Bio-Link</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="flex items-center space-x-6 text-xs text-zinc-500 mt-6">
          <span className="flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
            <span>No subscription fees</span>
          </span>
          <span className="flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Zero-cost Vercel deployment</span>
          </span>
          <span className="flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
            <span>PostgreSQL & RLS</span>
          </span>
        </div>
      </section>

      {/* 3. Interactive Live Showcase */}
      <section id="showcase" className="py-20 border-t border-white/10 bg-black/40 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col items-center">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
              Explore Live Aesthetic Presets
            </h2>
            <p className="text-sm text-zinc-400">
              Switch themes and preview the actual rendered profile cards
            </p>

            {/* Showcase Theme Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {[
                { id: "demo", label: "Midnight Cyber (K4I)", color: "#a855f7" },
                { id: "guns", label: "Crimson Hacker (phantom)", color: "#ef4444" },
                { id: "aesthetic", label: "Sakura Dream (sakura)", color: "#f472b6" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedDemo(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    selectedDemo === item.id
                      ? "border-purple-500 bg-purple-500/20 text-white shadow-lg shadow-purple-500/20"
                      : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20"
                  }`}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Card Container */}
          <div className="relative w-full max-w-xl min-h-[560px] rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center p-4 sm:p-8 bg-zinc-950/60 shadow-2xl">
            <BackgroundEffects
              theme={currentProfile.theme}
              effects={currentProfile.effects}
            />

            <div className="relative z-20 w-full flex items-center justify-center">
              <ProfileCard profile={currentProfile} isInteractivePreview={true} />
            </div>

            <div className="absolute top-4 right-4 z-30">
              <a
                href={`/${currentProfile.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 text-xs px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-zinc-300 hover:text-white transition-colors backdrop-blur-md"
              >
                <span>Live View</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Feature Matrix */}
      <section id="features" className="py-24 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold">
            BUILT FOR CREATORS & GAMERS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
            Every guns.lol feature, unlocked with zero limits.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-purple-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Radio className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold">Lanyard Discord & Spotify Sync</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Show your real-time Discord presence (Online, Idle, DND), custom status messages, and live "Listening to Spotify" tracker with album artwork and dynamic song scrubber.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-purple-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
              <Music className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold">Autoplay Music & Audio Bar</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Play custom background tracks triggered smoothly after visitors click the splash screen. Includes floating player widget and real-time spectrum audio visualizer bars.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-purple-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Tv className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold">Atmospheric Visual FX</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Choose from falling snow, drifting sakura petals, fiery embers, or cyber rain. Add authentic CRT scanlines, 35mm film grain, corner vignettes, and 3D card tilt.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-purple-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold">Real-Time Studio</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Split-screen customizer with instant live preview. Switch between Mobile iPhone frame and Desktop mode. Customize colors, fonts, blur, and opacity with real-time feedback.
            </p>
          </div>

          {/* Card 5 */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-purple-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold">Edge Analytics & Click Tracker</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Unique visitor counting with 24-hour IP salt hashing. Track total views, unique visitors, link click-through conversions, and social platform breakdown.
            </p>
          </div>

          {/* Card 6 */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-purple-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold">Supabase PostgreSQL & RLS</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Battle-tested database schema with Row-Level Security policies. Complete self-hosting guide included for 100% free deployment on Vercel and Supabase.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="mt-auto border-t border-white/10 py-10 px-4 sm:px-8 bg-black/60 text-xs text-zinc-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="font-bold text-white tracking-wider">FACELY</span>
            <span>— Free Open-Source guns.lol Alternative</span>
          </div>

          <div className="flex items-center space-x-6">
            <a href="/dashboard" className="hover:text-white transition-colors">
              Studio
            </a>
            <a href="/demo" className="hover:text-white transition-colors">
              Demo Profile
            </a>
            <a href="/login" className="hover:text-white transition-colors">
              Sign In
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center space-x-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
