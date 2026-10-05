import type { Metadata } from 'next';
import { CommunityEntry } from '@/components/community/community-entry';
export const metadata: Metadata = { title: 'المجتمعات والنقاشات' };
export default function CommunityPage() {
  return (
    <div className="shell community-page">
      <CommunityEntry />
    </div>
  );
}
