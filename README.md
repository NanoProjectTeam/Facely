<div align="center">
  <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80" width="100" height="100" style="border-radius: 24px;" alt="Facely Logo" />
  <h1>✨ Facely</h1>
  <p><strong>100% Free, Open-Source Bio-Link & Aesthetic Profile Website</strong></p>
  <p><em>Inspired by guns.lol, crafted for creators, gamers, and developers. Optimized for zero-cost deployment on Vercel.</em></p>

  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#quick-start">Quick Start</a> •
    <a href="#supabase-setup">Database Setup</a> •
    <a href="#vercel-deployment">Deploy to Vercel</a> •
    <a href="#license">License</a>
  </p>
</div>

---

## 🌟 Overview

**Facely** is an ultra-aesthetic, open-source personal bio-link profile platform designed as a modern, completely free alternative to sites like `guns.lol` and `linktr.ee`.

Deploy your own instance on Vercel in 60 seconds with **zero subscription costs**, full control over your data with **Supabase PostgreSQL & Row-Level Security**, and instant live preview editing in the **Creator Studio**.

---

## ✨ Features

### 1. Aesthetic Profile Experience
- **Click-to-Enter Splash Overlay:** Vintage intro screen with custom prompt (e.g. `[ click to enter ]`) that triggers audio playback upon user interaction, gracefully satisfying modern browser autoplay policies.
- **Glassmorphic & Neumorphic Cards:** Customizable backdrop blur, glass opacity, glowing borders, and 3D mouse tilt.
- **Lanyard Live Discord Integration:** Real-time Discord status indicator (`Online`, `Idle`, `DND`, `Offline`), custom activity status, and dynamic **"Listening to Spotify"** widget with album artwork, live song progress scrubber, and direct Spotify link.
- **Background Audio Player:** Floating aesthetic music widget with song metadata, scrubber, volume slider, and responsive audio visualizer equalizer bars.
- **Atmospheric Background FX:**
  - Fullscreen video loops (`.mp4`), animated GIFs, mesh gradients, or solid deep colors.
  - Interactive Canvas particle systems: **Snow Drifts**, **Sakura Petals 🌸**, **Fiery Embers 🔥**, **Magic Sparkles ✨**, and **Cyber Rain 🌧️**.
  - CRT retro scanlines, 35mm analog film grain filter, and radial corner vignette shading.
- **Custom Mouse Cursors:** FPS crosshair with trailing lines, minimal dot, or glowing ambient orb.
- **Typewriter Bio:** Animated character-by-character bio typography.
- **Social Link Grid & Copy-on-Click:** Direct links or 1-tap clipboard copy for Discord tags, Steam IDs, and crypto wallets.
- **Edge Analytics & View Counter:** Unique visitor tracking with 24-hour IP salt hashing, view counting, and social click tracking.

### 2. Creator Dashboard & Live-Preview Studio
- **Split-Screen Studio:** Left pane for controls, right pane for live interactive desktop or mobile iPhone mockup preview.
- **Live Device Switcher:** Toggle between iPhone 15 frame outline and desktop browser view.
- **Customization Tabs:**
  - **Profile:** Username handle, display name, avatar, bio, Discord ID, verified badges, and social links.
  - **Appearance:** Theme presets (*Guns Dark, Cyberpunk, Midnight Ocean, Crimson Blood, Emerald Abyss, Vaporwave*), custom hex colors, font selector (*Aesthetic Outfit, JetBrains Mono, Playfair Serif, 8-Bit Pixel*), glass opacity, and border glow.
  - **Audio:** Audio URL upload/stream, track metadata, volume default, autoplay on enter, loop mode.
  - **Effects:** Custom cursor, particle types, CRT scanlines, grain, vignette, 3D card tilt.
  - **Analytics:** Clean dashboard displaying total views, unique visitors, link click-through conversions, and platform breakdown.

---

## 🛠 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, React 19, TypeScript)
- **Styling & UI:** [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/) (smooth animations & 3D tilt), [Lucide Icons](https://lucide.dev/)
- **Backend & Database:** [Supabase](https://supabase.com/) (PostgreSQL with Row-Level Security, RPC functions, and Auth for Discord, GitHub, and Email)
- **Discord Integration:** [Lanyard API](https://github.com/Phineas/lanyard) (WebSocket & REST for real-time status and Spotify tracker)
- **Deployment:** [Vercel](https://vercel.com/) (Edge/Serverless functions, zero-cost tier)

---

## 🚀 Quick Start (Local Development)

### 1. Clone & Install
```bash
git clone https://github.com/your-username/facely.git
cd facely
npm install
```

### 2. Configure Environment Variables (Optional for local demo mode)
Facely comes with a built-in instant demo fallback that works immediately without database setup. To connect your own Supabase project:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the homepage and explore demo profiles:
- [http://localhost:3000/demo](http://localhost:3000/demo) (Midnight Cyber)
- [http://localhost:3000/guns](http://localhost:3000/guns) (Crimson Hacker)
- [http://localhost:3000/aesthetic](http://localhost:3000/aesthetic) (Sakura Dream)
- [http://localhost:3000/dashboard](http://localhost:3000/dashboard) (Creator Studio)

---

## 🗄️ Supabase Database Setup

1. Create a free project on [Supabase](https://supabase.com).
2. Go to the **SQL Editor** tab in the Supabase Dashboard.
3. Open [`supabase/schema.sql`](./supabase/schema.sql) in this repository, paste the entire SQL script, and click **Run**.
4. The script automatically configures:
   - `public.profiles` (Profiles, themes, audio, effects, badges, overlay)
   - `public.social_links` (Social links and click counts)
   - `public.badges` (Verified and custom achievement badges)
   - `public.profile_views` (Analytics with 24h visitor uniqueness)
   - Row-Level Security (RLS) policies allowing public read and authenticated owner updates
   - RPC functions (`record_profile_view`, `record_link_click`)
   - `handle_new_user()` trigger for automated profile creation on signup

5. *(Optional)* In **Authentication -> Providers**, enable **Discord** and **GitHub** OAuth by providing your OAuth Client IDs and Secrets.

---

## ☁️ Deploy to Vercel (100% Free)

1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your Facely repository.
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_APP_URL` (set to `https://your-project.vercel.app`)
5. Click **Deploy**. Your custom bio-link platform is now live with global edge caching!

---

## 📄 License

MIT License. Free to use, modify, self-host, and distribute.
