'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Calendar,
  FileText,
  CircleArrowLeft 
} from 'lucide-react'
import Link from 'next/link'
import { supabase, Blog } from '@/lib/supabase'

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setBlogs(data || [])
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const togglePublished = async (id: string, published: boolean) => {
    try {
      const { error } = await supabase
        .from('blogs')
        .update({ published: !published })
        .eq('id', id)

      if (error) throw error
      fetchBlogs() // Refresh the list
    } catch (error) {
      console.error('Error updating blog:', error)
    }
  }

  const deleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return

    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchBlogs() // Refresh the list
    } catch (error) {
      console.error('Error deleting blog:', error)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Blog Management</h1>
        </div>
        <div className="text-center py-8">Loading blogs...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Blog Management</h1>
        <Link href="/admin/blogs/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Blog Post
          </Button>
        </Link>
        <Link href="/admin">
          <Button className='bg-gray-700'>
            <CircleArrowLeft  className="h-4 w-4 mr-2" />
              Go Back 
          </Button>
        </Link>
      </div>

      {blogs.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No blog posts yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Get started by creating your first blog post
            </p>
            <Link href="/admin/blogs/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create First Post
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {blogs.map((blog) => (
            <Card key={blog.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{blog.title}</CardTitle>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge variant={blog.published ? "default" : "secondary"}>
                        {blog.published ? "Published" : "Draft"}
                      </Badge>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="h-4 w-4 inline mr-1" />
                        {new Date(blog.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => togglePublished(blog.id, blog.published)}
                    >
                      {blog.published ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Link href={`/admin/blogs/${blog.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteBlog(blog.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  {blog.excerpt || 'No excerpt available'}
                </p>
                <div className="mt-4">
                  <Link 
                    href={`/blog/${blog.slug}`}
                    className="text-sm text-blue-600 hover:text-blue-700"
                    target="_blank"
                  >
                    View on website →
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
