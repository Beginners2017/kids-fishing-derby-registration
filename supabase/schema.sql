create extension if not exists "pgcrypto";

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  parent_full_name text not null,
  child_full_name text not null,
  child_age integer not null check (child_age between 1 and 17),
  phone text not null,
  email text not null,
  emergency_contact_name text not null,
  emergency_contact_phone text not null,
  notes text,
  waiver_accepted boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists registrations_created_at_idx
  on public.registrations (created_at desc);

create index if not exists registrations_parent_child_search_idx
  on public.registrations using gin (
    to_tsvector('english', coalesce(parent_full_name, '') || ' ' || coalesce(child_full_name, ''))
  );

alter table public.registrations enable row level security;

revoke all on public.registrations from anon, authenticated;

comment on table public.registrations is
  'Registration records for the Beginners Luck Tackle and Supply Kids Fishing Derby.';
