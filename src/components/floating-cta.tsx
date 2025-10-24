'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, MessageCircle, Phone, Mail, MessageSquareDot  } from 'lucide-react';
import Link from 'next/link';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 300;
      setHasScrolled(scrolled);
      
      // Show after scrolling 300px
      if (scrolled && !isVisible) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Expanded Menu */}
      <div 
        className={`mb-4 flex flex-col gap-3 transition-all duration-500 ${
          isExpanded 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <a href="mailto:contact@tyagilegal.com">
          <Button
            className="glass-card shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            variant="secondary"
          >
            <Mail className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
            Email Us
          </Button>
        </a>
        <a href="mailto:contact@tyagilegal.com">
          <Button
            className="glass-card shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            variant="secondary"
          >
            <MessageCircle className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
            WhatsApp
          </Button>
        </a>

        <a href="tel:+1234567890">
          <Button
            className="glass-card shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            variant="secondary"
          >
            <Phone className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
            Call Us Now
          </Button>
        </a>
        <Link href="/contact">
          <Button
            className="glass-card shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            variant="secondary"
          >
            <MessageSquareDot className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
            Send a Message
          </Button>
        </Link>
        
        
      </div>

      {/* Main Toggle Button */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        size="lg"
        className={`flex h-14 w-40 items-center justify-center gap-2 rounded-full shadow-2xl transition-all duration-500 hover:scale-105 group relative overflow-hidden animate-bounce-slow ${
          isExpanded ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'
        }`}
        aria-label={isExpanded ? 'Close menu' : 'Open contact menu'}
      >
        
        <span className="relative flex items-center gap-2 z-10">
          {isExpanded ? (
            <>
              <X className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90" />
              <span>Close</span>
            </>
          ) : (
            <>
              <MessageCircle className="h-6 w-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <span >Book Consultation</span>
            </>
          )}
        </span>
      </Button>

      {/* Tooltip */}
      {!isExpanded && (
        <div 
          className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap bg-foreground text-background px-4 py-2 rounded-lg text-sm font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        >
          Need Help? Contact Us
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-8 border-transparent border-l-foreground" />
        </div>
      )}
    </div>
  );
}