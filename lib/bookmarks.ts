'use client';
import { useSyncExternalStore } from 'react';
const KEY = 'sig:bookmarks:v1';
const EVENT = 'sig-bookmarks-changed';
function snapshot() {
  try {
    return localStorage.getItem(KEY) ?? '[]';
  } catch {
    return '[]';
  }
}
function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(EVENT, callback);
  };
}
export function useBookmarks() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => '[]');
  let ids: string[] = [];
  try {
    const value = JSON.parse(raw);
    if (Array.isArray(value))
      ids = value.filter((id: unknown): id is string => typeof id === 'string');
  } catch {
    /* Recover malformed storage. */
  }
  return {
    ids,
    toggle(id: string) {
      const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
      localStorage.setItem(KEY, JSON.stringify(next));
      window.dispatchEvent(new Event(EVENT));
    },
  };
}
