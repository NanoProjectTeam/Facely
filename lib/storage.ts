import { Profile } from "./types";
import { supabase, isSupabaseConfigured } from "./supabase";

export const DEFAULT_PROFILES: Record<string, Profile> = {
  demo: {
    id: "demo-user-id",
    username: "demo",
    displayName: "K4I",
    bio: "Fullstack Architect & UI Virtuoso.\nBuilding high-frequency aesthetic web experiences.\nListening to late night synths.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    discordId: "1059084802879598683", // Public demo or user discord ID for Lanyard
    verified: true,
    badges: [
      { id: "b1", name: "Verified", icon: "BadgeCheck", description: "Official Verified Creator", color: "#38bdf8" },
      { id: "b2", name: "Early Supporter", icon: "Sparkles", description: "Founding Facely Pioneer", color: "#ec4899" },
      { id: "b3", name: "Code Wizard", icon: "Terminal", description: "Open Source Contributor", color: "#10b981" },
    ],
    socialLinks: [
      { id: "s1", platform: "discord", title: "Discord", url: "https://discord.gg/facely", copyOnClick: false, clicks: 342 },
      { id: "s2", platform: "github", title: "GitHub", url: "https://github.com", copyOnClick: false, clicks: 891 },
      { id: "s3", platform: "spotify", title: "Spotify", url: "https://spotify.com", copyOnClick: false, clicks: 215 },
      { id: "s4", platform: "x", title: "X (Twitter)", url: "https://x.com", copyOnClick: false, clicks: 529 },
      { id: "s5", platform: "steam", title: "Steam Profile", url: "https://steamcommunity.com", copyOnClick: false, clicks: 174 },
      { id: "s6", platform: "telegram", title: "Telegram", url: "https://t.me", copyOnClick: false, clicks: 120 },
    ],
    theme: {
      preset: "guns-dark",
      accentColor: "#a855f7",
      backgroundColor: "#070709",
      backgroundType: "image",
      backgroundUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=80",
      backgroundBlur: 3,
      backgroundDarkness: 55,
      cardOpacity: 45,
      cardBlur: 20,
      cardBorderColor: "rgba(168, 85, 247, 0.25)",
      cardGlowColor: "#a855f7",
      cardGlowIntensity: 65,
      cardBorderRadius: 24,
      font: "aesthetic",
      textColor: "#ffffff",
    },
    audio: {
      enabled: true,
      audioUrl: "https://assets.mixkit.co/music/preview/mixkit-chill-bro-494.mp3",
      title: "Midnight Tokyo City",
      artist: "Lo-Fi Beats Collective",
      autoplayOnEnter: true,
      loop: true,
      volume: 60,
      floatingPlayer: true,
      showVisualizer: true,
    },
    effects: {
      particles: "snow",
      crtScanlines: false,
      filmGrain: true,
      vignette: true,
      cursor: "crosshair",
      clickRipple: true,
      typewriterBio: true,
      cardTilt: true,
    },
    overlay: {
      enabled: true,
      enterText: "[ click to enter ]",
      subtext: "tap anywhere for sound & effects",
    },
    viewsCount: 14280,
    uniqueVisitorsCount: 9410,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-02-15T00:00:00.000Z",
  },
  guns: {
    id: "guns-user-id",
    username: "guns",
    displayName: "phantom",
    bio: "ghost in the shell // stay silent\nsystem.override(true)\nzero digital footprint",
    avatarUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80",
    bannerUrl: "",
    discordId: "",
    verified: true,
    badges: [
      { id: "b1", name: "Elite", icon: "ShieldCheck", description: "Elite Member", color: "#f43f5e" },
      { id: "b2", name: "VIP", icon: "Crown", description: "VIP Access", color: "#fbbf24" },
    ],
    socialLinks: [
      { id: "s1", platform: "telegram", title: "Secret Telegram", url: "https://t.me/telegram", copyOnClick: false, clicks: 420 },
      { id: "s2", platform: "steam", title: "Steam", url: "https://steamcommunity.com", copyOnClick: false, clicks: 760 },
      { id: "s3", platform: "discord", title: "Discord Tag", url: "phantom#0001", copyOnClick: true, clicks: 129 },
    ],
    theme: {
      preset: "crimson-blood",
      accentColor: "#ef4444",
      backgroundColor: "#050505",
      backgroundType: "image",
      backgroundUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80",
      backgroundBlur: 4,
      backgroundDarkness: 70,
      cardOpacity: 35,
      cardBlur: 24,
      cardBorderColor: "rgba(239, 68, 68, 0.4)",
      cardGlowColor: "#ef4444",
      cardGlowIntensity: 80,
      cardBorderRadius: 18,
      font: "mono",
      textColor: "#ffffff",
    },
    audio: {
      enabled: true,
      audioUrl: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3",
      title: "Cyberpunk Shadow",
      artist: "Night Drive",
      autoplayOnEnter: true,
      loop: true,
      volume: 70,
      floatingPlayer: true,
      showVisualizer: true,
    },
    effects: {
      particles: "embers",
      crtScanlines: true,
      filmGrain: true,
      vignette: true,
      cursor: "crosshair",
      clickRipple: true,
      typewriterBio: true,
      cardTilt: true,
    },
    overlay: {
      enabled: true,
      enterText: "$ execute facely.sh",
      subtext: "click to initialize connection",
    },
    viewsCount: 28940,
    uniqueVisitorsCount: 18230,
    createdAt: "2026-01-05T00:00:00.000Z",
    updatedAt: "2026-02-18T00:00:00.000Z",
  },
  aesthetic: {
    id: "aesthetic-user-id",
    username: "aesthetic",
    displayName: "sakura 🌸",
    bio: "floating among cherry blossoms ˚ʚ♡ɞ˚\nsipping iced matcha & listening to lo-fi\npeace & good vibes only ✨",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    bannerUrl: "",
    discordId: "",
    verified: false,
    badges: [
      { id: "b1", name: "Sweetheart", icon: "Heart", description: "Aesthetic Legend", color: "#f472b6" },
      { id: "b2", name: "Early Supporter", icon: "Sparkles", description: "Founding member", color: "#c084fc" },
    ],
    socialLinks: [
      { id: "s1", platform: "instagram", title: "Instagram", url: "https://instagram.com", copyOnClick: false, clicks: 620 },
      { id: "s2", platform: "spotify", title: "My Playlist", url: "https://spotify.com", copyOnClick: false, clicks: 940 },
      { id: "s3", platform: "tiktok", title: "TikTok", url: "https://tiktok.com", copyOnClick: false, clicks: 430 },
      { id: "s4", platform: "youtube", title: "Vlog Channel", url: "https://youtube.com", copyOnClick: false, clicks: 310 },
    ],
    theme: {
      preset: "vaporwave",
      accentColor: "#f472b6",
      backgroundColor: "#180a22",
      backgroundType: "image",
      backgroundUrl: "https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=1920&q=80",
      backgroundBlur: 2,
      backgroundDarkness: 45,
      cardOpacity: 50,
      cardBlur: 20,
      cardBorderColor: "rgba(244, 114, 182, 0.35)",
      cardGlowColor: "#f472b6",
      cardGlowIntensity: 75,
      cardBorderRadius: 28,
      font: "sans",
      textColor: "#ffffff",
    },
    audio: {
      enabled: true,
      audioUrl: "https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3",
      title: "Spring Blossoms",
      artist: "Lo-Fi Beats Collective",
      autoplayOnEnter: true,
      loop: true,
      volume: 50,
      floatingPlayer: true,
      showVisualizer: true,
    },
    effects: {
      particles: "sakura",
      crtScanlines: false,
      filmGrain: true,
      vignette: true,
      cursor: "dot",
      clickRipple: true,
      typewriterBio: false,
      cardTilt: true,
    },
    overlay: {
      enabled: true,
      enterText: "welcome to my world ✧*",
      subtext: "click anywhere to enter",
    },
    viewsCount: 39120,
    uniqueVisitorsCount: 27480,
    createdAt: "2026-01-10T00:00:00.000Z",
    updatedAt: "2026-02-20T00:00:00.000Z",
  },
};

// In-memory / localStorage cache
const memoryProfiles: Map<string, Profile> = new Map(Object.entries(DEFAULT_PROFILES));

export async function getProfileByUsername(rawUsername: string): Promise<Profile | null> {
  const username = rawUsername.toLowerCase().trim();

  // Try Supabase first if configured
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select(`
          *,
          social_links (*),
          badges (*)
        `)
        .ilike("username", username)
        .single();

      if (!error && data) {
        return {
          id: data.id,
          username: data.username,
          displayName: data.display_name,
          bio: data.bio || "",
          avatarUrl: data.avatar_url || "",
          bannerUrl: data.banner_url || "",
          discordId: data.discord_id || undefined,
          verified: data.verified || false,
          badges: (data.badges || []).map((b: any) => ({
            id: b.id,
            name: b.name,
            icon: b.icon,
            description: b.description,
            color: b.color,
          })),
          socialLinks: (data.social_links || []).map((s: any) => ({
            id: s.id,
            platform: s.platform,
            title: s.title,
            url: s.url,
            icon: s.icon,
            copyOnClick: s.copy_on_click,
            clicks: s.clicks || 0,
          })),
          theme: data.theme || DEFAULT_PROFILES.demo.theme,
          audio: data.audio || DEFAULT_PROFILES.demo.audio,
          effects: data.effects || DEFAULT_PROFILES.demo.effects,
          overlay: data.overlay || DEFAULT_PROFILES.demo.overlay,
          viewsCount: data.views_count || 0,
          uniqueVisitorsCount: data.unique_visitors_count || 0,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        };
      }
    } catch (err) {
      console.warn("Supabase fetch failed, falling back to local store:", err);
    }
  }

  // Client-side local storage fallback
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(`facely_profile_${username}`);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // ignore
    }
  }

  // In-memory / demo fallback
  if (memoryProfiles.has(username)) {
    return memoryProfiles.get(username)!;
  }

  return null;
}

export async function saveProfile(profile: Profile): Promise<Profile> {
  const username = profile.username.toLowerCase().trim();
  const updatedProfile: Profile = {
    ...profile,
    updatedAt: new Date().toISOString(),
  };

  memoryProfiles.set(username, updatedProfile);

  // If in browser, save to localStorage
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(`facely_profile_${username}`, JSON.stringify(updatedProfile));
      localStorage.setItem("facely_active_profile", JSON.stringify(updatedProfile));
    } catch (e) {
      console.error("Local storage error:", e);
    }
  }

  // Save to Supabase if configured
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from("profiles").upsert({
        id: updatedProfile.id,
        username: updatedProfile.username,
        display_name: updatedProfile.displayName,
        bio: updatedProfile.bio,
        avatar_url: updatedProfile.avatarUrl,
        banner_url: updatedProfile.bannerUrl,
        discord_id: updatedProfile.discordId,
        verified: updatedProfile.verified,
        theme: updatedProfile.theme,
        audio: updatedProfile.audio,
        effects: updatedProfile.effects,
        overlay: updatedProfile.overlay,
        updated_at: updatedProfile.updatedAt,
      });

      // Update social links
      if (updatedProfile.socialLinks && updatedProfile.socialLinks.length > 0) {
        for (let i = 0; i < updatedProfile.socialLinks.length; i++) {
          const link = updatedProfile.socialLinks[i];
          await supabase.from("social_links").upsert({
            id: link.id,
            profile_id: updatedProfile.id,
            platform: link.platform,
            title: link.title,
            url: link.url,
            copy_on_click: link.copyOnClick,
            sort_order: i,
          });
        }
      }
    } catch (err) {
      console.error("Supabase upsert failed:", err);
    }
  }

  return updatedProfile;
}

export async function recordProfileView(username: string, referrer?: string): Promise<{ views: number; unique: number }> {
  const normalized = username.toLowerCase().trim();
  const profile = await getProfileByUsername(normalized);

  if (!profile) {
    return { views: 0, unique: 0 };
  }

  // In local mode:
  let isUnique = true;
  if (typeof window !== "undefined") {
    const viewedKey = `facely_viewed_${normalized}`;
    if (sessionStorage.getItem(viewedKey)) {
      isUnique = false;
    } else {
      sessionStorage.setItem(viewedKey, "1");
    }
  }

  profile.viewsCount += 1;
  if (isUnique) {
    profile.uniqueVisitorsCount += 1;
  }

  memoryProfiles.set(normalized, profile);

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(`facely_profile_${normalized}`, JSON.stringify(profile));
    } catch (e) {}
  }

  return {
    views: profile.viewsCount,
    unique: profile.uniqueVisitorsCount,
  };
}

export async function recordLinkClick(username: string, linkId: string): Promise<void> {
  const normalized = username.toLowerCase().trim();
  const profile = await getProfileByUsername(normalized);
  if (!profile) return;

  const link = profile.socialLinks.find((l) => l.id === linkId);
  if (link) {
    link.clicks = (link.clicks || 0) + 1;
    await saveProfile(profile);
  }
}
