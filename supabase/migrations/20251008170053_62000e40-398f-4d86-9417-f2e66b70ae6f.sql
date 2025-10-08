-- Create activity_logs table for tracking changes
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('create', 'update', 'delete')),
  entity_type TEXT NOT NULL CHECK (entity_type IN ('product', 'category', 'user')),
  entity_id UUID NOT NULL,
  entity_name TEXT,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to view all logs
CREATE POLICY "Admins can view all logs"
  ON public.activity_logs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create policy for admins to insert logs
CREATE POLICY "Admins can insert logs"
  ON public.activity_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create index for faster queries
CREATE INDEX idx_activity_logs_created_at ON public.activity_logs(created_at DESC);
CREATE INDEX idx_activity_logs_entity ON public.activity_logs(entity_type, entity_id);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.activity_logs;

-- Create user_analytics table for tracking user behavior
CREATE TABLE IF NOT EXISTS public.user_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  category TEXT,
  product TEXT,
  region TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_analytics ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to view analytics
CREATE POLICY "Admins can view all analytics"
  ON public.user_analytics
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create policy for anyone to insert analytics (for tracking)
CREATE POLICY "Anyone can insert analytics"
  ON public.user_analytics
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create indexes for analytics queries
CREATE INDEX idx_user_analytics_created_at ON public.user_analytics(created_at DESC);
CREATE INDEX idx_user_analytics_category ON public.user_analytics(category) WHERE category IS NOT NULL;
CREATE INDEX idx_user_analytics_product ON public.user_analytics(product) WHERE product IS NOT NULL;
CREATE INDEX idx_user_analytics_region ON public.user_analytics(region) WHERE region IS NOT NULL;

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_analytics;