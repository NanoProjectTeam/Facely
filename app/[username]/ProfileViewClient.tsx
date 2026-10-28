"use client";

import React, { useState, useEffect } from "react";
import { Profile } from "@/lib/types";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { BackgroundEffects } from "@/components/profile/BackgroundEffects";
import { ClickToEnterOverlay } from "@/components/profile/ClickToEnterOverlay";
import { AudioPlayerWidget } from "@/components/profile/AudioPlayerWidget";
import { CustomCursor } from "@/components/profile/CustomCursor";

interface ProfileViewClientProps {
  initialProfile: Profile;
}

export const ProfileViewClient: React.FC<ProfileViewClientProps> = ({
  initialProfile,
}) => {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [hasEntered, setHasEntered] = useState<boolean>(!initialProfile.overlay?.enabled);
  const [autoPlayAudio, setAutoPlayAudio] = useState<boolean>(false);

  // Record profile view on mount
  useEffect(() => {
    fetch("/api/analytics/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: profile.username,
        referrer: typeof document !== "undefined" ? document.referrer : "",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.views_count) {
          setProfile((prev) => ({
            ...prev,
            viewsCount: data.views_count,
            uniqueVisitorsCount: data.unique_visitors_count || prev.uniqueVisitorsCount,
          }));
        }
      })
      .catch((err) => console.warn("Analytics recording notice:", err));
  }, [profile.username]);

  const handleEnter = () => {
    setHasEntered(true);
    if (profile.audio?.enabled && profile.audio?.autoplayOnEnter) {
      setAutoPlayAudio(true);
    }
  };

  const handleLinkClick = (linkId: string) => {
    fetch("/api/analytics/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: profile.username,
        linkId,
      }),
    }).catch(() => {});
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-x-hidden selection:bg-purple-500/30">
      {/* 1. Custom Cursor */}
      <CustomCursor
        cursorType={profile.effects.cursor}
        accentColor={profile.theme.accentColor}
      />

      {/* 2. Click to enter aesthetic intro overlay */}
      {profile.overlay?.enabled && !hasEntered && (
        <ClickToEnterOverlay
          enterText={profile.overlay.enterText}
          subtext={profile.overlay.subtext}
          accentColor={profile.theme.accentColor}
          onEnter={handleEnter}
        />
      )}

      {/* 3. Fullscreen Backgrounds, Overlays & Particles */}
      <BackgroundEffects theme={profile.theme} effects={profile.effects} />

      {/* 4. Centerpiece Profile Card */}
      <div className="relative z-20 w-full flex items-center justify-center min-h-screen py-12 px-4">
        <ProfileCard profile={profile} onLinkClick={handleLinkClick} />
      </div>

      {/* 5. Floating Audio Player Widget */}
      {profile.audio?.enabled && (
        <AudioPlayerWidget
          audio={profile.audio}
          accentColor={profile.theme.accentColor}
          autoPlayTrigger={autoPlayAudio}
        />
      )}
    </main>
  );
};
