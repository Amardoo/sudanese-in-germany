import { emptyProgress, parseProgress, STORAGE_KEY } from './progress';
import type { ProgressRepository } from './types';
export const localProgressRepository: ProgressRepository = {
  async load() {
    if (typeof window === 'undefined') return emptyProgress();
    return parseProgress(window.localStorage.getItem(STORAGE_KEY));
  },
  async save(state) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  },
};
