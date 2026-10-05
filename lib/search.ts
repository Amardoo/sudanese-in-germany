import type { Guide } from './types';
export function normalize(text: string) {
  return text
    .normalize('NFKD')
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .toLowerCase()
    .trim();
}
export function searchGuides(guides: Guide[], query: string, category = 'all') {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  const results = guides.filter(
    (g) =>
      (category === 'all' || g.category === category || g.categories?.includes(category)) &&
      words.every((word) =>
        normalize(
          [g.title, g.description, ...g.sections.map((s) => s.title + ' ' + s.body)].join(' '),
        ).includes(word),
      ),
  );

  if (category === 'all') {
    return results;
  }

  return [...results].sort((a, b) => {
    const aRank = a.category === category ? 0 : 1;
    const bRank = b.category === category ? 0 : 1;
    return aRank - bRank;
  });
}
