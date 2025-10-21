'use client'

import { useAuth } from '@/components/auth-provider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface AdminContentProps {
  children: React.ReactNode
}

export default function AdminContent({ children }: AdminContentProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  // Don't render anything if not authenticated (redirect will happen)
  if (!user) {
    return null
  }

  // Render admin content only when authenticated
  return <>{children}</>
}
