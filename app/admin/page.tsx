// app/admin/page.tsx
import { createClient } from '@/lib/supabase/server'
import { AdminPostList } from './admin-post-list'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('community_posts')
    .select('id, title, body, user_id, created_at')
    .order('created_at', { ascending: false })

  return (
    <div className="shell">
      <h1>لوحة الإدارة</h1>
      <AdminPostList initialPosts={posts ?? []} />
    </div>
  )
}