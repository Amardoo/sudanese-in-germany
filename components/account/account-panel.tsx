'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { Mail, UserRound } from 'lucide-react';
import { getSupabase, supabaseConfigured } from '@/lib/supabase/client';

export function AccountPanel() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(supabaseConfigured);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!supabaseConfigured) return;
    let active = true;
    const client = getSupabase();
    client.auth
      .getUser()
      .then(({ data }) => {
        if (active) {
          setUser(data.user);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) {
          setMessage('تعذّر الاتصال بخدمة الحسابات. حاول مرة أخرى.');
          setLoading(false);
        }
      });
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  if (!supabaseConfigured)
    return (
      <div className="account-panel">
        <UserRound size={35} />
        <h2>تسجيل الحسابات ينتظر التفعيل</h2>
        <p>
          يمكنك تجربة الواجهة المحلية الآن. ستتاح الحسابات والمشاركات المشتركة بعد ربط خدمة
          الحسابات.
        </p>
        <Link className="button" href="/community">
          استكشف المجتمعات
        </Link>
      </div>
    );

  if (loading) return <p role="status">جاري التحقق من الحساب…</p>;

  return (
    <div className="account-panel">
      <UserRound size={32} />
      {user ? (
        <>
          <h2>أهلاً بيك يا زول</h2>
          <p dir="ltr">{user.email}</p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!name.trim()) return;
              setBusy(true);
              try {
                const { error } = await getSupabase()
                  .from('community_members')
                  .update({ display_name: name.trim() })
                  .eq('id', user.id)
                  .select('id')
                  .single();
                setMessage(
                  error ? 'تعذّر حفظ الاسم. راجع اتصالك أو تهيئة المجتمع.' : 'تم حفظ اسم العرض.',
                );
              } catch {
                setMessage('تعذّر الاتصال. حاول مرة أخرى.');
              } finally {
                setBusy(false);
              }
            }}
          >
            <label>
              اسم العرض في المجتمع
              <input
                required
                minLength={2}
                maxLength={60}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="الاسم الذي تود ظهوره للآخرين"
              />
            </label>
            <button className="button" disabled={busy}>
              حفظ اسم العرض
            </button>
          </form>
          <Link className="button" href="/community">
            افتح النقاشات المشتركة
          </Link>
          <button
            className="text-button"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              try {
                const { error } = await getSupabase().auth.signOut();
                if (error) setMessage('تعذّر تسجيل الخروج. حاول مرة أخرى.');
                else {
                  setUser(null);
                  setMessage('تم تسجيل الخروج.');
                }
              } catch {
                setMessage('تعذّر الاتصال. حاول مرة أخرى.');
              } finally {
                setBusy(false);
              }
            }}
          >
            تسجيل الخروج
          </button>
        </>
      ) : (
        <>
          <h2>حساب واحد، ونقاش يجمعنا</h2>
          <p>أدخل بريدك لإرسال رمز دخول آمن. يُنشأ حسابك تلقائياً عند أول دخول.</p>

          {!otpSent ? (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setBusy(true);
                setMessage('');
                try {
                  const { error } = await getSupabase().auth.signInWithOtp({
                    email: email.trim(),
                  });
                  
                  if (error) {
                    console.error('Supabase OTP error:', {
                      message: error.message,
                      status: error.status,
                      code: error.code,
                    });

                    setMessage(`خطأ Supabase: ${error.message} (status: ${error.status})`);
                  } else {
                    setOtpSent(true);
                    setMessage('تم إرسال الرمز. راجع بريدك وأدخل الرمز المكوّن من 6 أرقام.');
                  }
                } catch {
                  setMessage('تعذّر الاتصال. حاول مرة أخرى.');
                } finally {
                  setBusy(false);
                }
              }}
            >
              <label>
                البريد الإلكتروني
                <input
                  type="email"
                  dir="ltr"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                />
              </label>
              <button className="button" disabled={busy}>
                <Mail size={18} />
                {busy ? 'جاري الإرسال…' : 'إرسال رمز الدخول'}
              </button>
            </form>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setBusy(true);
                setMessage('');
                try {
                  const { data, error } = await getSupabase().auth.verifyOtp({
                    email: email.trim(),
                    token: otp.trim(),
                    type: 'email',
                  });
                  if (error) {
                    setMessage('الرمز غير صحيح أو منتهي الصلاحية. حاول مرة أخرى.');
                  } else {
                    setUser(data.user);
                    setOtpSent(false);
                    setOtp('');
                    setMessage('تم تسجيل الدخول بنجاح.');
                  }
                } catch {
                  setMessage('تعذّر الاتصال. حاول مرة أخرى.');
                } finally {
                  setBusy(false);
                }
              }}
            >
              <p dir="ltr" className="otp-hint">
                {email}
              </p>
              <label>
                رمز التحقق
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  dir="ltr"
                />
              </label>
              <button className="button" disabled={busy}>
                {busy ? 'جاري التحقق…' : 'تأكيد الرمز وتسجيل الدخول'}
              </button>
              <button
                type="button"
                className="text-button"
                disabled={busy}
                onClick={() => {
                  setOtpSent(false);
                  setOtp('');
                  setMessage('');
                }}
              >
                تغيير البريد الإلكتروني
              </button>
            </form>
          )}
        </>
      )}
      <p role="status">{message}</p>
    </div>
  );
}