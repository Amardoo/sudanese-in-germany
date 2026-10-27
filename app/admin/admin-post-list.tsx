'use client'

import { useState, useTransition } from 'react'
import { deletePostAsAdmin } from './actions'

type Post = { id: string; title: string; body: string }

export function AdminPostList({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState(initialPosts)
  const [isPending, startTransition] = useTransition()

  const handleDelete = (postId: string) => {
    if (!confirm('حذف هذا المنشور؟')) return
    startTransition(async () => {
      const result = await deletePostAsAdmin(postId)
      if (result.success) {
        setPosts((prev) => prev.filter((p) => p.id !== postId))
      } else {
        alert('فشل: ' + result.error)
      }
    })
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button onClick={() => handleDelete(post.id)} disabled={isPending}>
            {isPending ? 'جاري الحذف...' : 'حذف'}
          </button>
        </li>
      ))}
    </ul>
  )
}