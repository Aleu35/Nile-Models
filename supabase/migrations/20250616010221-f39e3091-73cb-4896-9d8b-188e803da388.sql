
-- Enable RLS on all main tables that currently don't have it
ALTER TABLE public.models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- RLS policies for models table (admin-only management)
CREATE POLICY "Anyone can view published models" 
  ON public.models 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admins can insert models" 
  ON public.models 
  FOR INSERT 
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update models" 
  ON public.models 
  FOR UPDATE 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete models" 
  ON public.models 
  FOR DELETE 
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS policies for news_articles (admin-only management, public read for published)
CREATE POLICY "Anyone can view published news" 
  ON public.news_articles 
  FOR SELECT 
  USING (is_published = true);

CREATE POLICY "Admins can view all news" 
  ON public.news_articles 
  FOR SELECT 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert news" 
  ON public.news_articles 
  FOR INSERT 
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update news" 
  ON public.news_articles 
  FOR UPDATE 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete news" 
  ON public.news_articles 
  FOR DELETE 
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS policies for applications (admins can read/write, applicants can only create)
CREATE POLICY "Admins can view all applications" 
  ON public.applications 
  FOR SELECT 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update applications" 
  ON public.applications 
  FOR UPDATE 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete applications" 
  ON public.applications 
  FOR DELETE 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can submit applications" 
  ON public.applications 
  FOR INSERT 
  WITH CHECK (true);

-- RLS policies for site_settings (admin-only write, public read)
CREATE POLICY "Anyone can view site settings" 
  ON public.site_settings 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admins can insert site settings" 
  ON public.site_settings 
  FOR INSERT 
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update site settings" 
  ON public.site_settings 
  FOR UPDATE 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete site settings" 
  ON public.site_settings 
  FOR DELETE 
  USING (public.has_role(auth.uid(), 'admin'));

-- Add audit logging table for security monitoring
CREATE TABLE public.audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id TEXT,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on audit logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view audit logs" 
  ON public.audit_logs 
  FOR SELECT 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "System can insert audit logs" 
  ON public.audit_logs 
  FOR INSERT 
  WITH CHECK (true);

-- Create function to log audit events
CREATE OR REPLACE FUNCTION public.log_audit_event(
  p_action TEXT,
  p_table_name TEXT,
  p_record_id TEXT DEFAULT NULL,
  p_old_values JSONB DEFAULT NULL,
  p_new_values JSONB DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.audit_logs (
    user_id,
    action,
    table_name,
    record_id,
    old_values,
    new_values
  ) VALUES (
    auth.uid(),
    p_action,
    p_table_name,
    p_record_id,
    p_old_values,
    p_new_values
  );
END;
$$;
