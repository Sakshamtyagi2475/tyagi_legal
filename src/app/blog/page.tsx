import Link from 'next/link';
import { posts } from '@/lib/posts';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="py-12">
      <section className="container mx-auto text-center">
        <h1 className="font-headline text-5xl font-bold md:text-7xl">Our Blog</h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
          Sharing insights and clarity on common legal questions.
        </p>
      </section>

      <section className="container mx-auto mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.slug} className="glass-card flex flex-col">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">{post.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{post.date}</p>
              </CardHeader>
              <CardDescription className="px-6 pb-6 flex-grow">{post.description}</CardDescription>
              <CardFooter>
                 <Button asChild variant="link" className="p-0 h-auto text-primary">
                  <Link href={`/blog/${post.slug}`}>
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
