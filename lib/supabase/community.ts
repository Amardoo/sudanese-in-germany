'use client';
import { getSupabase } from './client';
import { createDiscussion } from '@/lib/community/local';
import type { Discussion } from '@/lib/community/types';
type Row = {
  id: string;
  user_id: string;
  title: string;
  body: string;
  community: string;
  kind: string;
  created_at: string;
  author: { display_name: string } | null;
  community_replies: {
    id: string;
    user_id: string;
    body: string;
    created_at: string;
    author: { display_name: string } | null;
  }[];
  community_likes: { user_id: string }[];
};
export async function listSharedDiscussions(userId: string, limit = 30): Promise<Discussion[]> {
  const { data, error } = await getSupabase()
    .from('community_posts')
    .select(
      'id,user_id,title,body,community,kind,created_at,author:community_members!community_posts_user_id_fkey(display_name),community_replies(id,user_id,body,created_at,author:community_members!community_replies_user_id_fkey(display_name)),community_likes(user_id)',
    )
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data as unknown as Row[]).map((p) => ({
    id: p.id,
    title: p.title,
    body: p.body,
    community: p.community,
    kind: p.kind,
    createdAt: p.created_at,
    author: p.author?.display_name ?? 'عضو',
    mine: p.user_id === userId,
    liked: p.community_likes.some((l) => l.user_id === userId),
    likes: p.community_likes.length,
    replies: p.community_replies
      .sort((a, b) => a.created_at.localeCompare(b.created_at))
      .map((r) => ({
        id: r.id,
        body: r.body,
        createdAt: r.created_at,
        author: r.author?.display_name ?? 'عضو',
        mine: r.user_id === userId,
      })),
  }));
}
export async function publishDiscussion(
  input: { title: string; body: string; community: string; kind: string },
  userId: string,
) {
  const p = createDiscussion(input);
  const { error } = await getSupabase().from('community_posts').insert({
    id: p.id,
    user_id: userId,
    title: p.title,
    body: p.body,
    community: p.community,
    kind: p.kind,
  });
  if (error) throw error;
}
export async function changeSharedDiscussion(
  before: Discussion,
  after: Discussion,
  userId: string,
) {
  const client = getSupabase();
  if (before.liked !== after.liked) {
    const result = after.liked
      ? await client.from('community_likes').insert({ post_id: before.id, user_id: userId })
      : await client
          .from('community_likes')
          .delete()
          .eq('post_id', before.id)
          .eq('user_id', userId);
    if (result.error) throw result.error;
    return;
  }
  const added = after.replies.find((r) => !before.replies.some((b) => b.id === r.id));
  if (added) {
    if (!added.body.trim() || added.body.length > 2000) throw new Error('Invalid reply');
    const { error } = await client
      .from('community_replies')
      .insert({ id: added.id, post_id: before.id, user_id: userId, body: added.body.trim() });
    if (error) throw error;
    return;
  }
  const removed = before.replies.find((r) => !after.replies.some((a) => a.id === r.id));
  if (removed) {
    const { error } = await client
      .from('community_replies')
      .delete()
      .eq('id', removed.id)
      .eq('user_id', userId);
    if (error) throw error;
  }
}
export async function deleteSharedDiscussion(id: string, userId: string) {
  const { error } = await getSupabase()
    .from('community_posts')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);
  if (error) throw error;
}
