
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type NewsArticle = {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image_url?: string;
  author: string;
  views: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export const useNews = () => {
  return useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) {
        console.error('Error fetching news:', error);
        throw error;
      }
      
      return data as NewsArticle[];
    },
  });
};
