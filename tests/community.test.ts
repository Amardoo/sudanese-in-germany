import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createDiscussion, initialCommunity, parseCommunity } from '../lib/community/local.ts';
test('community storage rejects malformed entries and unknown categories', () => {
  assert.deepEqual(parseCommunity('{broken'), initialCommunity());
  const state = initialCommunity();
  state.posts.push({ ...state.posts[0], id: 'bad', community: 'not-a-group' });
  state.posts.push({ ...state.posts[0] });
  // عدد المنشورات بعد التنقية = عدد المنشورات التجريبية الصالحة (مستقل عن حجم البيانات)
  assert.equal(
    parseCommunity(JSON.stringify(state)).posts.length,
    initialCommunity().posts.length,
  );
});
test('new topics validate trimmed content and lengths', () => {
  assert.throws(() =>
    createDiscussion({ title: '  ', body: 'text', community: 'students', kind: 'question' }),
  );
  assert.throws(() =>
    createDiscussion({
      title: 'title',
      body: 'x'.repeat(5001),
      community: 'students',
      kind: 'question',
    }),
  );
  const post = createDiscussion({
    title: ' عنوان ',
    body: ' تفاصيل ',
    community: 'students',
    kind: 'question',
  });
  assert.equal(post.title, 'عنوان');
  assert.equal(post.body, 'تفاصيل');
  assert.equal(post.sample, undefined);
  assert.equal(post.replies.length, 0);
});