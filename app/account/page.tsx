import type { Metadata } from 'next';
import { AccountPanel } from '@/components/account/account-panel';
export const metadata: Metadata = { title: 'حسابي' };
export default function AccountPage() {
  return (
    <div className="shell listing-page">
      <div className="page-heading">
        <span className="eyebrow">خطوة أقرب للمجتمع</span>
        <h1>حسابي</h1>
      </div>
      <AccountPanel />
    </div>
  );
}
