import type { Metadata } from 'next';
import { Dashboard } from '@/components/journey/dashboard';

export const metadata: Metadata = { title: 'مساري' };

export default function DashboardPage() {
  return <Dashboard />;
}
