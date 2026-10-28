"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Github, Mail, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleOAuthLogin = async (provider: "discord" | "github") => {
    if (!isSupabaseConfigured || !supabase) {
      // Demo fallback if Supabase credentials are not added yet
      setMessage("Supabase credentials not detected in .env.local — entering Instant Demo Mode!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setMessage(err.message || "OAuth login error");
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    if (!isSupabaseConfigured || !supabase) {
      setMessage("Supabase credentials not detected — entering Instant Demo Mode!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
      setMessage("Magic login link sent to your email!");
    } catch (err: any) {
      setMessage(err.message || "Failed to send magic link");
    } finally {
      setLoading(false);
    }
  };

  const enterDemo = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#070709] text-white p-4 relative overflow-hidden">
      {/* Glow orb */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-purple-600/15 blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl relative z-10 space-y-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-600/30 mb-1">
            <Sparkles className="w-6 h-6 fill-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Sign In to Facely</h1>
          <p className="text-xs text-zinc-400">
            Create, customize, and manage your aesthetic bio-link profile
          </p>
        </div>

        {message && (
          <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/30 text-xs text-purple-300 text-center">
            {message}
          </div>
        )}

        {/* OAuth Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => handleOAuthLogin("discord")}
            className="w-full flex items-center justify-center space-x-2.5 px-4 py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-semibold transition-all shadow-md active:scale-95"
          >
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            <span>Continue with Discord</span>
          </button>

          <button
            type="button"
            onClick={() => handleOAuthLogin("github")}
            className="w-full flex items-center justify-center space-x-2.5 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-white text-xs font-semibold transition-all active:scale-95"
          >
            <Github className="w-4 h-4" />
            <span>Continue with GitHub</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <span className="relative px-3 bg-[#0c0c11] text-[10px] uppercase font-mono text-zinc-500">
            or passwordless email
          </span>
        </div>

        {/* Magic Link Form */}
        <form onSubmit={handleEmailLogin} className="space-y-3">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full rounded-xl bg-black/40 border border-white/10 px-3.5 py-2.5 text-xs text-white outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all shadow-md shadow-purple-600/30 flex items-center justify-center space-x-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{loading ? "Sending..." : "Send Magic Link"}</span>
          </button>
        </form>

        {/* Instant Demo Sandbox Access */}
        <div className="pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={enterDemo}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-medium transition-colors"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Launch Instant Demo Studio (No sign-in required)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
