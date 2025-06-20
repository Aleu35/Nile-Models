
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type SiteSettings = {
  id: string;
  agency_name: string;
  tagline: string;
  background_video_url?: string;
  contact_email?: string;
  contact_phone?: string;
  social_instagram?: string;
  social_facebook?: string;
  social_twitter?: string;
  updated_at: string;
};

export const useSiteSettings = () => {
  return useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();
      
      if (error) {
        console.error('Error fetching site settings:', error);
        throw error;
      }
      
      return data as SiteSettings;
    },
  });
};
