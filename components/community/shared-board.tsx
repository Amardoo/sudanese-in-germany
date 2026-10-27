'use client';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { MessageCircle, RefreshCw, Users, Plus } from 'lucide-react';
import { Icon } from '@/components/ui/icon';
import { getSupabase } from '@/lib/supabase/client';
import { communities, postKinds, communityCopy } from '@/config/community';

import {
  listSharedDiscussions,
  publishDiscussion,
  changeSharedDiscussion,
  deleteSharedDiscussion,
} from '@/lib/supabase/community';
import type { Discussion } from '@/lib/community/types';
import { normalize } from '@/lib/search';
import { DiscussionCard } from './discussion-card';
export function SharedBoard() {
  const [user, setUser] = useState<User | null>(null);
  const [composing, setComposing] = useState(false);
  const [posts, setPosts] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [group, setGroup] = useState(communities[0].id);
  const [kind, setKind] = useState(postKinds[0].id);
  const [filter, setFilter] = useState('all');
  const [kindFilter, setKindFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(30);
  const generation = useRef(0);
  // القراءة متاحة للجميع: نحمّل الموضوعات حتى بدون حساب
  const refresh = useCallback(async () => {
    const request = ++generation.current;
    try {
      const { data } = await getSupabase().auth.getUser();
      if (request !== generation.current) return;
      setError('');
      setUser(data.user ?? null);
      const rows = await listSharedDiscussions(data.user?.id ?? '', limit);
      if (request === generation.current) setPosts(rows);
    } catch {
      if (request === generation.current)
        setError('تعذّر تحميل النقاشات. تحقق من الاتصال وتهيئة قاعدة بيانات المجتمع.');
    } finally {
      if (request === generation.current) setLoading(false);
    }
  }, [limit]);
  useEffect(() => {
    let refreshTimer: ReturnType<typeof setTimeout> | undefined;
    const {
      data: { subscription },
    } = getSupabase().auth.onAuthStateChange((event, session) => {
      // Leave the Auth callback before another SDK call, to avoid its session lock.
      if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') {
        clearTimeout(refreshTimer);
        refreshTimer = setTimeout(() => void refresh(), 0);
      }
      if (!session && event === 'SIGNED_OUT') {
        generation.current++;
        setUser(null);
        setPosts([]);
        setLoading(false);
        void refresh(); // إعادة تحميل القراءة العامة بعد الخروج
      }
    });
    return () => {
      clearTimeout(refreshTimer);
      subscription.unsubscribe();
    };
  }, [refresh]);
  async function mutate(action: () => Promise<void>) {
    if (busy) return false;
    setBusy(true);
    setError('');
    setNotice('');
    try {
      await action();
      setNotice('تم حفظ التغيير في المجتمع.');
      await refresh();
      return true;
    } catch {
      setError('لم يُحفظ التغيير. تحقق من الاتصال والصلاحيات ثم حاول مرة أخرى.');
      return false;
    } finally {
      setBusy(false);
    }
  }
  if (loading) return <p role="status">جاري تحميل الصفحة</p>;
  const visible = posts.filter(
    (p) =>
      (filter === 'all' || p.community === filter) &&
      (kindFilter === 'all' || p.kind === kindFilter) &&
      normalize(p.title + ' ' + p.body).includes(normalize(query)),
  );
  return (
    <>
      <div className="community-intro">
        <div>
          <span className="eyebrow">المجتمعات والنقاشات المشتركة</span>
          <h1>{communityCopy.title}</h1>
          <p>{communityCopy.description}</p>
        </div>
        <Link href="/account" className="button">
          {user ? 'حسابي' : 'الدخول أو إنشاء حساب'}
        </Link>
      </div>
      <p className="preview-notice">
        {user
          ? 'هذه مساحة مشتركة بين الأعضاء المسجّلين. يظهر اسم عرضك مع المشاركات والردود؛ لا تظهر بيانات بريدك.'
          : 'القراءة متاحة للجميع. للمشاركة بالموضوعات والردود والإعجاب سجّل دخولك مجاناً بالبريد الإلكتروني.'}
      </p>
      <div className="shared-toolbar">
        <button className="text-button" disabled={busy} onClick={() => void refresh()}>
          <RefreshCw size={17} />
          تحديث النقاشات
        </button>
        <span>{posts.length} موضوع محمّل</span>
      </div>
      {error && (
        <p role="alert" className="notice">
          {error}
        </p>
      )}
      <p role="status">{notice}</p>
      <div className="community-layout">
                <aside className="community-sidebar">
          <h2>
            <Users size={20} /> المجتمعات
          </h2>
          <button aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>
            <MessageCircle size={20} />
            <span>كل النقاشات</span>
            <small>{posts.length}</small>
          </button>
          {communities.map((c) => (
            <button key={c.id} aria-pressed={filter === c.id} onClick={() => setFilter(c.id)}>
              <Icon name={c.icon} size={21} />
              <span>{c.title}</span>
              <small>{posts.filter((p) => p.community === c.id).length}</small>
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
        <div>
          {/* شريط الأدوات: الزر + البحث في سطر واحد */}
<div className="compose-toolbar">
  {user && (
    <button
      className="button"
      onClick={() => setComposing(!composing)}
      aria-expanded={composing}
    >
      <Plus size={19} />
      {composing ? 'إغلاق المسودة' : 'اطرح سؤالاً أو موضوعاً'}
    </button>
  )}
  <div className="filter-search">
    <input
      aria-label="ابحث في النقاشات"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="ابحث في الموضوعات المحمّلة…"
    />
  </div>
</div>

{/* النموذج يظهر تحت الشريط عند الضغط */}

                    {user && (
            <>
             
              {composing && (
                <form
                  className="compose-form"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (
                      await mutate(() =>
                        publishDiscussion({ title, body, community: group, kind }, user.id),
                      )
                    ) {
                      setTitle('');
                      setBody('');
                      setFilter('all');
                      setKindFilter('all');
                      setQuery('');
                      setComposing(false);
                    }
                  }}
                >
                  <h2>اطرح سؤالاً أو شارك موضوعاً</h2>
                  <div className="compose-selects">
                    <label>
                      المجتمع
                      <select value={group} onChange={(e) => setGroup(e.target.value)}>
                        {communities.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.title}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      نوع المشاركة
                      <select value={kind} onChange={(e) => setKind(e.target.value)}>
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
                      required
                      maxLength={140}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </label>
                  <label>
                    التفاصيل
                    <textarea
                      required
                      maxLength={5000}
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                    />
                  </label>
                  <div className="compose-actions">
                    <button className="button" disabled={busy || !title.trim() || !body.trim()}>
                      {busy ? 'جاري الحفظ…' : 'نشر في المجتمع'}
                    </button>
                    <button
                      type="button"
                      className="text-button"
                      onClick={() => setComposing(false)}
                    >
                      إغلاق
                    </button>
                  </div>
                  <div className='filter'></div>
                </form>
              )}
            </>
          )}
         
          
          <div className="filter-list">
            {[{ id: 'all', plural: 'كل المشاركات' }, ...postKinds].map((k) => (
              <button
                key={k.id}
                aria-pressed={kindFilter === k.id}
                onClick={() => setKindFilter(k.id)}
              >
                {k.plural}
              </button>
            ))}
          </div>
          <p className="result-count">{visible.length} موضوع مطابق من الموضوعات المحمّلة</p>
          {visible.map((post) => (
            <fieldset disabled={busy} className="discussion-fieldset" key={post.id}>
              <DiscussionCard
                shared
                readOnly={!user}
                post={post}
                onChange={(after) => mutate(() => changeSharedDiscussion(post, after, user!.id))}
                onDelete={() => void mutate(() => deleteSharedDiscussion(post.id, user!.id))}
              />
            </fieldset>
          ))}
          {!visible.length && <p className="empty-state">لا توجد موضوعات مطابقة بعد.</p>}
          {posts.length >= limit && (
            <button className="button" onClick={() => setLimit(limit + 30)}>
              تحميل موضوعات أقدم
            </button>
          )}
        </div>
      </div>
    </>
  );
}