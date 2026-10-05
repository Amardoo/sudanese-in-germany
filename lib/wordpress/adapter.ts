import 'server-only';
// Read-only seam. Not connected to the phase-one content repository.
export interface WordPressPost {
  id: number;
  slug: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  categories: number[];
  modified: string;
}
export function createWordPressAdapter(apiUrl: string) {
  const base = new URL(apiUrl);
  if (!['https:', 'http:'].includes(base.protocol)) throw new Error('Invalid WordPress API URL');
  return {
    async listPosts(page = 1): Promise<WordPressPost[]> {
      if (!Number.isInteger(page) || page < 1) throw new Error('Invalid page');
      const url = new URL(`${base.href.replace(/\/$/, '')}/posts`);
      url.searchParams.set('page', String(page));
      url.searchParams.set('per_page', '20');
      url.searchParams.set('_fields', 'id,slug,link,title,excerpt,content,categories,modified');
      const response = await fetch(url, {
        signal: AbortSignal.timeout(10000),
        next: { revalidate: 300 },
      });
      if (!response.ok) throw new Error(`WordPress request failed: ${response.status}`);
      const posts: unknown = await response.json();
      if (
        !Array.isArray(posts) ||
        !posts.every(
          (p) =>
            p &&
            typeof p.id === 'number' &&
            typeof p.slug === 'string' &&
            typeof p.title?.rendered === 'string' &&
            typeof p.content?.rendered === 'string' &&
            typeof p.excerpt?.rendered === 'string' &&
            typeof p.link === 'string' &&
            typeof p.modified === 'string' &&
            Array.isArray(p.categories) &&
            p.categories.every((id: unknown) => typeof id === 'number'),
        )
      )
        throw new Error('Unexpected WordPress response');
      return posts as WordPressPost[];
    },
  };
}
