
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type Application = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  age?: number;
  height?: number;
  weight?: number;
  measurements?: string;
  experience?: string;
  portfolio_urls?: string[];
  additional_info?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
};

export const useApplications = () => {
  return useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching applications:', error);
        throw error;
      }
      
      return data as Application[];
    },
  });
};
