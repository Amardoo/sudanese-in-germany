'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ArrowUpLeft, Menu, X } from 'lucide-react';
import { navigation } from '@/config/navigation';
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="سودانيين في ألمانيا — الرئيسية">
      <span className="brand-mark">س</span>
      <span>
        سودانيين <small>في ألمانيا</small>
      </span>
    </Link>
  );
}
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Brand />
        <nav aria-label="القائمة الرئيسية" className="desktop-nav">
          {navigation.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={
                path === n.href || (n.href !== '/' && path.startsWith(n.href + '/'))
                  ? 'page'
                  : undefined
              }
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link className="button small desktop-cta" href="/dashboard">
          ابدأ رحلتك <ArrowUpLeft size={18} />
        </Link>
        <button
          className="menu-button"
          aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav id="mobile-menu" className="mobile-nav shell" aria-label="قائمة الهاتف">
          {navigation.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              aria-current={path === n.href ? 'page' : undefined}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
