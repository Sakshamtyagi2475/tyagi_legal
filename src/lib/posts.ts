import { supabase, Blog, FAQ } from './supabase'

export async function getAllBlogs(): Promise<Blog[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching blogs:', error)
    return []
  }

  return data || []
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) {
    console.error('Error fetching blog:', error)
    return null
  }

  return data
}

export async function getAllFAQs(): Promise<FAQ[]> {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .order('order', { ascending: true })

  if (error) {
    console.error('Error fetching FAQs:', {
      error,
      message: (error as any)?.message,
      details: (error as any)?.details,
      hint: (error as any)?.hint,
    })
    return []
  }

  return data || []
}

// Static fallback data for development
export const staticBlogs = [
  {
    id: '1',
    title: 'Understanding Wills and Trusts',
    slug: 'understanding-wills-and-trusts',
    content: '<h1>Understanding Wills and Trusts</h1><p>When it comes to estate planning, understanding the difference between wills and trusts is crucial...</p>',
    excerpt: 'Learn the essential differences between wills and trusts for proper estate planning.',
    featured_image: 'https://placehold.co/600x400.png',
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Navigating Small Business Contracts',
    slug: 'navigating-small-business-contracts',
    content: '<h1>Navigating Small Business Contracts</h1><p>Small business owners often find themselves overwhelmed by legal contracts...</p>',
    excerpt: 'Essential guidance for small business owners dealing with legal contracts.',
    featured_image: 'https://placehold.co/600x400.png',
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Divorce Mediation Guide',
    slug: 'divorce-mediation-guide',
    content: '<h1>Divorce Mediation Guide</h1><p>Divorce mediation offers a less adversarial approach to ending a marriage...</p>',
    excerpt: 'Learn how divorce mediation can provide a more amicable solution to marital dissolution.',
    featured_image: 'https://placehold.co/600x400.png',
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

export const staticFAQs = [
  {
    id: '1',
    question: 'Do you offer a free initial consultation?',
    answer: 'Yes—your first consultation is free so we can understand your situation and outline next steps.',
    order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    question: 'How do fees work?',
    answer: 'We provide transparent pricing—fixed-fee where possible, otherwise clear hourly rates with regular updates.',
    order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    question: 'What should I bring to my first meeting?',
    answer: 'Any relevant documents (contracts, IDs, notices, prior correspondence) and a short summary of your goals.',
    order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    question: 'How long does a typical case take?',
    answer: 'Case duration varies depending on complexity. We provide realistic timelines during your initial consultation.',
    order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    question: 'Do you handle cases outside of [Your City]?',
    answer: 'We primarily serve clients in [Your City] and surrounding areas, but can discuss remote consultations for certain matters.',
    order: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]