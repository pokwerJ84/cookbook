-- Japan Protein Cookbook: per-user cloud state
create table if not exists public.cookbook_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  custom_recipes jsonb not null default '[]'::jsonb,
  favorites jsonb not null default '[]'::jsonb,
  photos jsonb not null default '{}'::jsonb,
  language text not null default 'cs' check (language in ('cs','en','ja')),
  updated_at timestamptz not null default now()
);

alter table public.cookbook_state enable row level security;

drop policy if exists "Users can read own cookbook" on public.cookbook_state;
create policy "Users can read own cookbook"
on public.cookbook_state for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert own cookbook" on public.cookbook_state;
create policy "Users can insert own cookbook"
on public.cookbook_state for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update own cookbook" on public.cookbook_state;
create policy "Users can update own cookbook"
on public.cookbook_state for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own cookbook" on public.cookbook_state;
create policy "Users can delete own cookbook"
on public.cookbook_state for delete
to authenticated
using ((select auth.uid()) = user_id);
