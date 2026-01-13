-- Make mailbox_id nullable to allow general letters sent via email only
alter table public.letters 
alter column mailbox_id drop not null;
