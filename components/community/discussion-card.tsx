'use client';
import { useState } from 'react';
import { Heart, MessageCircle, Send, Trash2 } from 'lucide-react';
import { communities, postKinds } from '@/config/community';
import type { Discussion } from '@/lib/community/types';
export function DiscussionCard({
  post,
  onChange,
  onDelete,
  shared = false,
}: {
  post: Discussion;
  onChange: (post: Discussion) => void | boolean | Promise<boolean>;
  onDelete: () => void;
  shared?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [reply, setReply] = useState('');
  const [confirm, setConfirm] = useState(false);
  return (
    <article className="discussion-card">
      <div className="discussion-meta">
        <span className="discussion-avatar">{post.sample ? 'م' : 'أ'}</span>
        <div>
          <strong>{shared ? post.author : post.sample ? 'موضوع توضيحي' : 'أنت'}</strong>
          <small>
            {post.sample
              ? 'تجربة مجمّعة من نقاشات المجتمع'
              : new Date(post.createdAt).toLocaleDateString('ar')}
          </small>
        </div>
        <span className="tag">{postKinds.find((k) => k.id === post.kind)?.label}</span>
      </div>
      <span className="discussion-community">
        {communities.find((c) => c.id === post.community)?.title}
      </span>
      <h2>{post.title}</h2>
      <p className="discussion-body">{post.body}</p>
      <div className="discussion-actions">
        <button
          aria-pressed={post.liked}
          aria-label={`إعجاب: ${post.title}`}
          onClick={() => onChange({ ...post, liked: !post.liked })}
        >
          <Heart size={18} fill={post.liked ? 'currentColor' : 'none'} />
          {post.liked ? 'أعجبك' : 'إعجاب'}
          {shared ? ` · ${post.likes ?? 0}` : post.liked ? ' · 1' : ''}
        </button>
        <button aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
          <MessageCircle size={18} />
          {post.replies.length} ردود
        </button>
        {!post.sample && (!shared || post.mine) && (
          <button className="delete-action" onClick={() => setConfirm(!confirm)}>
            <Trash2 size={16} />
            حذف الموضوع
          </button>
        )}
      </div>
      {confirm && (
        <div className="delete-confirm">
          <span>
            {shared ? 'حذف الموضوع وردوده من المجتمع؟' : 'حذف الموضوع وردوده من هذا الجهاز؟'}
          </span>
          <button onClick={onDelete}>تأكيد الحذف</button>
          <button onClick={() => setConfirm(false)}>إلغاء</button>
        </div>
      )}
      {expanded && (
        <div className="reply-panel">
          <h3>الردود</h3>
          {!post.replies.length && <p>لسه ما في ردود. أضف أول رد.</p>}
          {post.replies.map((r) => (
            <div className="reply" key={r.id}>
              <strong>
                {shared ? r.author : 'أنت'} <small>· {shared ? 'رد' : 'رد محلي'}</small>
              </strong>
              <p>{r.body}</p>
              {(!shared || r.mine) && (
                <button
                  aria-label={`حذف الرد: ${r.body.slice(0, 30)}`}
                  onClick={() =>
                    onChange({ ...post, replies: post.replies.filter((item) => item.id !== r.id) })
                  }
                >
                  حذف الرد
                </button>
              )}
            </div>
          ))}
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const body = reply.trim();
              if (!body) return;
              const saved = await onChange({
                ...post,
                replies: [
                  ...post.replies,
                  { id: crypto.randomUUID(), body, createdAt: new Date().toISOString() },
                ],
              });
              if (saved !== false) setReply('');
            }}
          >
            <label htmlFor={`reply-${post.id}`}>أضف ردك</label>
            <textarea
              id={`reply-${post.id}`}
              required
              maxLength={2000}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="شارك معلومة مفيدة أو اسأل للتوضيح…"
            />
            <button className="button" disabled={!reply.trim()} type="submit">
              <Send size={16} />
              {shared ? 'نشر الرد' : 'إضافة الرد محلياً'}
            </button>
          </form>
        </div>
      )}
    </article>
  );
}
