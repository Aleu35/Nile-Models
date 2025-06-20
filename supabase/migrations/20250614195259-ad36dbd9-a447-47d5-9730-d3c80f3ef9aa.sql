
-- Create models table
CREATE TABLE public.models (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('men', 'women', 'new_faces', 'talent')),
  bio TEXT,
  height INTEGER,
  measurements TEXT,
  experience_level TEXT,
  profile_image_url TEXT,
  portfolio_images TEXT[],
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create news_articles table
CREATE TABLE public.news_articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  author TEXT NOT NULL,
  views INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create applications table
CREATE TABLE public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  age INTEGER,
  height INTEGER,
  weight INTEGER,
  measurements TEXT,
  experience TEXT,
  portfolio_urls TEXT[],
  additional_info TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create site_settings table
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  agency_name TEXT NOT NULL DEFAULT 'Your Agency',
  tagline TEXT NOT NULL DEFAULT 'Your Tagline',
  background_video_url TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  social_instagram TEXT,
  social_facebook TEXT,
  social_twitter TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default site settings
INSERT INTO public.site_settings (agency_name, tagline) 
VALUES ('NILES MODELS', 'Elevating Beauty, Defining Excellence');

-- Insert some sample data
INSERT INTO public.models (name, category, bio, height, is_featured) VALUES
('Sarah Johnson', 'women', 'Professional model with 5 years experience', 175, true),
('Marcus Chen', 'men', 'Fashion and commercial model', 185, true),
('Emma Rodriguez', 'new_faces', 'Rising talent in the industry', 168, false);

INSERT INTO public.news_articles (title, excerpt, author, is_published) VALUES
('Fashion Week Highlights', 'Our models shine at the latest fashion week events', 'Agency Team', true),
('New Talent Spotlight', 'Meet our latest signed models making waves', 'Agency Team', true),
('Industry Trends 2024', 'What to expect in modeling this year', 'Agency Team', true);
