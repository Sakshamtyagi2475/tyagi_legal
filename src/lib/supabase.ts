import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Blog {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image?: string
  published: boolean
  created_at: string
  updated_at: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  order: number
  created_at: string
  updated_at: string
}
