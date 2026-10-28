export type BackgroundType = 'gradient' | 'image' | 'video' | 'color';
export type ParticleEffect = 'none' | 'snow' | 'sakura' | 'embers' | 'sparkles' | 'rain';
export type CursorType = 'default' | 'crosshair' | 'dot' | 'glow-orb';
export type FontType = 'sans' | 'mono' | 'serif' | 'aesthetic' | 'pixel';
export type ThemePreset = 'guns-dark' | 'cyberpunk' | 'midnight-blue' | 'crimson-blood' | 'emerald-abyss' | 'vaporwave' | 'minimal-light' | 'custom';

export interface SocialLink {
  id: string;
  platform: 'discord' | 'github' | 'spotify' | 'twitter' | 'x' | 'steam' | 'telegram' | 'instagram' | 'youtube' | 'twitch' | 'tiktok' | 'custom';
  title: string;
  url: string;
  icon?: string;
  copyOnClick?: boolean;
  clicks?: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string; // lucide icon name or emoji or image URL
  description: string;
  color?: string;
}

export interface ProfileTheme {
  preset: ThemePreset;
  accentColor: string;
  backgroundColor: string;
  backgroundType: BackgroundType;
  backgroundUrl: string;
  backgroundBlur: number; // 0 - 20
  backgroundDarkness: number; // 0 - 100 (%)
  cardOpacity: number; // 0 - 100 (%)
  cardBlur: number; // 0 - 24
  cardBorderColor: string;
  cardGlowColor: string;
  cardGlowIntensity: number; // 0 - 100
  cardBorderRadius: number; // 8 - 32
  font: FontType;
  textColor: string;
}

export interface ProfileAudio {
  enabled: boolean;
  audioUrl: string;
  title: string;
  artist: string;
  autoplayOnEnter: boolean;
  loop: boolean;
  volume: number; // 0 - 100
  floatingPlayer: boolean;
  showVisualizer: boolean;
}

export interface ProfileEffects {
  particles: ParticleEffect;
  crtScanlines: boolean;
  filmGrain: boolean;
  vignette: boolean;
  cursor: CursorType;
  clickRipple: boolean;
  typewriterBio: boolean;
  cardTilt: boolean;
}

export interface ProfileOverlay {
  enabled: boolean;
  enterText: string;
  subtext?: string;
}

export interface Profile {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  bannerUrl?: string;
  discordId?: string; // For live Lanyard status
  verified?: boolean;
  badges: Badge[];
  socialLinks: SocialLink[];
  theme: ProfileTheme;
  audio: ProfileAudio;
  effects: ProfileEffects;
  overlay: ProfileOverlay;
  viewsCount: number;
  uniqueVisitorsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface LanyardData {
  spotify: {
    track_id: string;
    timestamps: {
      start: number;
      end: number;
    };
    song: string;
    artist: string;
    album_art_url: string;
    album: string;
  } | null;
  discord_user: {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    global_name: string | null;
  };
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities: Array<{
    id: string;
    name: string;
    type: number;
    state?: string;
    details?: string;
    timestamps?: {
      start: number;
      end?: number;
    };
    assets?: {
      large_image?: string;
      large_text?: string;
      small_image?: string;
      small_text?: string;
    };
  }>;
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  listening_to_spotify: boolean;
}

export interface AnalyticsRecord {
  profileId: string;
  views: number;
  uniqueVisitors: number;
  referrers: Record<string, number>;
  linkClicks: Record<string, number>;
  dailyViews: Array<{ date: string; views: number }>;
}
