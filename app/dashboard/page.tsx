"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  User,
  Palette,
  Music,
  Sparkles,
  BarChart3,
  Save,
  Check,
  Share2,
  ExternalLink,
  ChevronDown,
  Layers,
  Sparkle,
} from "lucide-react";
import confetti from "canvas-confetti";
import { Profile } from "@/lib/types";
import { DEFAULT_PROFILES, getProfileByUsername, saveProfile } from "@/lib/storage";
import { ProfileTab } from "@/components/studio/tabs/ProfileTab";
import { AppearanceTab } from "@/components/studio/tabs/AppearanceTab";
import { AudioTab } from "@/components/studio/tabs/AudioTab";
import { EffectsTab } from "@/components/studio/tabs/EffectsTab";
import { AnalyticsTab } from "@/components/studio/tabs/AnalyticsTab";
import { LivePreviewPane } from "@/components/studio/LivePreviewPane";

type ActiveTab = "profile" | "appearance" | "audio" | "effects" | "analytics";

function DashboardContent() {
  const searchParams = useSearchParams();
  const claimParam = searchParams.get("claim");

  const [activeTab, setActiveTab] = useState<ActiveTab>("profile");
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILES.demo);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [mobileView, setMobileView] = useState<"controls" | "preview">("controls");

  // Load profile on start
  useEffect(() => {
    async function load() {
      if (claimParam) {
        // User wants to claim this username
        setProfile({
          ...DEFAULT_PROFILES.demo,
          id: "claimed_" + claimParam,
          username: claimParam.toLowerCase(),
          displayName: claimParam,
          bio: `Hey, I am ${claimParam} on Facely!`,
          viewsCount: 1,
          uniqueVisitorsCount: 1,
        });
        return;
      }

      // Check localStorage for active profile
      try {
        const saved = localStorage.getItem("facely_active_profile");
        if (saved) {
          setProfile(JSON.parse(saved));
          return;
        }
      } catch (e) {}

      // Fallback to demo profile
      const demo = await getProfileByUsername("demo");
      if (demo) setProfile(demo);
    }

    load();
  }, [claimParam]);

  const handleProfileChange = (updated: Partial<Profile>) => {
    setProfile((prev) => ({
      ...prev,
      ...updated,
    }));
    setSaveSuccess(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const saved = await saveProfile(profile);
      setProfile(saved);
      setIsSaving(false);
      setSaveSuccess(true);

      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.1, x: 0.9 },
      });

      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Save error:", err);
      setIsSaving(false);
    }
  };

  const handleLoadTemplate = async (templateKey: string) => {
    const t = DEFAULT_PROFILES[templateKey];
    if (t) {
      setProfile({
        ...t,
        username: profile.username || t.username, // keep current username
      });
      setSaveSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070709] text-white">
      {/* Studio Header */}
      <header className="h-16 px-4 sm:px-6 border-b border-white/10 flex items-center justify-between bg-black/60 backdrop-blur-xl shrink-0 z-30">
        <div className="flex items-center space-x-4">
          <a href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform">
              <Sparkle className="w-4 h-4 fill-white" />
            </div>
            <span className="font-bold tracking-tight text-lg hidden sm:inline">
              FACELY <span className="text-xs font-mono text-purple-400 font-normal ml-1">STUDIO</span>
            </span>
          </a>

          {/* Preset Template Switcher */}
          <div className="hidden md:flex items-center space-x-1.5 pl-4 border-l border-white/10">
            <span className="text-xs text-zinc-500 mr-1">Load Preset:</span>
            {["demo", "guns", "aesthetic"].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handleLoadTemplate(preset)}
                className="text-xs px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 capitalize transition-colors"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Toggle: Controls vs Preview */}
        <div className="flex lg:hidden items-center p-1 rounded-lg bg-white/5 border border-white/10">
          <button
            onClick={() => setMobileView("controls")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              mobileView === "controls" ? "bg-purple-600 text-white" : "text-zinc-400"
            }`}
          >
            Editor
          </button>
          <button
            onClick={() => setMobileView("preview")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              mobileView === "preview" ? "bg-purple-600 text-white" : "text-zinc-400"
            }`}
          >
            Live Preview
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <a
            href={`/${profile.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center space-x-1.5 text-xs text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 transition-colors"
          >
            <span>Visit @{profile.username}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold shadow-lg transition-all transform active:scale-95 ${
              saveSuccess
                ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30"
                : "bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30"
            }`}
          >
            {saveSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Saved Live!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isSaving ? "Saving..." : "Save Changes"}</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Studio Body: Left Controls + Right Live Preview */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane: Customization Controls */}
        <div
          className={`w-full lg:w-[500px] xl:w-[560px] flex flex-col border-r border-white/10 bg-[#070709] ${
            mobileView === "preview" ? "hidden lg:flex" : "flex"
          }`}
        >
          {/* Tabs Navigation */}
          <div className="px-4 py-2 border-b border-white/10 flex items-center space-x-2 overflow-x-auto scrollbar-none bg-black/40">
            {[
              { id: "profile", label: "Profile", icon: User },
              { id: "appearance", label: "Appearance", icon: Palette },
              { id: "audio", label: "Audio", icon: Music },
              { id: "effects", label: "Effects", icon: Sparkles },
              { id: "analytics", label: "Analytics", icon: BarChart3 },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ActiveTab)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                      : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Content Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24">
            {activeTab === "profile" && (
              <ProfileTab profile={profile} onChange={handleProfileChange} />
            )}
            {activeTab === "appearance" && (
              <AppearanceTab profile={profile} onChange={handleProfileChange} />
            )}
            {activeTab === "audio" && (
              <AudioTab profile={profile} onChange={handleProfileChange} />
            )}
            {activeTab === "effects" && (
              <EffectsTab profile={profile} onChange={handleProfileChange} />
            )}
            {activeTab === "analytics" && <AnalyticsTab profile={profile} />}
          </div>
        </div>

        {/* Right Pane: Real-time Live Preview */}
        <div
          className={`flex-1 ${
            mobileView === "controls" ? "hidden lg:flex" : "flex"
          }`}
        >
          <LivePreviewPane profile={profile} />
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#070709] text-white">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
            <span className="text-xs font-mono text-zinc-400">Loading Facely Studio...</span>
          </div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
