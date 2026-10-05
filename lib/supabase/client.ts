'use client';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
export const supabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);
let client: SupabaseClient | undefined;
// Browser-only sessions. Authorization is enforced by PostgreSQL RLS on every request.
export function getSupabase() {
  if (!supabaseConfigured) throw new Error('Supabase is not configured');
  if (!client)
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } },
    );
  return client;
}
