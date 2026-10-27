import { createClient } from '@/lib/supabase/server';

export default async function SupabaseTestPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('connection_test')
    .select('message')
    .limit(1);

  if (error) {
    return (
      <main>
        <h1>Supabase Connection Test</h1>
        <p>Supabase error: {error.message}</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Supabase Connection Test</h1>
      <p>{data?.[0]?.message ?? 'No test data found.'}</p>
    </main>
  );
}