-- Create announcements table for admin broadcast notifications
create table if not exists public.announcements (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  body        text not null,
  cta_label   text,
  cta_url     text,
  emoji       text,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Enable RLS
alter table public.announcements enable row level security;

-- Authenticated users can read active announcements
create policy "Authenticated users can read announcements"
  on public.announcements
  for select
  to authenticated
  using (is_active = true);

-- Only service role can write (admin uses service role client)
-- No additional insert/update/delete policy needed for anon/authenticated
