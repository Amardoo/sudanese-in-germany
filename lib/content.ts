import { guides } from '@/data/guides';
import type { ContentRepository } from './types';
export const contentRepository: ContentRepository = {
  async listGuides() {
    return guides;
  },
  async getGuide(slug) {
    return guides.find((g) => g.slug === slug);
  },
};
