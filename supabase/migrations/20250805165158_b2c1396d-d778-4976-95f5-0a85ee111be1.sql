-- Update users to admin role
UPDATE profiles 
SET role = 'admin' 
WHERE email IN ('celetronica834@gmail.com', 'lucassanzonowicz@icloud.com');