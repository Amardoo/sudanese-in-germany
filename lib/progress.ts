import { journeys } from '../data/journeys/index.ts';
import type { ProgressState } from './types';
export const STORAGE_KEY = 'sig:journey:v1';
export function emptyProgress(): ProgressState {
  return { version: 1, selected: journeys[0].id, completed: {} };
}
export function parseProgress(raw: string | null): ProgressState {
  try {
    const value = JSON.parse(raw ?? 'null');
    if (
      !value ||
      value.version !== 1 ||
      typeof value.completed !== 'object' ||
      value.completed === null
    )
      return emptyProgress();
    const completed: Record<string, string[]> = {};
    for (const j of journeys) {
      const ids = value.completed[j.id];
      completed[j.id] = Array.isArray(ids)
        ? [
            ...new Set(
              ids.filter(
                (id: unknown): id is string =>
                  typeof id === 'string' && j.steps.some((s) => s.id === id),
              ),
            ),
          ]
        : [];
    }
    return {
      version: 1,
      selected: journeys.some((j) => j.id === value.selected) ? value.selected : journeys[0].id,
      completed,
    };
  } catch {
    return emptyProgress();
  }
}
export function toggleStep(state: ProgressState, path: string, step: string): ProgressState {
  if (!journeys.some((j) => j.id === path && j.steps.some((s) => s.id === step))) return state;
  const previous = state.completed[path] ?? [];
  return {
    ...state,
    completed: {
      ...state.completed,
      [path]: previous.includes(step) ? previous.filter((id) => id !== step) : [...previous, step],
    },
  };
}
