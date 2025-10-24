'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import LinkExtension from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import NewBlogClient from './NewBlogClient'
import Placeholder from '@tiptap/extension-placeholder'


export default function NewBlogPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [featuredImage, setFeaturedImage] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    published: false,
  })

  const editor = useEditor({
    extensions: [StarterKit, Underline, LinkExtension, Image,Placeholder.configure({ placeholder: 'Write your blog content here...' })],
    immediatelyRender: false,
  })

  useEffect(() => setMounted(true), [])

  if (!mounted || !editor) return null

  // Auto-generate slug from title
  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
    })
  }

  // Upload featured image to Supabase Storage
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return
    const file = e.target.files[0]
    const fileName = `${Date.now()}_${file.name}`
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(fileName, file)
    if (error) {
      alert('Failed to upload image')
      console.error(error)
      return
    }
    const url = supabase.storage.from('blog-images').getPublicUrl(fileName).data.publicUrl
    setFeaturedImage(url || '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const { error } = await supabase.from('blogs').insert([
        {
          ...formData,
          content: editor.getHTML(),
          featured_image: featuredImage,
        },
      ])
      if (error) throw error
      router.push('/admin/blogs')
    } catch (error) {
      console.error(error)
      alert('Failed to create blog. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create New Blog Post</h1>

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
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter blog title"
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
                placeholder="blog-post-slug"
                required
              />
              <p className="text-sm text-gray-600 mt-1">
                URL: /blog/{formData.slug}
              </p>
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                placeholder="Short summary for the blog"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="featured_image">Featured Image</Label>
              <Input
                id="featured_image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {featuredImage && (
                <img
                  src={featuredImage}
                  alt="Featured"
                  className="mt-2 h-40 object-cover rounded-md"
                />
              )}
            </div>

            <div>
              <Label>Content</Label>
              <NewBlogClient />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Create Blog'}
          </Button>
        </div>
      </form>
    </div>
  )
}
