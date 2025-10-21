'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Save, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { supabase, Blog } from '@/lib/supabase'

interface EditBlogPageProps {
  params: {
    id: string
  }
}

export default function EditBlogPage({ params }: EditBlogPageProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [blog, setBlog] = useState<Blog | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featured_image: '',
    published: false
  })

  useEffect(() => {
    fetchBlog()
  }, [params.id])

  const fetchBlog = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error) throw error
      setBlog(data)
      setFormData({
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt || '',
        featured_image: data.featured_image || '',
        published: data.published
      })
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
        .update(formData)
        .eq('id', params.id)

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
    if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) return

    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', params.id)

      if (error) throw error

      router.push('/admin/blogs')
    } catch (error) {
      console.error('Error deleting blog:', error)
      alert('Error deleting blog post. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/blogs">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blogs
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Edit Blog Post</h1>
        </div>
        <div className="text-center py-8">Loading blog post...</div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/blogs">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blogs
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Blog Post Not Found</h1>
        </div>
        <Card>
          <CardContent className="text-center py-8">
            <p>The blog post you're looking for doesn't exist.</p>
            <Link href="/admin/blogs" className="mt-4 inline-block">
              <Button>Back to Blogs</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

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
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter blog post title"
                required
              />
            </div>

            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="blog-post-slug"
                required
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                URL: /blog/{formData.slug}
              </p>
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief description of the blog post"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="featured_image">Featured Image URL</Label>
              <Input
                id="featured_image"
                value={formData.featured_image}
                onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
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
            <div>
              <Label htmlFor="content">Blog Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your blog post content here..."
                rows={20}
                required
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                You can use HTML tags for formatting
              </p>
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
