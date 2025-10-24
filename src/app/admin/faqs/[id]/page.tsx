'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Save, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { supabase, FAQ } from '@/lib/supabase'

interface EditFAQPageProps {
  params: Promise<{ id: string }>
}

export default function EditFAQPage({ params }: EditFAQPageProps) {
  const { id } = React.use(params) // ✅ unwrap params Promise
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [faq, setFaq] = useState<FAQ | null>(null)
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    order: 0
  })

  useEffect(() => {
    fetchFAQ()
  }, [id])

  const fetchFAQ = async () => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setFaq(data)
      setFormData({
        question: data.question,
        answer: data.answer,
        order: data.order
      })
    } catch (error) {
      console.error('Error fetching FAQ:', error)
      router.push('/admin/faqs')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const { error } = await supabase
        .from('faqs')
        .update(formData)
        .eq('id', id)

      if (error) throw error

      router.push('/admin/faqs')
    } catch (error) {
      console.error('Error updating FAQ:', error)
      alert('Error updating FAQ. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this FAQ? This action cannot be undone.')) return

    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id)

      if (error) throw error

      router.push('/admin/faqs')
    } catch (error) {
      console.error('Error deleting FAQ:', error)
      alert('Error deleting FAQ. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/faqs">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to FAQs
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Edit FAQ</h1>
        </div>
        <div className="text-center py-8">Loading FAQ...</div>
      </div>
    )
  }

  if (!faq) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/faqs">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to FAQs
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">FAQ Not Found</h1>
        </div>
        <Card>
          <CardContent className="text-center py-8">
            <p>The FAQ you're looking for doesn't exist.</p>
            <Link href="/admin/faqs" className="mt-4 inline-block">
              <Button>Back to FAQs</Button>
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
          <Link href="/admin/faqs">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to FAQs
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Edit FAQ</h1>
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
            <CardTitle>FAQ Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="question">Question</Label>
              <Input
                id="question"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                placeholder="What is your question?"
                required
              />
            </div>

            <div>
              <Label htmlFor="answer">Answer</Label>
              <Textarea
                id="answer"
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                placeholder="Provide a detailed answer..."
                rows={6}
                required
              />
            </div>

            <div>
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                placeholder="Order in which this FAQ appears"
                min="1"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Lower numbers appear first.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Link href="/admin/faqs">
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
