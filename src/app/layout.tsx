import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import FloatingCTA from '@/components/floating-cta';

export const metadata: Metadata = {
  title: 'Tyagi Legal Counsel',
  description: 'Professional and elegant legal services for your every need.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased bg-background')}>
        <div className="relative min-h-screen flex flex-col">
          {/* Background Gradient */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-100 via-white to-cyan-100 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/30 opacity-50 -z-10" />
          
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <FloatingCTA />
        <Toaster />
      </body>
    </html>
  );
}
