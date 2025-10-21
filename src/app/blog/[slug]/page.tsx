import { notFound } from 'next/navigation';
import { getBlogBySlug, getAllBlogs } from '@/lib/posts';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  const posts = await getAllBlogs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="py-12">
      <div className="container mx-auto">
        <Button asChild variant="ghost" className="mb-8">
            <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
            </Link>
        </Button>
        <article className="prose prose-lg dark:prose-invert mx-auto max-w-4xl">
            <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4">{post.title}</h1>
            <p className="text-muted-foreground text-lg mb-8">
              {new Date(post.created_at).toLocaleDateString()}
            </p>
            <div className="space-y-6 text-lg text-foreground/90" dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </div>
    </div>
  );
}
