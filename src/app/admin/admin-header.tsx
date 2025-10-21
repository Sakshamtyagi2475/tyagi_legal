'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, LogOut, Menu, X } from 'lucide-react'
import { useAuth } from '@/components/auth-provider'
import { useState } from 'react'

export default function AdminHeader() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    router.push('/login')
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/admin" className="text-xl font-bold text-gray-900 dark:text-white">
              Tyagi Legal Admin
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <Home className="h-4 w-4 mr-2" />
                View Site
              </Button>
            </Link>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {user?.email}
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="flex flex-col space-y-3">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Home className="h-4 w-4 mr-2" />
                  View Site
                </Button>
              </Link>
              <div className="text-sm text-gray-600 dark:text-gray-400 px-3 py-2">
                {user?.email}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  handleSignOut()
                  setIsMobileMenuOpen(false)
                }}
                className="w-full justify-start"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
