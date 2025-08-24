"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet";
import Logo from "./logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Our Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-4 z-40 w-full">
      <div className="container mx-auto flex h-20 items-center justify-between rounded-3xl border border-white/20 bg-white/50 px-6 shadow-lg shadow-black/5 backdrop-blur-lg dark:border-white/10 dark:bg-white/5">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-2 md:flex">
          {navLinks.map(({ href, label }) => (
            <Button key={href} asChild variant="ghost" className={cn("text-base", pathname === href ? "text-primary font-bold" : "text-muted-foreground")}>
              <Link href={href}>
                {label}
              </Link>
            </Button>
          ))}
          <Button asChild className="ml-4 rounded-full glass-button">
            <Link href="/contact">Book Consultation</Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background/80 backdrop-blur-xl">
               <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              <div className="flex h-full flex-col">
                <div className="mb-8 flex items-center justify-between border-b pb-4">
                  <Logo />
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="flex flex-1 flex-col space-y-2">
                  {navLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className={cn(
                        "text-xl font-medium transition-colors hover:text-primary py-2 px-4 rounded-lg",
                        pathname === href ? "text-primary bg-primary/10" : "text-foreground/80"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
                 <Button asChild size="lg" className="mt-auto rounded-full glass-button">
                    <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Book Consultation</Link>
                  </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
