
-- Add social media URL columns to the models table
ALTER TABLE public.models 
ADD COLUMN social_instagram TEXT,
ADD COLUMN social_facebook TEXT,
ADD COLUMN social_twitter TEXT,
ADD COLUMN social_tiktok TEXT;
