"use client";

import React, { useState } from "react";
import { Plus, Trash2, ShieldCheck, Sparkles, Terminal, Copy, Globe, Info } from "lucide-react";
import { Profile, SocialLink, Badge } from "@/lib/types";

interface ProfileTabProps {
  profile: Profile;
  onChange: (updated: Partial<Profile>) => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ profile, onChange }) => {
  const [newPlatform, setNewPlatform] = useState<SocialLink["platform"]>("discord");
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newCopyOnly, setNewCopyOnly] = useState(false);

  const handleAddSocialLink = () => {
    if (!newUrl.trim()) return;

    const newLink: SocialLink = {
      id: "link_" + Math.random().toString(36).substring(2, 9),
      platform: newPlatform,
      title: newTitle.trim() || newPlatform.toUpperCase(),
      url: newUrl.trim(),
      copyOnClick: newCopyOnly,
      clicks: 0,
    };

    onChange({
      socialLinks: [...(profile.socialLinks || []), newLink],
    });

    setNewTitle("");
    setNewUrl("");
    setNewCopyOnly(false);
  };

  const handleRemoveSocialLink = (id: string) => {
    onChange({
      socialLinks: (profile.socialLinks || []).filter((l) => l.id !== id),
    });
  };

  const handleToggleVerified = () => {
    onChange({ verified: !profile.verified });
  };

  const handleAddBadge = (name: string, icon: string, description: string, color: string) => {
    const exists = profile.badges?.some((b) => b.name === name);
    if (exists) {
      onChange({
        badges: profile.badges.filter((b) => b.name !== name),
      });
    } else {
      const badge: Badge = {
        id: "badge_" + Math.random().toString(36).substring(2, 7),
        name,
        icon,
        description,
        color,
      };
      onChange({
        badges: [...(profile.badges || []), badge],
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Basic Profile Info */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center space-x-2">
          <span>Identity & Handle</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Username (URL slug)
            </label>
            <div className="flex items-center rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm focus-within:border-purple-500 transition-colors">
              <span className="text-zinc-500 font-mono text-xs mr-1">facely.me/</span>
              <input
                type="text"
                value={profile.username}
                onChange={(e) =>
                  onChange({
                    username: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""),
                  })
                }
                className="bg-transparent border-none outline-none text-white font-mono text-xs w-full"
                placeholder="username"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Display Name
            </label>
            <input
              type="text"
              value={profile.displayName}
              onChange={(e) => onChange({ displayName: e.target.value })}
              className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-purple-500 transition-colors"
              placeholder="Display Name"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5">
            Avatar URL (GIF, WebP, PNG, JPG)
          </label>
          <input
            type="text"
            value={profile.avatarUrl}
            onChange={(e) => onChange({ avatarUrl: e.target.value })}
            className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-purple-500 transition-colors font-mono text-xs"
            placeholder="https://images.unsplash.com/... or GIF link"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5">
            Bio Description
          </label>
          <textarea
            rows={3}
            value={profile.bio}
            onChange={(e) => onChange({ bio: e.target.value })}
            className="w-full rounded-lg bg-black/40 border border-white/10 p-3 text-sm text-white outline-none focus:border-purple-500 transition-colors resize-none text-xs leading-relaxed"
            placeholder="Write an aesthetic bio. Supports linebreaks."
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-zinc-400 flex items-center space-x-1.5">
              <span>Discord User ID (Lanyard Sync)</span>
              <span className="text-[10px] text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">
                Live Status
              </span>
            </label>
          </div>
          <input
            type="text"
            value={profile.discordId || ""}
            onChange={(e) => onChange({ discordId: e.target.value })}
            className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-purple-500 transition-colors font-mono text-xs"
            placeholder="e.g. 1059084802879598683 (Copy ID in Discord)"
          />
          <p className="text-[11px] text-zinc-500 mt-1">
            Enables live status ("Online", "Idle", "DND") and "Listening to Spotify" tracker via Lanyard.
          </p>
        </div>
      </div>

      {/* 2. Badges Manager */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
          Profile Badges
        </h3>
        <p className="text-xs text-zinc-400">
          Toggle verified credentials and special badges on your profile card:
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          <button
            type="button"
            onClick={handleToggleVerified}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              profile.verified
                ? "bg-sky-500/20 border-sky-500/50 text-sky-400 shadow-md shadow-sky-500/20"
                : "bg-white/5 border-white/10 text-zinc-400 hover:border-white/20"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verified Checkmark</span>
          </button>

          <button
            type="button"
            onClick={() =>
              handleAddBadge("Early Supporter", "Sparkles", "Founding Facely Member", "#ec4899")
            }
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              profile.badges?.some((b) => b.name === "Early Supporter")
                ? "bg-pink-500/20 border-pink-500/50 text-pink-400 shadow-md shadow-pink-500/20"
                : "bg-white/5 border-white/10 text-zinc-400 hover:border-white/20"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Early Supporter</span>
          </button>

          <button
            type="button"
            onClick={() =>
              handleAddBadge("Code Wizard", "Terminal", "Open Source Developer", "#10b981")
            }
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              profile.badges?.some((b) => b.name === "Code Wizard")
                ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-md shadow-emerald-500/20"
                : "bg-white/5 border-white/10 text-zinc-400 hover:border-white/20"
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Code Wizard</span>
          </button>
        </div>
      </div>

      {/* 3. Social Links Editor */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
          Social Links ({profile.socialLinks?.length || 0})
        </h3>

        {/* Existing links list */}
        <div className="space-y-2">
          {profile.socialLinks?.map((link) => (
            <div
              key={link.id}
              className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/10 text-xs"
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <span className="font-mono capitalize text-purple-400 font-semibold px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                  {link.platform}
                </span>
                <span className="text-white font-medium truncate max-w-[120px]">
                  {link.title}
                </span>
                <span className="text-zinc-500 truncate max-w-[160px] font-mono">
                  {link.url}
                </span>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                {link.copyOnClick && (
                  <span className="text-[10px] text-zinc-400 bg-white/5 px-1.5 py-0.5 rounded">
                    Copy on click
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveSocialLink(link.id)}
                  className="p-1 rounded text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add new link form */}
        <div className="pt-3 border-t border-white/10 space-y-3">
          <span className="text-xs font-semibold text-zinc-300 block">Add New Link</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <select
              value={newPlatform}
              onChange={(e) => setNewPlatform(e.target.value as any)}
              className="rounded-lg bg-black/40 border border-white/10 px-2.5 py-2 text-xs text-white outline-none focus:border-purple-500"
            >
              <option value="discord">Discord</option>
              <option value="github">GitHub</option>
              <option value="spotify">Spotify</option>
              <option value="x">X / Twitter</option>
              <option value="steam">Steam</option>
              <option value="telegram">Telegram</option>
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
              <option value="twitch">Twitch</option>
              <option value="tiktok">TikTok</option>
              <option value="custom">Custom Web Link</option>
            </select>

            <input
              type="text"
              placeholder="Title (e.g. My Server)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-xs text-white outline-none focus:border-purple-500"
            />

            <input
              type="text"
              placeholder="URL or Tag"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-xs text-white outline-none focus:border-purple-500 font-mono"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center space-x-2 text-xs text-zinc-400 cursor-pointer">
              <input
                type="checkbox"
                checked={newCopyOnly}
                onChange={(e) => setNewCopyOnly(e.target.checked)}
                className="rounded border-zinc-700 text-purple-600 focus:ring-purple-500"
              />
              <span>Copy to clipboard instead of opening link (e.g. Discord tag)</span>
            </label>

            <button
              type="button"
              onClick={handleAddSocialLink}
              disabled={!newUrl.trim()}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-medium text-xs transition-colors shadow-md shadow-purple-600/20"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Link</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
