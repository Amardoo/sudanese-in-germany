import Link from 'next/link';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { communities } from '@/config/community';
import { Icon } from '@/components/ui/icon';
export function CommunityPreview() {
  return (
    <section className="shell social-preview">
      <div className="section-heading">
        <div>
          <span className="eyebrow">بدايات مختلفة. مجتمع واحد.</span>
          <h2>المعلومة من الدليل، والتجربة من الناس.</h2>
          <p>مساحة تسأل فيها وتتبادل التجارب مع المجتمع.</p>
        </div>
      </div>
      <div>
        <div className="community-preview-card">
          <MessageCircle size={28} />
          <h3>كل سؤال ممكن يفيد غيرك</h3>
          <div className="community-preview-groups">
            {communities.map((c) => (
              <span key={c.id}>
                <Icon name={c.icon} size={18} />
                {c.title}
              </span>
            ))}
          </div>
          <Link href="/community">
            استكشف المجتمعات <ArrowLeft size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
