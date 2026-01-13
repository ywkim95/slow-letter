-- Add receiver_email column to letters table
alter table public.letters 
add column if not exists receiver_email text;
