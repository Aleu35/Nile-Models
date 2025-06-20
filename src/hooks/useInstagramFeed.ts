
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type InstagramPost = {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  permalink: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
};

export const useInstagramFeed = () => {
  return useQuery({
    queryKey: ['instagram-feed'],
    queryFn: async () => {
      console.log('Fetching Instagram feed...');
      
      const { data, error } = await supabase.functions.invoke('instagram-feed', {
        method: 'GET',
      });
      
      if (error) {
        console.error('Error fetching Instagram feed:', error);
        throw error;
      }
      
      console.log('Instagram feed data:', data);
      return data?.posts as InstagramPost[];
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });
};
