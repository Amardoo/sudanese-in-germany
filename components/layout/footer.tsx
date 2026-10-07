import Link from 'next/link';
import { Brand } from './header';
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <Brand />
        <p>بدايات مختلفة. مجتمع واحد.</p>
        <div>
          <Link href="/guides">استكشف الأدلة</Link>
          <Link href="/dashboard">مساري في ألمانيا</Link>
        </div>
        <small dir="ltr">© {new Date().getFullYear()} Sudanese in Germany</small>
      </div>
    </footer>
  );
}
