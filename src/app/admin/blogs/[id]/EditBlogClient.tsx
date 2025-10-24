// src/app/admin/blogs/edit/[id]/EditBlogClient.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import BlogEditor from '@/components/BlogEditor'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Save, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { supabase, Blog } from '@/lib/supabase'

interface Props { id: string }

export default function EditBlogClient({ id }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [blog, setBlog] = useState<Blog | null>(null)
  const [formData, setFormData] = useState({
    title: '', slug: '', excerpt: '', featured_image: '', published: false
  })
  const [content, setContent] = useState('')

  // Fetch blog
  useEffect(() => {
    let mounted = true
    const fetchBlog = async () => {
      const { data, error } = await supabase.from('blogs').select('*').eq('id', id).single()
      if (error || !data) return router.push('/admin/blogs')
      if (!mounted) return
      setBlog(data)
      setFormData({
        title: data.title, slug: data.slug, excerpt: data.excerpt,
        featured_image: data.featured_image, published: !!data.published
      })
      setContent(data.content)
      setLoading(false)
    }
    fetchBlog()
    return () => { mounted = false }
  }, [id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const { error } = await supabase.from('blogs').update({
      ...formData, content
    }).eq('id', id)
    if (error) alert('Error updating blog')
    else router.push('/admin/blogs')
    setSaving(false)
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure?')) return
    const { error } = await supabase.from('blogs').delete().eq('id', id)
    if (error) alert('Error deleting blog')
    else router.push('/admin/blogs')
  }

  if (loading) return <div>Loading...</div>
  if (!blog) return <div>Blog not found</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/blogs">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Edit Blog</h1>
        </div>
        <Button variant="destructive" onClick={handleDelete}>
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Blog Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} required />
            </div>
            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Input id="excerpt" value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
            </div>
            <div>
              <Label htmlFor="featured_image">Featured Image URL</Label>
              <Input id="featured_image" value={formData.featured_image} onChange={e => setFormData({...formData, featured_image: e.target.value})} />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={formData.published} onCheckedChange={checked => setFormData({...formData, published: checked})} />
              <Label htmlFor="published">Published</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Content</CardTitle></CardHeader>
          <CardContent>
            <BlogEditor initialContent={content} onChange={setContent} />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href="/admin/blogs"><Button variant="outline">Cancel</Button></Link>
          <Button type="submit" disabled={saving}><Save className="h-4 w-4 mr-2" />{saving ? 'Saving...' : 'Save Changes'}</Button>
        </div>
      </form>
    </div>
  )
}
