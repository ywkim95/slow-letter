-- Add new columns to letters table
alter table public.letters 
add column if not exists sender_email text,
add column if not exists open_date timestamptz;

-- Update RLS if needed (Public check still likely true for insert)
