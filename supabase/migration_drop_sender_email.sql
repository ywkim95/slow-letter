-- Remove sender_email column from letters table
alter table public.letters 
drop column if exists sender_email;
