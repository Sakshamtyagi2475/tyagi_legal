
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
            <p className="text-md">
              Comprehensive legal solutions with integrity and dedication.
            </p>
          </div>
          <div className="text-center justify-start items-center flex flex-col">
            <h3 className="font-headline text-lg font-semibold text-foreground ">Navigation</h3>
            <div className="flex gap-3 text-center">
            <ul className="mt-4 flex flex-col gap-3 text-start">
              <li><Link href="/" className="hover:text-primary hover:underline">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary hover:underline">About</Link></li>
              <li><Link href="/services" className="hover:text-primary hover:underline">Services</Link></li>
              </ul>
              <ul className="mt-4 flex flex-col gap-3 text-start">
              <li><Link href="/blog" className="hover:text-primary hover:underline">Blog</Link></li>
              <li><Link href="/faq" className="hover:text-primary hover:underline">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-primary hover:underline">Contact</Link></li>
            </ul></div>
          </div>
          <div className="text-center justify-start items-center flex flex-col">
            <h3 className="font-headline text-lg font-semibold text-foreground">Contact Us</h3>
            <ul className="mt-4 space-y-2 text-md">
              <li>Chamber No. 335, Lawyer Chamber Building, District Court Faridabad, Sector - 12, Faridabad</li>
              <li>Email: tyagiassociatelawyer@gmail.com</li>
              <li>Phone: +91 98733 24300</li>
            </ul>
          </div>
          <div className="text-center justify-start items-center flex flex-col">
            <h3 className="font-headline text-lg font-semibold text-foreground">Follow Us</h3>
            <div className="mt-4 flex flex-col gap-3">
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
          </div>
        </div>
        <div className="mt-12 border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Tyagi Legal Counsel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
