-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users Table (Linked to auth.users)
create table if not exists public.users (
  id uuid references auth.users(id) on delete cascade not null primary key,
  display_name text,
  kakao_user_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Mailboxes Table
create table if not exists public.mailboxes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null unique,
  aka text not null unique check (length(aka) <= 20),
  notification_email text,
  email_notification_enabled boolean default false,
  last_notified_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint email_enabled_requires_email check (
    (email_notification_enabled = false) or (notification_email is not null and length(notification_email) > 3)
  )
);

-- Letters Table
create table if not exists public.letters (
  id uuid default uuid_generate_v4() primary key,
  mailbox_id uuid references public.mailboxes(id) on delete cascade not null,
  sender_name text not null,
  title text,
  content text not null check (length(content) >= 1),
  created_at timestamptz default now(),
  read_at timestamptz
);

-- Indexes
create index if not exists idx_letters_mailbox_created_at on public.letters (mailbox_id, created_at desc);

-- RLS
alter table public.users enable row level security;
alter table public.mailboxes enable row level security;
alter table public.letters enable row level security;

-- Policies

-- Users
create policy "Users can view own profile" on public.users
  for select using (auth.uid() = id);

create policy "Users can insert own profile" on public.users
  for insert with check (auth.uid() = id);

create policy "Users can update own profile" on public.users
  for update using (auth.uid() = id);

-- Mailboxes
create policy "Public can view mailboxes" on public.mailboxes
  for select using (true);

create policy "Users can insert own mailbox" on public.mailboxes
  for insert with check (auth.uid() = user_id);

create policy "Users can update own mailbox" on public.mailboxes
  for update using (auth.uid() = user_id);

-- Letters
create policy "Public can write letters" on public.letters
  for insert with check (true);

create policy "Owner can view their mailbox letters" on public.letters
  for select using (
    auth.uid() = (select user_id from public.mailboxes where id = mailbox_id)
  );

create policy "Owner can update letters" on public.letters
  for update using (
    auth.uid() = (select user_id from public.mailboxes where id = mailbox_id)
  );
