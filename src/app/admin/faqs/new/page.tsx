'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function NewFAQPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    order: 0
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Get the highest order number and add 1
      const { data: maxOrderData } = await supabase
        .from('faqs')
        .select('order')
        .order('order', { ascending: false })
        .limit(1)

      const nextOrder = maxOrderData && maxOrderData.length > 0 
        ? maxOrderData[0].order + 1 
        : 1

      const { error } = await supabase
        .from('faqs')
        .insert([{
          ...formData,
          order: nextOrder
        }])

      if (error) throw error

      router.push('/admin/faqs')
    } catch (error) {
      console.error('Error creating FAQ:', error)
      alert('Error creating FAQ. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin/faqs">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to FAQs
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">New FAQ</h1>
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
                Lower numbers appear first. Leave as 0 to add to the end.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Link href="/admin/faqs">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Creating...' : 'Create FAQ'}
          </Button>
        </div>
      </form>
    </div>
  )
}
