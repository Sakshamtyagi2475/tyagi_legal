'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Edit, 
  Trash2, 
  HelpCircle,
  GripVertical,
  CircleArrowLeft
} from 'lucide-react'
import Link from 'next/link'
import { supabase, FAQ } from '@/lib/supabase'

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFAQs()
  }, [])

  const fetchFAQs = async () => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('order', { ascending: true })

      if (error) throw error
      setFaqs(data || [])
    } catch (error: any) {
      console.error('Error fetching FAQs:', {
        error,
        message: error?.message,
        details: error?.details,
        hint: error?.hint,
      })
    } finally {
      setLoading(false)
    }
  }

  const deleteFAQ = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return

    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchFAQs() // Refresh the list
    } catch (error) {
      console.error('Error deleting FAQ:', error)
    }
  }

  const updateOrder = async (id: string, newOrder: number) => {
    try {
      const { error } = await supabase
        .from('faqs')
        .update({ order: newOrder })
        .eq('id', id)

      if (error) throw error
      fetchFAQs() // Refresh the list
    } catch (error) {
      console.error('Error updating FAQ order:', error)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">FAQ Management</h1>
        </div>
        <div className="text-center py-8">Loading FAQs...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">FAQ Management</h1>
        <Link href="/admin/faqs/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New FAQ
          </Button>
        </Link>
        <Link href="/admin/dashboard">
          <Button className='bg-gray-800'>
            <CircleArrowLeft className="h-4 w-4 mr-2" />
              Go Back
          </Button>
        </Link>
      </div>

      {faqs.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <HelpCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No FAQs yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Get started by creating your first FAQ
            </p>
            <Link href="/admin/faqs/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create First FAQ
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={faq.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex items-center space-x-2">
                      <GripVertical className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline">#{faq.order}</Badge>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                      <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateOrder(faq.id, faq.order - 1)}
                      disabled={index === 0}
                    >
                      ↑
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateOrder(faq.id, faq.order + 1)}
                      disabled={index === faqs.length - 1}
                    >
                      ↓
                    </Button>
                    <Link href={`/admin/faqs/${faq.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteFAQ(faq.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
