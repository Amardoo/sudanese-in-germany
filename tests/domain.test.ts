import { test } from 'node:test';
import assert from 'node:assert/strict';
import { journeys } from '../data/journeys/index.ts';
import { guides } from '../data/guides.ts';
import { categories } from '../config/categories.ts';
import { emptyProgress, parseProgress, toggleStep } from '../lib/progress.ts';
import { searchGuides } from '../lib/search.ts';
test('all journey steps and guides reference existing data', () => {
  assert.equal(new Set(journeys.map((j) => j.id)).size, journeys.length);
  assert.equal(new Set(guides.map((g) => g.slug)).size, guides.length);
  for (const j of journeys) {
    assert.ok(j.steps.length);
    assert.equal(new Set(j.steps.map((s) => s.id)).size, j.steps.length);
    for (const s of j.steps) assert.ok(guides.some((g) => g.slug === s.guide));
  }
  for (const g of guides) assert.ok(categories.some((c) => c.id === g.category));
});
test('completion is reversible and isolated by path', () => {
  const a = toggleStep(emptyProgress(), 'student', 'choose');
  const b = toggleStep(a, 'doctor', 'authority');
  assert.deepEqual(b.completed.student, ['choose']);
  assert.deepEqual(toggleStep(b, 'student', 'choose').completed.student, []);
  assert.deepEqual(b.completed.doctor, ['authority']);
  assert.deepEqual(toggleStep(b, 'student', 'nonexistent'), b);
});
test('storage recovers from malformed and stale values', () => {
  assert.deepEqual(parseProgress('{bad'), emptyProgress());
  assert.deepEqual(parseProgress('{"version":8}'), emptyProgress());
  const p = parseProgress(
    JSON.stringify({
      version: 1,
      selected: 'missing',
      completed: { student: ['choose', 'choose', 'removed', 42] },
    }),
  );
  assert.equal(p.selected, 'student');
  assert.deepEqual(p.completed.student, ['choose']);
});
test('search handles Arabic diacritics and category combinations', () => {
  assert.ok(searchGuides(guides, 'اَلْأَلْمَانِيَّة').length > 0);
  assert.equal(searchGuides(guides, 'الحساب البنكي المغلق', 'medicine').length, 0);
  assert.equal(searchGuides(guides, 'xyz-unfindable').length, 0);
  assert.equal(searchGuides(guides, '', 'language')[0].slug, 'german');
});
