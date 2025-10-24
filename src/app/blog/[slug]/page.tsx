// src/app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getBlogBySlug, getAllBlogs } from '@/lib/posts'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

/**
 * Pre-generates static params for all blog posts.
 */
export async function generateStaticParams() {
  const posts = await getAllBlogs()

  // Ensure only valid slugs are returned
  return posts
    .filter(post => post.slug)
    .map(post => ({
      slug: post.slug,
    }))
}

/**
 * BlogPostPage server component.
 */
export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = await params // ✅ Access directly, do NOT await

  // Fetch blog by slug
  const post = await getBlogBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="py-12">
      <div className="container mx-auto">
        {/* Back button */}
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        {/* Blog content */}
        <article className="prose prose-lg dark:prose-invert mx-auto max-w-4xl">
          {/* Featured image */}
          {post.featured_image && (
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}

          {/* Title */}
          <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-muted-foreground text-lg mb-4">{post.excerpt}</p>
          )}

          {/* Date */}
          <p className="text-muted-foreground text-sm mb-8">
            {new Date(post.created_at).toLocaleDateString()}
          </p>

          {/* Blog HTML content */}
          <div
            className="space-y-6 text-lg text-foreground/90"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  )
}
