import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import Link from 'next/link';
import { Briefcase, Landmark, ShieldCheck, Users } from 'lucide-react';

const practiceAreas = [
  { name: 'Business & Corporate', icon: Briefcase, description: 'From starting up to scaling up, we handle the legal details so you can focus on your business.' },
  { name: 'Family Matters', icon: Users, description: 'Guiding you through sensitive family issues with compassion and care.' },
  { name: 'Property Law', icon: Landmark, description: 'Making your property transactions smooth and stress-free, from first home to final sale.' },
  { name: 'Dispute Resolution', icon: ShieldCheck, description: 'Finding the clearest path to resolving conflicts, so you can move forward.' },
];

const testimonials = [
  { name: 'Alex S.', initial: 'AS', quote: 'The team at Tyagi Legal turned a stressful situation into a manageable one. They explained everything clearly and were always there for me. I felt supported every step of the way.' },
  { name: 'Jessica M.', initial: 'JM', quote: 'I was looking for a lawyer who would actually listen. I found that here. They took the time to understand my situation and fought for the best outcome for my family.' },
  { name: 'David L.', initial: 'DL', quote: 'Professional, down-to-earth, and incredibly effective. They handled my case with a perfect mix of personal care and sharp legal skill. I can\'t recommend them enough.' },
]

export default function Home() {
  return (
    <div className="space-y-24 md:space-y-32 py-12">
      {/* Hero Section */}
      <section className="container mx-auto text-center">
        <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="font-headline text-5xl font-bold md:text-8xl bg-gradient-to-b from-black to-gray-700 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              Legal Guidance You Can Rely On
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground">
              Life has its complexities. We're here to provide clear, straightforward legal support to help you find your way through.
            </p>
            <Button asChild size="lg" className="mt-8 rounded-full px-8 py-6 text-lg glass-button">
              <Link href="/contact">Start with a Free Consultation</Link>
            </Button>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="container mx-auto text-center">
        <h2 className="font-headline text-4xl font-bold md:text-5xl">How We Can Help</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">We focus on the areas of law that touch people's everyday lives and businesses.</p>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {practiceAreas.map((area) => (
            <div key={area.name} className="glass-card text-center p-8 transition-transform hover:-translate-y-2">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                <area.icon className="h-10 w-10" />
              </div>
              <h3 className="font-headline text-2xl font-bold">{area.name}</h3>
              <p className="text-muted-foreground mt-2">{area.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <div className="h-full min-h-[400px] w-full">
            <Image 
              src="https://placehold.co/600x600.png" 
              alt="A friendly and welcoming legal office space"
              data-ai-hint="friendly office"
              width={600}
              height={600}
              className="rounded-3xl object-cover"
            />
          </div>
          <div>
            <h2 className="font-headline text-4xl font-bold md:text-5xl">Your Peace of Mind is Our Priority</h2>
            <p className="mt-4 text-lg text-muted-foreground">
             We believe good legal support is about more than just winning cases. It's about making you feel heard, understood, and confident.
            </p>
            <ul className="mt-8 space-y-6">
              <li className="flex items-start gap-4">
                <ShieldCheck className="mr-3 mt-1 h-8 w-8 shrink-0 text-primary" />
                <div>
                  <h3 className="text-xl font-bold">You're Always in the Loop</h3>
                  <p className="text-muted-foreground">We speak your language, not legal jargon. We'll keep you informed and involved every step of the way.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Briefcase className="mr-3 mt-1 h-8 w-8 shrink-0 text-primary" />
                <div>
                  <h3 className="text-xl font-bold">Solutions That Make Sense</h3>
                  <p className="text-muted-foreground">We focus on practical, effective outcomes that work for your unique situation.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Users className="mr-3 mt-1 h-8 w-8 shrink-0 text-primary" />
                <div>
                  <h3 className="text-xl font-bold">A Team That Cares</h3>
                  <p className="text-muted-foreground">We're not just your lawyers; we're your partners and advocates.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto text-center">
        <h2 className="font-headline text-4xl font-bold md:text-5xl">Real Words from Real People</h2>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
             <div key={testimonial.name} className="glass-card flex flex-col p-6">
                <p className="italic text-muted-foreground flex-grow text-lg">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4 mt-6 pt-6 border-t">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`https://placehold.co/48x48.png?text=${testimonial.initial}`} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.initial}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-left text-lg font-bold">{testimonial.name}</h4>
                  </div>
                </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
