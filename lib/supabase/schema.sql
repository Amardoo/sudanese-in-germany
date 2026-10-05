-- Phase-two reference only. Review and run on a separate Supabase project.
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  selected_path text not null default 'student'
);
create table public.journey_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  path_id text not null,
  step_id text not null,
  primary key (user_id,path_id,step_id)
);
alter table public.profiles enable row level security;
alter table public.journey_progress enable row level security;
create policy "Owner manages profile" on public.profiles for all to authenticated
  using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
create policy "Owner manages steps" on public.journey_progress for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
revoke all on public.profiles, public.journey_progress from anon;
grant select,insert,update,delete on public.profiles,public.journey_progress to authenticated;
