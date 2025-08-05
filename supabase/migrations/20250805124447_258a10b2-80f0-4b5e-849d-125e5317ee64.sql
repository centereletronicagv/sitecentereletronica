-- Fix security definer functions with proper search_path
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = is_admin.user_id 
    AND role = 'admin'
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- Fix handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, role)
  VALUES (NEW.id, NEW.email, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Fix update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;