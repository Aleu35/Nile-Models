-- Remove the digital_profile_url column from the models table
ALTER TABLE public.models DROP COLUMN IF EXISTS digital_profile_url;

-- Add new columns to the applications table
ALTER TABLE applications
  ADD COLUMN eyes text,
  ADD COLUMN ethnicity text,
  ADD COLUMN instagram text,
  ADD COLUMN tiktok text,
  ADD COLUMN facebook text,
  ADD COLUMN twitter text,
  DROP COLUMN weight;
