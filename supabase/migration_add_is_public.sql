-- Add is_public column to letters table
alter table public.letters 
add column if not exists is_public boolean default false;
