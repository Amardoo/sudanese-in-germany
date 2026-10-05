import {
  GraduationCap,
  Stethoscope,
  BriefcaseBusiness,
  MapPin,
  Languages,
  Files,
  Award,
  Home,
  HeartPulse,
  Train,
  Euro,
  Users,
  Scale,
  BookOpen,
  Palette,
  Landmark,
  Plane,
} from 'lucide-react';
import type { IconName } from '@/lib/types';
const icons: Record<IconName, typeof GraduationCap> = {
  student: GraduationCap,
  doctor: Stethoscope,
  worker: BriefcaseBusiness,
  newcomer: MapPin,
  language: Languages,
  residence: Files,
  scholarship: Award,
  housing: Home,
  health: HeartPulse,
  transportation: Train,
  money: Euro,
  family: Users,
  community: Users,
  legal: Scale,
  employment: BriefcaseBusiness,
  education: BookOpen,
  culture: Palette,
  government: Landmark,
  travel: Plane,
  documents: Files,
};
export function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const Component = icons[name] ?? Files;
  return <Component size={size} aria-hidden="true" strokeWidth={1.7} />;
}
