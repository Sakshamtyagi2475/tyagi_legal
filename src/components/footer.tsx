
import Link from "next/link";
import { Linkedin, Twitter, Facebook } from "lucide-react";
import Logo from "./logo";

export default function Footer() {
  return (
    <footer className="bg-transparent mt-20">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-muted-foreground">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm">
              Comprehensive legal solutions with integrity and dedication.
            </p>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/" className="hover:text-primary hover:underline">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary hover:underline">About Us</Link></li>
              <li><Link href="/services" className="hover:text-primary hover:underline">Services</Link></li>
              <li><Link href="/blog" className="hover:text-primary hover:underline">Blog</Link></li>
              <li><Link href="/faq" className="hover:text-primary hover:underline">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-primary hover:underline">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground">Contact Us</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>123 Legal Avenue, Lawtown, ST 54321</li>
              <li>Email: contact@tyagilegal.com</li>
              <li>Phone: (123) 456-7890</li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground">Follow Us</h3>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-6 w-6" />
              </Link>
            </div>
            <div className="mt-4">
                <h3 className="font-headline text-lg font-semibold text-foreground">Admin</h3>
                <ul className="mt-4 space-y-2">
                    <li><Link href="/admin" className="hover:text-primary hover:underline">Admin Panel</Link></li>
                </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Tyagi Legal Counsel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
