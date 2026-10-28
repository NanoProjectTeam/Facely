import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProfileByUsername } from "@/lib/storage";
import { ProfileViewClient } from "./ProfileViewClient";

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { username } = await params;
  const profile = await getProfileByUsername(username);

  if (!profile) {
    return {
      title: "Profile Not Found — Facely",
      description: "Claim your personal bio-link and profile website on Facely.",
    };
  }

  return {
    title: `${profile.displayName} (@${profile.username}) — Facely`,
    description: profile.bio || `Check out ${profile.displayName}'s bio profile on Facely.`,
    openGraph: {
      title: `${profile.displayName} (@${profile.username})`,
      description: profile.bio || "Bio-link profile on Facely",
      images: [
        {
          url: profile.avatarUrl || "https://facely.me/og-default.png",
          width: 800,
          height: 800,
          alt: profile.displayName,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `${profile.displayName} (@${profile.username})`,
      description: profile.bio,
      images: [profile.avatarUrl || "https://facely.me/og-default.png"],
    },
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const profile = await getProfileByUsername(username);

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#070709] text-white p-4 text-center">
        <div className="max-w-md w-full p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col items-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-mono text-xl">
            404
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Profile Not Found</h1>
          <p className="text-sm text-zinc-400">
            The username <span className="text-purple-400 font-mono">@{username}</span> is available! Claim it now on Facely before someone else does.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3 w-full">
            <a
              href={`/dashboard?claim=${username}`}
              className="flex-1 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-all text-center shadow-lg shadow-purple-600/30"
            >
              Claim @{username}
            </a>
            <a
              href="/"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm transition-all text-center"
            >
              Explore Facely
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <ProfileViewClient initialProfile={profile} />;
}
