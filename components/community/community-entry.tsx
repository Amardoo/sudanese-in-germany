'use client';
import { supabaseConfigured } from '@/lib/supabase/client';
import { CommunityBoard } from './community-board';
import { SharedBoard } from './shared-board';
export function CommunityEntry() {
  return supabaseConfigured ? <SharedBoard /> : <CommunityBoard />;
}
