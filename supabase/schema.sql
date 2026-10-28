-- ==============================================================================
-- FACELY SUPABASE DATABASE SCHEMA
-- Free & Open-Source guns.lol alternative with Row-Level Security (RLS)
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    bio TEXT DEFAULT '',
    avatar_url TEXT DEFAULT '',
    banner_url TEXT DEFAULT '',
    discord_id TEXT DEFAULT NULL,
    verified BOOLEAN DEFAULT FALSE,
    theme JSONB DEFAULT '{
        "preset": "guns-dark",
        "accentColor": "#a855f7",
        "backgroundColor": "#09090b",
        "backgroundType": "gradient",
        "backgroundUrl": "",
        "backgroundBlur": 0,
        "backgroundDarkness": 40,
        "cardOpacity": 60,
        "cardBlur": 16,
        "cardBorderColor": "rgba(255, 255, 255, 0.12)",
        "cardGlowColor": "#a855f7",
        "cardGlowIntensity": 40,
        "cardBorderRadius": 20,
        "font": "aesthetic",
        "textColor": "#ffffff"
    }'::jsonb,
    audio JSONB DEFAULT '{
        "enabled": true,
        "audioUrl": "https://assets.mixkit.co/music/preview/mixkit-chill-bro-494.mp3",
        "title": "Chill Sunset",
        "artist": "Facely Records",
        "autoplayOnEnter": true,
        "loop": true,
        "volume": 60,
        "floatingPlayer": true,
        "showVisualizer": true
    }'::jsonb,
    effects JSONB DEFAULT '{
        "particles": "snow",
        "crtScanlines": false,
        "filmGrain": true,
        "vignette": true,
        "cursor": "crosshair",
        "clickRipple": true,
        "typewriterBio": true,
        "cardTilt": true
    }'::jsonb,
    overlay JSONB DEFAULT '{
        "enabled": true,
        "enterText": "[ click to enter ]",
        "subtext": "tap anywhere to explore profile"
    }'::jsonb,
    views_count BIGINT DEFAULT 0,
    unique_visitors_count BIGINT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT username_length CHECK (char_length(username) >= 2 AND char_length(username) <= 32),
    CONSTRAINT username_valid CHECK (username ~* '^[a-zA-Z0-9_-]+$')
);

-- Index for fast lookup by username
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles (LOWER(username));

-- 3. Social Links Table
CREATE TABLE IF NOT EXISTS public.social_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    platform TEXT NOT NULL,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    icon TEXT,
    copy_on_click BOOLEAN DEFAULT FALSE,
    clicks INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_social_links_profile ON public.social_links(profile_id, sort_order ASC);

-- 4. Badges Table
CREATE TABLE IF NOT EXISTS public.badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    icon TEXT NOT NULL,
    description TEXT NOT NULL,
    color TEXT DEFAULT '#a855f7',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_badges_profile ON public.badges(profile_id);

-- 5. Profile Views (Analytics)
CREATE TABLE IF NOT EXISTS public.profile_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    visitor_hash TEXT NOT NULL,
    referrer TEXT,
    user_agent TEXT,
    viewed_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_profile_views_profile_hash ON public.profile_views(profile_id, visitor_hash);
CREATE INDEX IF NOT EXISTS idx_profile_views_date ON public.profile_views(profile_id, viewed_at DESC);

-- ==============================================================================
-- ROW-LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_views ENABLE ROW LEVEL SECURITY;

-- Profiles:
-- 1) Anyone can read public profiles
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

-- 2) Authenticated users can insert their own profile
CREATE POLICY "Users can create their own profile" 
ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- 3) Authenticated users can update their own profile
CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Social Links:
-- 1) Anyone can read social links
CREATE POLICY "Social links are viewable by everyone" 
ON public.social_links FOR SELECT USING (true);

-- 2) Owners can insert/update/delete their social links
CREATE POLICY "Users can insert their own social links" 
ON public.social_links FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = profile_id AND profiles.id = auth.uid())
);

CREATE POLICY "Users can update their own social links" 
ON public.social_links FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = profile_id AND profiles.id = auth.uid())
);

CREATE POLICY "Users can delete their own social links" 
ON public.social_links FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = profile_id AND profiles.id = auth.uid())
);

-- Badges:
CREATE POLICY "Badges are viewable by everyone" 
ON public.badges FOR SELECT USING (true);

CREATE POLICY "Users can manage their badges" 
ON public.badges FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = profile_id AND profiles.id = auth.uid())
);

-- Profile Views:
-- 1) Only profile owners can view their analytics
CREATE POLICY "Users can view analytics for their own profile" 
ON public.profile_views FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = profile_id AND profiles.id = auth.uid())
);

-- ==============================================================================
-- STORED PROCEDURES & RPC FUNCTIONS
-- ==============================================================================

-- Function: Atomic profile view increment with unique visitor detection
CREATE OR REPLACE FUNCTION public.record_profile_view(
    p_username TEXT,
    p_visitor_hash TEXT,
    p_referrer TEXT DEFAULT NULL,
    p_user_agent TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_profile_id UUID;
    v_is_unique BOOLEAN := FALSE;
    v_views_count BIGINT;
    v_unique_count BIGINT;
BEGIN
    SELECT id INTO v_profile_id FROM public.profiles WHERE LOWER(username) = LOWER(p_username);
    IF v_profile_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'Profile not found');
    END IF;

    -- Check if visitor is unique in the last 24 hours
    IF NOT EXISTS (
        SELECT 1 FROM public.profile_views 
        WHERE profile_id = v_profile_id 
          AND visitor_hash = p_visitor_hash 
          AND viewed_at > (NOW() - INTERVAL '24 hours')
    ) THEN
        v_is_unique := TRUE;
    END IF;

    -- Insert view record
    INSERT INTO public.profile_views (profile_id, visitor_hash, referrer, user_agent, viewed_at)
    VALUES (v_profile_id, p_visitor_hash, p_referrer, p_user_agent, NOW());

    -- Update counters
    UPDATE public.profiles
    SET views_count = views_count + 1,
        unique_visitors_count = CASE WHEN v_is_unique THEN unique_visitors_count + 1 ELSE unique_visitors_count END,
        updated_at = NOW()
    WHERE id = v_profile_id
    RETURNING views_count, unique_visitors_count INTO v_views_count, v_unique_count;

    RETURN jsonb_build_object(
        'success', true,
        'views_count', v_views_count,
        'unique_visitors_count', v_unique_count,
        'is_unique', v_is_unique
    );
END;
$$;

-- Function: Atomic social link click increment
CREATE OR REPLACE FUNCTION public.record_link_click(p_link_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.social_links
    SET clicks = clicks + 1
    WHERE id = p_link_id;
END;
$$;

-- Trigger: Auto-create profile upon auth.users signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_username TEXT;
    v_display_name TEXT;
    v_avatar_url TEXT;
BEGIN
    -- Extract username from raw_user_meta_data or email
    v_username := COALESCE(
        NEW.raw_user_meta_data->>'user_name',
        NEW.raw_user_meta_data->>'preferred_username',
        SPLIT_PART(NEW.email, '@', 1)
    );
    -- Sanitize username
    v_username := REGEXP_REPLACE(LOWER(v_username), '[^a-z0-9_-]', '', 'g');
    IF char_length(v_username) < 2 THEN
        v_username := 'user_' || SUBSTRING(NEW.id::text FROM 1 FOR 6);
    END IF;

    -- Handle potential duplicate username by appending random hex
    IF EXISTS (SELECT 1 FROM public.profiles WHERE username = v_username) THEN
        v_username := v_username || '_' || SUBSTRING(NEW.id::text FROM 1 FOR 4);
    END IF;

    v_display_name := COALESCE(
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'name',
        v_username
    );

    v_avatar_url := COALESCE(
        NEW.raw_user_meta_data->>'avatar_url',
        'https://api.dicebear.com/7.x/bottts/svg?seed=' || v_username
    );

    INSERT INTO public.profiles (id, username, display_name, avatar_url)
    VALUES (NEW.id, v_username, v_display_name, v_avatar_url);

    -- Insert default early badge
    INSERT INTO public.badges (profile_id, name, icon, description, color)
    VALUES (NEW.id, 'Early Supporter', 'Sparkles', 'Founding member of Facely', '#a855f7');

    RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
