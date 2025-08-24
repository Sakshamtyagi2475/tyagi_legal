import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import Link from 'next/link';
import { Briefcase, Landmark, ShieldCheck, Users } from 'lucide-react';

const practiceAreas = [
  { name: 'Corporate Law', icon: Briefcase, description: 'Expert guidance on corporate governance, mergers, and acquisitions.' },
  { name: 'Family Law', icon: Users, description: 'Compassionate handling of divorce, custody, and family matters.' },
  { name: 'Real Estate Law', icon: Landmark, description: 'Seamless transactions for residential and commercial properties.' },
  { name: 'Litigation', icon: ShieldCheck, description: 'Strategic representation in complex civil and commercial disputes.' },
];

const testimonials = [
  { name: 'John D.', initial: 'JD', quote: 'Tyagi Legal provided exceptional service and guided me through a complex legal process with utmost professionalism.' },
  { name: 'Sarah P.', initial: 'SP', quote: 'The team is knowledgeable, responsive, and truly cares about their clients. I couldn\'t have asked for better representation.' },
  { name: 'Michael B.', initial: 'MB', quote: 'Their attention to detail and strategic approach were key to the successful outcome of my case. Highly recommended.' },
]

export default function Home() {
  return (
    <div className="space-y-24 md:space-y-32 py-12">
      {/* Hero Section */}
      <section className="container mx-auto text-center">
        <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="font-headline text-5xl font-bold md:text-8xl bg-gradient-to-b from-black to-gray-700 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              Excellence in Legal Counsel
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground">
              Providing comprehensive legal solutions with integrity and dedication.
            </p>
            <Button asChild size="lg" className="mt-8 rounded-full px-8 py-6 text-lg glass-button">
              <Link href="/contact">Book a Free Consultation</Link>
            </Button>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="container mx-auto text-center">
        <h2 className="font-headline text-4xl font-bold md:text-5xl">Our Practice Areas</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">We offer a wide range of legal services to meet the diverse needs of our clients.</p>
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
              alt="Lawyers in a meeting"
              data-ai-hint="lawyers meeting"
              width={600}
              height={600}
              className="rounded-3xl object-cover"
            />
          </div>
          <div>
            <h2 className="font-headline text-4xl font-bold md:text-5xl">Why Choose Tyagi Legal</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our firm is built on a foundation of trust, experience, and a relentless pursuit of justice for our clients.
            </p>
            <ul className="mt-8 space-y-6">
              <li className="flex items-start gap-4">
                <ShieldCheck className="mr-3 mt-1 h-8 w-8 shrink-0 text-primary" />
                <div>
                  <h3 className="text-xl font-bold">Client-Centric Approach</h3>
                  <p className="text-muted-foreground">We prioritize your needs, offering personalized strategies and transparent communication.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Briefcase className="mr-3 mt-1 h-8 w-8 shrink-0 text-primary" />
                <div>
                  <h3 className="text-xl font-bold">Proven Track Record</h3>
                  <p className="text-muted-foreground">Our history of successful outcomes speaks to our legal expertise and dedication.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Users className="mr-3 mt-1 h-8 w-8 shrink-0 text-primary" />
                <div>
                  <h3 className="text-xl font-bold">Experienced Team</h3>
                  <p className="text-muted-foreground">Our attorneys bring a wealth of knowledge and diverse experience to every case.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto text-center">
        <h2 className="font-headline text-4xl font-bold md:text-5xl">What Our Clients Say</h2>
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
