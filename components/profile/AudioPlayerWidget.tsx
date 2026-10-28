"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Disc3, Music2 } from "lucide-react";
import { ProfileAudio } from "@/lib/types";

interface AudioPlayerWidgetProps {
  audio: ProfileAudio;
  accentColor?: string;
  autoPlayTrigger?: boolean;
}

export const AudioPlayerWidget: React.FC<AudioPlayerWidgetProps> = ({
  audio,
  accentColor = "#a855f7",
  autoPlayTrigger = false,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(audio.volume || 60);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  // Audio setup and autoPlay on trigger
  useEffect(() => {
    if (!audio.enabled || !audio.audioUrl) return;

    if (autoPlayTrigger && audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Autoplay blocked or waiting for user interaction:", err);
        });
    }
  }, [autoPlayTrigger, audio.enabled, audio.audioUrl]);

  // Volume change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setProgress((current / total) * 100);
      setDuration(total);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    audioRef.current.currentTime = pct * duration;
    setProgress(pct * 100);
  };

  if (!audio.enabled || !audio.audioUrl) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={audio.audioUrl}
        loop={audio.loop}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 max-w-sm sm:max-w-md w-[calc(100%-2rem)]">
        <div
          className="relative flex items-center justify-between px-3.5 py-2.5 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-white/20"
          style={{
            boxShadow: `0 8px 32px -4px ${accentColor}25, 0 0 0 1px rgba(255, 255, 255, 0.08)`,
          }}
        >
          {/* Progress bar line at top */}
          <div
            onClick={handleSeek}
            className="absolute top-0 left-0 right-0 h-1 bg-white/10 rounded-t-2xl cursor-pointer overflow-hidden group"
          >
            <div
              className="h-full transition-all duration-100 ease-linear"
              style={{
                width: `${progress}%`,
                backgroundColor: accentColor,
              }}
            />
          </div>

          {/* Left: Spinning Disc & Song Info */}
          <div className="flex items-center space-x-3 overflow-hidden pr-2">
            <div
              onClick={togglePlay}
              className="relative cursor-pointer shrink-0 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Disc3
                className={`w-5 h-5 text-white transition-transform ${
                  isPlaying ? "animate-spin-slow" : ""
                }`}
                style={{ color: isPlaying ? accentColor : "#a1a1aa" }}
              />
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-xs font-medium text-white truncate max-w-[120px] sm:max-w-[180px]">
                {audio.title || "Background Music"}
              </span>
              <span className="text-[10px] text-zinc-400 truncate max-w-[120px] sm:max-w-[180px]">
                {audio.artist || "Facely Stream"}
              </span>
            </div>
          </div>

          {/* Center: Audio Visualizer bars */}
          {audio.showVisualizer && (
            <div className="hidden sm:flex items-center space-x-0.5 h-4 px-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className={`w-0.5 rounded-full ${
                    isPlaying ? "visualizer-bar" : "h-1"
                  }`}
                  style={{
                    backgroundColor: isPlaying ? accentColor : "#52525b",
                  }}
                />
              ))}
            </div>
          )}

          {/* Right: Controls (Play/Pause, Mute, Volume) */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause music" : "Play music"}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-all transform active:scale-95"
              style={{
                backgroundColor: isPlaying ? `${accentColor}30` : undefined,
                color: isPlaying ? accentColor : "#ffffff",
              }}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5" />
              ) : (
                <Volume2 className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Mini volume slider for desktop */}
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              className="hidden md:block w-14 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>
        </div>
      </div>
    </>
  );
};
