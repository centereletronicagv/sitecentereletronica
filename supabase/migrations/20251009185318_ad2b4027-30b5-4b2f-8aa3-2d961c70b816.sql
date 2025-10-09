-- Add display_order column to products table
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Create index for better performance when ordering
CREATE INDEX IF NOT EXISTS idx_products_display_order ON public.products(display_order);

-- Add ip_address column to activity_logs for tracking
ALTER TABLE public.activity_logs
ADD COLUMN IF NOT EXISTS ip_address TEXT;