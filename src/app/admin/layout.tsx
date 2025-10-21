import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  FileText, 
  HelpCircle, 
  Home, 
  Settings,
  LogOut
} from 'lucide-react'
import { AuthProvider } from '@/components/auth-provider'
import AdminHeader from './admin-header'
import AdminContent from './admin-content'

export const metadata: Metadata = {
  title: 'Admin Panel | Tyagi Legal Counsel',
  description: 'Manage blogs and FAQs for Tyagi Legal Counsel',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <AdminContent>
        <div className="min-h-screen bg-gray-50 dark:bg-black">
          <AdminHeader />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex gap-8">
              {/* Main Content */}
              <main className="flex-1">
                {children}
              </main>
            </div>
          </div>
        </div>
      </AdminContent>
    </AuthProvider>
  )
}
