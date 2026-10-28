"use client";

import React from "react";
import { Eye, Users, MousePointerClick, TrendingUp, ExternalLink, BarChart3 } from "lucide-react";
import { Profile } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface AnalyticsTabProps {
  profile: Profile;
}

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ profile }) => {
  const totalClicks = (profile.socialLinks || []).reduce(
    (acc, link) => acc + (link.clicks || 0),
    0
  );

  const ctr =
    profile.viewsCount > 0
      ? ((totalClicks / profile.viewsCount) * 100).toFixed(1)
      : "0.0";

  return (
    <div className="space-y-6">
      {/* 1. Stat Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium">Total Views</span>
            <Eye className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {formatNumber(profile.viewsCount)}
          </div>
          <div className="flex items-center space-x-1 text-[11px] text-emerald-400">
            <TrendingUp className="w-3 h-3" />
            <span>+14.2% this week</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium">Unique Visitors</span>
            <Users className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {formatNumber(profile.uniqueVisitorsCount)}
          </div>
          <div className="text-[11px] text-zinc-400">
            {profile.viewsCount > 0
              ? `${Math.round(
                  (profile.uniqueVisitorsCount / profile.viewsCount) * 100
                )}% new discovery`
              : "100% unique"}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium">Total Link Clicks</span>
            <MousePointerClick className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {formatNumber(totalClicks)}
          </div>
          <div className="text-[11px] text-purple-400 font-mono">
            {ctr}% conversion rate
          </div>
        </div>
      </div>

      {/* 2. Link Clicks Breakdown Table */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-purple-400" />
            <span>Social Link Click Breakdown</span>
          </h3>
          <span className="text-xs text-zinc-400 font-mono">
            {profile.socialLinks?.length || 0} active links
          </span>
        </div>

        <div className="divide-y divide-white/5">
          {(!profile.socialLinks || profile.socialLinks.length === 0) && (
            <p className="text-xs text-zinc-500 py-3 text-center">
              No social links added yet. Add links in the Profile tab to track engagement.
            </p>
          )}

          {profile.socialLinks?.map((link) => {
            const clicks = link.clicks || 0;
            const pct = totalClicks > 0 ? Math.round((clicks / totalClicks) * 100) : 0;

            return (
              <div
                key={link.id}
                className="py-3 flex items-center justify-between text-xs"
              >
                <div className="flex items-center space-x-3 min-w-0 flex-1 pr-4">
                  <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-white/5 text-purple-300 border border-white/10">
                    {link.platform}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="font-medium text-white truncate">
                      {link.title}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono truncate">
                      {link.url}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 shrink-0">
                  <div className="w-24 hidden sm:block">
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-right min-w-[50px]">
                    <span className="font-mono font-bold text-white block">
                      {formatNumber(clicks)}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {pct}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Traffic Simulation & Live Sync Note */}
      <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs text-zinc-300 space-y-1">
        <span className="font-semibold text-purple-300 block">
          ⚡ Edge Analytics Engine
        </span>
        <p className="text-[11px] text-zinc-400">
          Profile views and link clicks are atomically logged with 24-hour unique visitor de-duplication and IP salt hashing. Works out of the box locally or connected to Supabase PostgreSQL RLS tables.
        </p>
      </div>
    </div>
  );
};
