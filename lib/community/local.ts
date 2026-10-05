import { communities, postKinds } from '../../config/community.ts';
import { sampleDiscussions } from '../../data/discussionss.ts';
import type { CommunityRepository, CommunityState, Discussion, Reply } from './types';
export const COMMUNITY_KEY = 'sig:community:v1';
const validText = (value: unknown, max: number): value is string =>
  typeof value === 'string' && value.trim().length > 0 && value.length <= max;
const validDate = (value: unknown): value is string =>
  typeof value === 'string' && Number.isFinite(Date.parse(value));
function isReply(value: unknown): value is Reply {
  if (!value || typeof value !== 'object') return false;
  const r = value as Reply;
  return validText(r.id, 100) && validText(r.body, 2000) && validDate(r.createdAt);
}
function isPost(value: unknown): value is Discussion {
  if (!value || typeof value !== 'object') return false;
  const p = value as Discussion;
  return (
    validText(p.id, 100) &&
    validText(p.title, 140) &&
    validText(p.body, 5000) &&
    validDate(p.createdAt) &&
    communities.some((c) => c.id === p.community) &&
    postKinds.some((k) => k.id === p.kind) &&
    typeof p.liked === 'boolean' &&
    Array.isArray(p.replies) &&
    p.replies.every(isReply) &&
    (p.sample === undefined || typeof p.sample === 'boolean')
  );
}
export function initialCommunity(): CommunityState {
  return { version: 1, posts: structuredClone(sampleDiscussions) };
}
export function parseCommunity(raw: string | null): CommunityState {
  try {
    const value = JSON.parse(raw ?? 'null');
    if (value?.version !== 1 || !Array.isArray(value.posts)) return initialCommunity();
    const seen = new Set<string>();
    const savedPosts = value.posts.filter(isPost).filter((p: Discussion) => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    });
    const missingCuratedPosts = sampleDiscussions.filter((p) => !seen.has(p.id));
    return {
      version: 1,
      posts: [...savedPosts, ...missingCuratedPosts].sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt),
      ),
    };
  } catch {
    return initialCommunity();
  }
}
export function createDiscussion(input: {
  title: string;
  body: string;
  community: string;
  kind: string;
}): Discussion {
  const p: Discussion = {
    ...input,
    title: input.title.trim(),
    body: input.body.trim(),
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    replies: [],
    liked: false,
  };
  if (!isPost(p)) throw new Error('راجع عنوان الموضوع ونصه والتصنيف.');
  return p;
}
export const localCommunityRepository: CommunityRepository = {
  async load() {
    return parseCommunity(window.localStorage.getItem(COMMUNITY_KEY));
  },
  async save(state) {
    window.localStorage.setItem(COMMUNITY_KEY, JSON.stringify(state));
  },
};
