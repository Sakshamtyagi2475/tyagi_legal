// src/app/admin/blogs/new/NewBlogClient.tsx
'use client'

import React, { useState } from 'react'
import BlogEditor from '@/components/BlogEditor'
import { Button } from '@/components/ui/button'

export default function NewBlogClient() {
  const [content, setContent] = useState('')

  const handleSave = () => {
    console.log('New blog content:', content)
    // implement save logic here
  }

  return (
    <div className="space-y-4">
      <BlogEditor initialContent={content} onChange={setContent} />
      <Button onClick={handleSave}>Save Blog</Button>
    </div>
  )
}
