-- Japan Protein Cookbook: database state + private image storage

create table if not exists public.cookbook_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  custom_recipes jsonb not null default '[]'::jsonb,
  favorites jsonb not null default '[]'::jsonb,
  -- Stores only Storage paths, for example:
  -- {"101":{"path":"USER_UUID/101-123456789.jpg"}}
  photos jsonb not null default '{}'::jsonb,
  language text not null default 'cs' check (language in ('cs','en','ja')),
  updated_at timestamptz not null default now()
);

comment on column public.cookbook_state.custom_recipes is
  'Stores user-created recipes and v12 edits/overrides of built-in recipes.';

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

-- Private Storage bucket for recipe images.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'recipe-images',
  'recipe-images',
  false,
  5242880,
  array['image/jpeg','image/png','image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Each authenticated user may access only files inside their own UUID folder.
drop policy if exists "Users can view own recipe images" on storage.objects;
create policy "Users can view own recipe images"
on storage.objects for select
to authenticated
using (
  bucket_id = 'recipe-images'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);

drop policy if exists "Users can upload own recipe images" on storage.objects;
create policy "Users can upload own recipe images"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'recipe-images'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);

drop policy if exists "Users can update own recipe images" on storage.objects;
create policy "Users can update own recipe images"
on storage.objects for update
to authenticated
using (
  bucket_id = 'recipe-images'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
)
with check (
  bucket_id = 'recipe-images'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);

drop policy if exists "Users can delete own recipe images" on storage.objects;
create policy "Users can delete own recipe images"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'recipe-images'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);
