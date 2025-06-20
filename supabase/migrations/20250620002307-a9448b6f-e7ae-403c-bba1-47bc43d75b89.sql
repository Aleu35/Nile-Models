
-- Remove the digital_profile_url column from the models table
ALTER TABLE public.models DROP COLUMN IF EXISTS digital_profile_url;
