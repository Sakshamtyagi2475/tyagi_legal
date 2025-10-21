"use client"

import { useEffect, useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, HelpCircle, Eye } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

interface ActivityItem {
  id: string
  type: 'blog_created' | 'blog_updated' | 'faq_created' | 'faq_updated'
  title: string
  timestamp: string
}

export default function AdminDashboard() {
  const [totalBlogs, setTotalBlogs] = useState(0)
  const [publishedBlogs, setPublishedBlogs] = useState(0)
  const [totalFaqs, setTotalFaqs] = useState(0)
  const [activity, setActivity] = useState<ActivityItem[]>([])

  useEffect(() => {
    const fetchCounts = async () => {
      const [{ count: blogsCount }, { count: publishedCount }, { count: faqsCount }] = await Promise.all([
        supabase.from('blogs').select('*', { count: 'exact', head: true }),
        supabase.from('blogs').select('*', { count: 'exact', head: true }).eq('published', true),
        supabase.from('faqs').select('*', { count: 'exact', head: true }),
      ])

      setTotalBlogs(blogsCount || 0)
      setPublishedBlogs(publishedCount || 0)
      setTotalFaqs(faqsCount || 0)
    }

    const fetchRecentActivity = async () => {
      // Last 5 by created/updated time
      const [blogsRes, faqsRes] = await Promise.all([
        supabase.from('blogs').select('id,title,created_at,updated_at,published').order('updated_at', { ascending: false }).limit(5),
        supabase.from('faqs').select('id,question,created_at,updated_at').order('updated_at', { ascending: false }).limit(5),
      ])

      const blogs = (blogsRes.data || []).map((b: any) => ({
        id: `blog-${b.id}`,
        type: 'blog_updated' as const,
        title: `${b.title}`,
        timestamp: b.updated_at || b.created_at,
      }))

      const faqs = (faqsRes.data || []).map((f: any) => ({
        id: `faq-${f.id}`,
        type: 'faq_updated' as const,
        title: `${f.question}`,
        timestamp: f.updated_at || f.created_at,
      }))

      const merged = [...blogs, ...faqs]
        .sort((a, b) => (new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()))
        .slice(0, 5)
      setActivity(merged)
    }

    fetchCounts()
    fetchRecentActivity()

    // Realtime updates
    const channel = supabase
      .channel('admin-dashboard')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'blogs' }, payload => {
        // Update counts
        fetchCounts()
        // Add activity
        const row: any = payload.new || payload.old
        const newItem: ActivityItem = {
          id: `blog-${row?.id}-${payload.eventType}-${Date.now()}`,
          type: 'blog_updated',
          title: row?.title || 'Blog changed',
          timestamp: row?.updated_at || row?.created_at || new Date().toISOString(),
        }
        setActivity(prev => [newItem, ...prev].slice(0, 5))
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'faqs' }, payload => {
        fetchCounts()
        const row: any = payload.new || payload.old
        const newItem: ActivityItem = {
          id: `faq-${row?.id}-${payload.eventType}-${Date.now()}`,
          type: 'faq_updated',
          title: row?.question || 'FAQ changed',
          timestamp: row?.updated_at || row?.created_at || new Date().toISOString(),
        }
        setActivity(prev => [newItem, ...prev].slice(0, 5))
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const publishedPercent = useMemo(() => {
    if (totalBlogs === 0) return 0
    return Math.round((publishedBlogs / totalBlogs) * 100)
  }, [publishedBlogs, totalBlogs])

  return (
    <div className="space-y-6 ">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBlogs}</div>
            <p className="text-xs text-muted-foreground">
              Updates in realtime
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Blogs</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedBlogs}</div>
            <p className="text-xs text-muted-foreground">
              {publishedPercent}% published
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total FAQs</CardTitle>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFaqs}</div>
            <p className="text-xs text-muted-foreground">
              Updates in realtime
            </p>
          </CardContent>
        </Card>


      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Blog Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Create, edit, and manage your blog posts
            </p>
            <div className="flex space-x-2">
              <Link href="/admin/blogs">
                <Button>Manage Blogs</Button>
              </Link>
              <Link href="/admin/blogs/new">
                <Button variant="outline">New Blog Post</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>FAQ Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Manage frequently asked questions
            </p>
            <div className="flex space-x-2">
              <Link href="/admin/faqs">
                <Button>Manage FAQs</Button>
              </Link>
              <Link href="/admin/faqs/new">
                <Button variant="outline">New FAQ</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activity.length === 0 ? (
              <p className="text-sm text-muted-foreground">No recent activity</p>
            ) : (
              activity.map(item => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${item.type.includes('blog') ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.type.includes('blog') ? 'Blog' : 'FAQ'} updated</p>
                    <p className="text-xs text-muted-foreground">{item.title} — {new Date(item.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
