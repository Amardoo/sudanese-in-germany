'use client';
import { useEffect } from 'react';
import { Building2, ExternalLink } from 'lucide-react';
import { associations } from '@/data/associations';
export function AssociationBrowser() {
  useEffect(() => {
    let cancelled = false;
    // Restore deep links after streamed content and local fonts have settled.
    void document.fonts.ready.then(() => {
      if (!cancelled && window.location.hash === '#associations') {
        document.getElementById('associations')?.scrollIntoView({ behavior: 'instant' });
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <>
      <div className="association-grid">
        {associations.map((a) => (
          <article className="association-card" key={a.id}>
            <span className="icon-tile">
              <Building2 size={27} />
            </span>
            <div className="association-content">
              <h3>{a.name}</h3>
              <p>
                {a.focus}  · {a.region}
              </p>
            </div>
            <div className="association-links">
              <a href={a.url} target="_blank" rel="noopener noreferrer">
                الموقع <ExternalLink size={16} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
