import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { journeys } from '@/data/journeys';
import { Icon } from '@/components/ui/icon';
export function PathCards() {
  return (
    <div className="path-grid">
      {journeys.map((j, i) => (
        <Link href={`/dashboard?path=${j.id}`} className={`path-card ${j.color}`} key={j.id}>
          <div className="flex items-center justify-between">
            <span className="icon-tile">
              <Icon name={j.icon} size={28} />
            </span>
            <span className="path-number">0{i + 1}</span>
          </div>
          <h3>{j.title}</h3>
          <p>{j.description}</p>
          <span className="path-link">
            استكشف مسارك <ArrowLeft size={18} />
          </span>
        </Link>
      ))}
    </div>
  );
}
