"use client";

import React, { useRef, useState } from "react";
import { Music, Play, Pause, Volume2, Sparkles, Disc } from "lucide-react";
import { Profile, ProfileAudio } from "@/lib/types";

interface AudioTabProps {
  profile: Profile;
  onChange: (updated: Partial<Profile>) => void;
}

const SAMPLE_TRACKS = [
  {
    title: "Chill Sunset Lo-Fi",
    artist: "Facely Records",
    url: "https://assets.mixkit.co/music/preview/mixkit-chill-bro-494.mp3",
  },
  {
    title: "Cyberpunk Shadow",
    artist: "Night Drive",
    url: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3",
  },
  {
    title: "Spring Blossoms",
    artist: "Lo-Fi Beats Collective",
    url: "https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3",
  },
  {
    title: "Midnight Drive",
    artist: "Synthwave Express",
    url: "https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3",
  },
];

export const AudioTab: React.FC<AudioTabProps> = ({ profile, onChange }) => {
  const audio = profile.audio;
  const audioPreviewRef = useRef<HTMLAudioElement | null>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  const updateAudio = (fields: Partial<ProfileAudio>) => {
    onChange({
      audio: {
        ...audio,
        ...fields,
      },
    });
  };

  const togglePreview = () => {
    if (!audioPreviewRef.current) return;
    if (isPlayingPreview) {
      audioPreviewRef.current.pause();
      setIsPlayingPreview(false);
    } else {
      audioPreviewRef.current.volume = (audio.volume || 60) / 100;
      audioPreviewRef.current
        .play()
        .then(() => setIsPlayingPreview(true))
        .catch(console.error);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Main Enable Switch */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Music className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Background Audio Player</h3>
            <p className="text-xs text-zinc-400">
              Stream background music when visitors enter your bio-link
            </p>
          </div>
        </div>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={audio.enabled}
            onChange={(e) => updateAudio({ enabled: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
        </label>
      </div>

      {audio.enabled && (
        <>
          {/* 2. Track Source & Info */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Audio File & Metadata
            </h3>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                Audio Stream URL (Direct .mp3 / .wav / .ogg)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={audio.audioUrl}
                  onChange={(e) => updateAudio({ audioUrl: e.target.value })}
                  className="flex-1 rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-xs text-white font-mono outline-none focus:border-purple-500"
                  placeholder="https://... direct audio mp3 URL"
                />

                {audio.audioUrl && (
                  <button
                    type="button"
                    onClick={togglePreview}
                    className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors shrink-0"
                  >
                    {isPlayingPreview ? (
                      <>
                        <Pause className="w-3.5 h-3.5 text-purple-400" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-purple-400" />
                        <span>Test Play</span>
                      </>
                    )}
                  </button>
                )}
              </div>
              <audio
                ref={audioPreviewRef}
                src={audio.audioUrl}
                onEnded={() => setIsPlayingPreview(false)}
              />

              {/* Presets */}
              <div className="flex flex-wrap gap-2 mt-2.5">
                <span className="text-[10px] text-zinc-500 self-center">Royalty-Free Tracks:</span>
                {SAMPLE_TRACKS.map((t) => (
                  <button
                    key={t.title}
                    type="button"
                    onClick={() => {
                      updateAudio({
                        audioUrl: t.url,
                        title: t.title,
                        artist: t.artist,
                      });
                      setIsPlayingPreview(false);
                    }}
                    className="text-[10px] px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10"
                  >
                    {t.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Track Title
                </label>
                <input
                  type="text"
                  value={audio.title}
                  onChange={(e) => updateAudio({ title: e.target.value })}
                  className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-xs text-white outline-none focus:border-purple-500"
                  placeholder="Song Title"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Artist / Producer
                </label>
                <input
                  type="text"
                  value={audio.artist}
                  onChange={(e) => updateAudio({ artist: e.target.value })}
                  className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-xs text-white outline-none focus:border-purple-500"
                  placeholder="Artist"
                />
              </div>
            </div>
          </div>

          {/* 3. Playback Controls & Settings */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Playback Configuration
            </h3>

            <div>
              <div className="flex justify-between text-xs text-zinc-400 mb-1">
                <span>Default Volume</span>
                <span className="font-mono">{audio.volume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={audio.volume}
                onChange={(e) => updateAudio({ volume: Number(e.target.value) })}
                className="w-full accent-purple-500 h-1.5 bg-white/10 rounded-lg cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <label className="flex items-center space-x-2.5 p-3 rounded-lg bg-black/30 border border-white/10 cursor-pointer hover:bg-black/40 transition-colors">
                <input
                  type="checkbox"
                  checked={audio.autoplayOnEnter}
                  onChange={(e) => updateAudio({ autoplayOnEnter: e.target.checked })}
                  className="rounded border-zinc-700 text-purple-600 focus:ring-purple-500"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-white">Autoplay on Enter</span>
                  <span className="text-[10px] text-zinc-400">
                    Plays audio immediately after user clicks the intro screen
                  </span>
                </div>
              </label>

              <label className="flex items-center space-x-2.5 p-3 rounded-lg bg-black/30 border border-white/10 cursor-pointer hover:bg-black/40 transition-colors">
                <input
                  type="checkbox"
                  checked={audio.loop}
                  onChange={(e) => updateAudio({ loop: e.target.checked })}
                  className="rounded border-zinc-700 text-purple-600 focus:ring-purple-500"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-white">Loop Audio</span>
                  <span className="text-[10px] text-zinc-400">
                    Seamlessly loops track upon finishing
                  </span>
                </div>
              </label>

              <label className="flex items-center space-x-2.5 p-3 rounded-lg bg-black/30 border border-white/10 cursor-pointer hover:bg-black/40 transition-colors">
                <input
                  type="checkbox"
                  checked={audio.floatingPlayer}
                  onChange={(e) => updateAudio({ floatingPlayer: e.target.checked })}
                  className="rounded border-zinc-700 text-purple-600 focus:ring-purple-500"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-white">Floating Player Widget</span>
                  <span className="text-[10px] text-zinc-400">
                    Shows sleek music bar at bottom of profile
                  </span>
                </div>
              </label>

              <label className="flex items-center space-x-2.5 p-3 rounded-lg bg-black/30 border border-white/10 cursor-pointer hover:bg-black/40 transition-colors">
                <input
                  type="checkbox"
                  checked={audio.showVisualizer}
                  onChange={(e) => updateAudio({ showVisualizer: e.target.checked })}
                  className="rounded border-zinc-700 text-purple-600 focus:ring-purple-500"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-white">Spectrum Visualizer</span>
                  <span className="text-[10px] text-zinc-400">
                    Animated audio equalizer wave bars
                  </span>
                </div>
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
