-- Apply once using the Supabase SQL editor on your new/staging project.
-- Independent of the optional phase-one journey schema.
begin;
create table public.community_members (
 id uuid primary key references auth.users(id) on delete cascade,
 display_name text not null default 'عضو' check (char_length(trim(display_name)) between 2 and 60)
);
create table public.community_posts (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references public.community_members(id) on delete cascade,
 title text not null check (char_length(trim(title)) between 1 and 140),
 body text not null check (char_length(trim(body)) between 1 and 5000),
 community text not null check (community in ('students','doctors','careers','daily-life')),
 kind text not null check (kind in ('question','experience','tip','discussion')),
 created_at timestamptz not null default now()
);
create table public.community_replies (
 id uuid primary key default gen_random_uuid(),
 post_id uuid not null references public.community_posts(id) on delete cascade,
 user_id uuid not null references public.community_members(id) on delete cascade,
 body text not null check (char_length(trim(body)) between 1 and 2000),
 created_at timestamptz not null default now()
);
create table public.community_likes (
 post_id uuid not null references public.community_posts(id) on delete cascade,
 user_id uuid not null references public.community_members(id) on delete cascade,
 primary key(post_id,user_id)
);
create index community_posts_created_idx on public.community_posts(created_at desc);
create index community_posts_user_idx on public.community_posts(user_id);
create index community_replies_post_idx on public.community_replies(post_id);
create index community_replies_user_idx on public.community_replies(user_id);
create index community_likes_user_idx on public.community_likes(user_id);
create function public.add_community_member() returns trigger language plpgsql security definer set search_path = '' as $$
begin insert into public.community_members(id) values(new.id); return new; end;
$$;
revoke all on function public.add_community_member() from public;
create trigger new_community_member after insert on auth.users for each row execute procedure public.add_community_member();
insert into public.community_members(id) select id from auth.users on conflict do nothing;
alter table public.community_members enable row level security;
alter table public.community_posts enable row level security;
alter table public.community_replies enable row level security;
alter table public.community_likes enable row level security;
revoke all on public.community_members,public.community_posts,public.community_replies,public.community_likes from anon,authenticated;
grant select on public.community_members,public.community_posts,public.community_replies,public.community_likes to authenticated;
grant insert(id,display_name),update(display_name) on public.community_members to authenticated;
grant insert(id,user_id,title,body,community,kind),delete on public.community_posts to authenticated;
grant insert(id,post_id,user_id,body),delete on public.community_replies to authenticated;
grant insert,delete on public.community_likes to authenticated;
create policy members_read on public.community_members for select to authenticated using(true);
create policy member_insert on public.community_members for insert to authenticated with check((select auth.uid())=id);
create policy member_update on public.community_members for update to authenticated using((select auth.uid())=id) with check((select auth.uid())=id);
create policy posts_read on public.community_posts for select to authenticated using(true);
create policy posts_insert on public.community_posts for insert to authenticated with check((select auth.uid())=user_id);
create policy posts_delete on public.community_posts for delete to authenticated using((select auth.uid())=user_id);
create policy replies_read on public.community_replies for select to authenticated using(true);
create policy replies_insert on public.community_replies for insert to authenticated with check((select auth.uid())=user_id);
create policy replies_delete on public.community_replies for delete to authenticated using((select auth.uid())=user_id);
create policy likes_read on public.community_likes for select to authenticated using(true);
create policy likes_insert on public.community_likes for insert to authenticated with check((select auth.uid())=user_id);
create policy likes_delete on public.community_likes for delete to authenticated using((select auth.uid())=user_id);
commit;
