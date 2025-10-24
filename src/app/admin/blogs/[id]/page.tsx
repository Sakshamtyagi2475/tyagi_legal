'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Save, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { supabase, Blog } from '@/lib/supabase'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'

export default function EditBlogPage() {
  const router = useRouter()
  const params = useParams()
  const id = (params as { id?: string })?.id

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [blog, setBlog] = useState<Blog | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    featured_image: '',
    published: false
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit, Image, Placeholder.configure({ placeholder: 'Edit your blog content...' })],
    content: '',
  })

  useEffect(() => {
    if (mounted && id) fetchBlog(id)
  }, [id, mounted])

  const fetchBlog = async (blogId: string) => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', blogId)
        .single()

      if (error) throw error
      setBlog(data)
      setFormData({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || '',
        featured_image: data.featured_image || '',
        published: data.published
      })
      editor?.commands.setContent(data.content || '')
    } catch (error) {
      console.error('Error fetching blog:', error)
      router.push('/admin/blogs')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const { error } = await supabase
        .from('blogs')
        .update({
          ...formData,
          content: editor?.getHTML() || ''
        })
        .eq('id', id)

      if (error) throw error
      router.push('/admin/blogs')
    } catch (error) {
      console.error('Error updating blog:', error)
      alert('Error updating blog post. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this blog post?')) return
    try {
      const { error } = await supabase.from('blogs').delete().eq('id', id)
      if (error) throw error
      router.push('/admin/blogs')
    } catch (error) {
      console.error('Error deleting blog:', error)
      alert('Error deleting blog post. Please try again.')
    }
  }

  if (!mounted) return null
  if (loading)
    return <div className="py-10 text-center text-gray-500">Loading blog...</div>
  if (!blog)
    return (
      <div className="py-10 text-center text-gray-500">
        Blog not found. <Link href="/admin/blogs">Go back</Link>
      </div>
    )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/blogs">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blogs
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Edit Blog Post</h1>
        </div>
        <Button
          variant="destructive"
          onClick={handleDelete}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Blog Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Input
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="featured_image">Featured Image URL</Label>
              <Input
                id="featured_image"
                value={formData.featured_image}
                onChange={(e) =>
                  setFormData({ ...formData, featured_image: e.target.value })
                }
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, published: checked })
                }
              />
              <Label htmlFor="published">Published</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-3 min-h-[300px]">
              <EditorContent editor={editor} />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Link href="/admin/blogs">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  )
}
