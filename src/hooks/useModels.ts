
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type Model = {
  id: string;
  name: string;
  category: 'men' | 'women' | 'new_faces' | 'talent';
  bio?: string;
  height?: number;
  measurements?: string;
  experience_level?: string;
  profile_image_url?: string;
  portfolio_images?: string[];
  is_featured: boolean;
  social_instagram?: string;
  social_facebook?: string;
  social_twitter?: string;
  social_tiktok?: string;
  created_at: string;
  updated_at: string;
};

export const useModels = (category?: string) => {
  return useQuery({
    queryKey: ['models', category],
    queryFn: async () => {
      let query = supabase.from('models').select('*');
      
      if (category) {
        query = query.eq('category', category);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching models:', error);
        throw error;
      }
      
      return data as Model[];
    },
  });
};

export const useFeaturedModels = () => {
  return useQuery({
    queryKey: ['models', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('models')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching featured models:', error);
        throw error;
      }
      
      return data as Model[];
    },
  });
};
