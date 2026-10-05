export type IconName =
  'student' | 'doctor' | 'worker' | 'newcomer' | 'language' | 'residence' | 'scholarship' | 'housing' | 'health' | 'transportation' | 'money' | 'family' | 'community' | 'legal' | 'employment' | 'education' | 'culture' | 'government' | 'travel'  | 'documents'  ;
export interface JourneyStep {
  id: string;
  title: string;
  description: string;
  guide: string;
}
export interface Journey {
  id: string;
  title: string;
  heading: string;
  description: string;
  icon: IconName;
  color: string;
  steps: JourneyStep[];
}
export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: string;
  categories?: string[];
  minutes: number;
  sections: {
    title: string;
    body: string;
    internalLinks?: { term: string; href: string }[];
    externalLinks?: { term: string; href: string }[];
    table?: { headers: string[]; rows: string[][] };
    checklist?: string[];
  }[];
  source: { label: string; url: string };
  origin?: 'starter' | 'wordpress-archive';
}
export interface ProgressState {
  version: 1;
  selected: string;
  completed: Record<string, string[]>;
}
export interface ContentRepository {
  listGuides(): Promise<Guide[]>;
  getGuide(slug: string): Promise<Guide | undefined>;
}
export interface ProgressRepository {
  load(): Promise<ProgressState>;
  save(state: ProgressState): Promise<void>;
}
