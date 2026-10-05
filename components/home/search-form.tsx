import { Search, ArrowLeft } from 'lucide-react';
import { site } from '@/config/site';
export function SearchForm() {
  return (
    <form action="/guides" className="hero-search">
      <Search size={23} aria-hidden="true" />
      <input name="q" aria-label="ابحث في الأدلة" placeholder={site.searchPlaceholder} />
      <button type="submit" aria-label="بحث">
        <ArrowLeft />
      </button>
    </form>
  );
}
