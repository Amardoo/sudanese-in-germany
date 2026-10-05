'use client';
import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Plus, Search, Users } from 'lucide-react';
import { communities, communityCopy, postKinds } from '@/config/community';
import { Icon } from '@/components/ui/icon';
import { normalize } from '@/lib/search';
import {
  createDiscussion,
  initialCommunity,
  localCommunityRepository,
} from '@/lib/community/local';
import type { CommunityState } from '@/lib/community/types';
import { DiscussionCard } from './discussion-card';
export function CommunityBoard() {
  const [state, setState] = useState<CommunityState>(initialCommunity);
  const [loaded, setLoaded] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [group, setGroup] = useState('all');
  const [kind, setKind] = useState('all');
  const [query, setQuery] = useState('');
  const [composing, setComposing] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [postGroup, setPostGroup] = useState(communities[0].id);
  const [postKind, setPostKind] = useState(postKinds[0].id);
  const [feedback, setFeedback] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    let active = true;
    localCommunityRepository
      .load()
      .then((value) => {
        if (active) {
          setState(value);
          setLoaded(true);
        }
      })
      .catch(() => {
        if (active) {
          setStorageError(true);
          setLoaded(true);
        }
      });
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    if (composing) titleRef.current?.focus();
  }, [composing]);
  function update(value: CommunityState) {
    setState(value);
    localCommunityRepository
      .save(value)
      .then(() => setStorageError(false))
      .catch(() => setStorageError(true));
  }
  const posts = state.posts.filter(
    (p) =>
      (group === 'all' || p.community === group) &&
      (kind === 'all' || p.kind === kind) &&
      normalize(`${p.title} ${p.body}`).includes(normalize(query)),
  );
  if (!loaded) return <p role="status">جاري تحميل مساحة النقاش…</p>;
  return (
    <>
      <div className="community-intro">
        <div>
          <span className="eyebrow">من سؤال صغير، تبدأ فائدة كبيرة</span>
          <h1>{communityCopy.title}</h1>
          <p>{communityCopy.description}</p>
        </div>
        <button
          className="button"
          onClick={() => setComposing(!composing)}
          aria-expanded={composing}
        >
          <Plus size={19} />
          اطرح سؤالاً أو موضوعاً
        </button>
      </div>
      <p className="preview-notice">{communityCopy.localNotice}</p>
      {storageError && (
        <p className="notice" role="alert">
          تعذّر الحفظ في المتصفح؛ التغييرات متاحة حتى إغلاق الصفحة فقط.
        </p>
      )}
      <div className="community-layout">
        <aside className="community-sidebar">
          <h2>
            <Users size={20} /> المجتمعات
          </h2>
          <button aria-pressed={group === 'all'} onClick={() => setGroup('all')}>
            <MessageCircle size={20} />
            <span>كل النقاشات</span>
            <small>{state.posts.length}</small>
          </button>
          {communities.map((c) => (
            <button key={c.id} aria-pressed={group === c.id} onClick={() => setGroup(c.id)}>
              <Icon name={c.icon} size={21} />
              <span>{c.title}</span>
              <small>{state.posts.filter((p) => p.community === c.id).length}</small>
            </button>
          ))}
          <div className="community-rules">
            <h3>خلّينا نستفيد من بعض</h3>
            <ul>
              {communityCopy.guidelines.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </div>
        </aside>
        <div className="discussion-feed">
          {composing && (
            <form
              className="compose-form"
              onSubmit={(e) => {
                e.preventDefault();
                try {
                  const post = createDiscussion({
                    title,
                    body,
                    community: postGroup,
                    kind: postKind,
                  });
                  update({ ...state, posts: [post, ...state.posts] });
                  setGroup('all');
                  setKind('all');
                  setQuery('');
                  setTitle('');
                  setBody('');
                  setComposing(false);
                  setFeedback('أُضيف موضوعك على هذا الجهاز. لم يُنشر للآخرين.');
                } catch {
                  setFeedback('راجع عنوان الموضوع ونصه والتصنيف.');
                }
              }}
            >
              <h2>شنو حاب تشارك؟</h2>
              <div className="compose-selects">
                <label>
                  المجتمع
                  <select value={postGroup} onChange={(e) => setPostGroup(e.target.value)}>
                    {communities.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  نوع المشاركة
                  <select value={postKind} onChange={(e) => setPostKind(e.target.value)}>
                    {postKinds.map((k) => (
                      <option key={k.id} value={k.id}>
                        {k.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                عنوان الموضوع
                <input
                  ref={titleRef}
                  required
                  maxLength={140}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="اكتب عنواناً واضحاً لسؤالك أو تجربتك"
                />
              </label>
              <label>
                التفاصيل
                <textarea
                  required
                  maxLength={5000}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="أضف السياق الذي يساعد الآخرين على فهم موضوعك…"
                />
              </label>
              <div className="compose-actions">
                <button className="button" type="submit" disabled={!title.trim() || !body.trim()}>
                  إضافة الموضوع محلياً
                </button>
                <button type="button" className="text-button" onClick={() => setComposing(false)}>
                  إغلاق المسودة
                </button>
              </div>
            </form>
          )}
          <p className="inline-status" role="status">
            {feedback}
          </p>
          <div className="filter-search">
            <Search aria-hidden="true" />
            <input
              aria-label="ابحث في النقاشات"
              placeholder="ابحث في الأسئلة والتجارب…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="filter-list">
            {[{ id: 'all', plural: 'كل المشاركات' }, ...postKinds].map((k) => (
              <button key={k.id} aria-pressed={kind === k.id} onClick={() => setKind(k.id)}>
                {k.plural}
              </button>
            ))}
          </div>
          <p className="result-count" aria-live="polite">
            {posts.length} موضوع ·{' '}
            {group === 'all' ? 'كل المجتمعات' : communities.find((c) => c.id === group)?.title}
          </p>
          {posts.map((post) => (
            <DiscussionCard
              key={post.id}
              post={post}
              onChange={(changed) =>
                update({
                  ...state,
                  posts: state.posts.map((p) => (p.id === changed.id ? changed : p)),
                })
              }
              onDelete={() => {
                update({ ...state, posts: state.posts.filter((p) => p.id !== post.id) });
                setFeedback('حُذف الموضوع من هذا الجهاز.');
              }}
            />
          ))}
          {!posts.length && (
            <div className="empty-state">
              <MessageCircle size={35} />
              <h2>ما في موضوع مطابق لبحثك</h2>
              <button
                className="button"
                onClick={() => {
                  setQuery('');
                  setKind('all');
                  setGroup('all');
                }}
              >
                عرض كل النقاشات
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
