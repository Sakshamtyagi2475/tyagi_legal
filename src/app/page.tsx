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
    <div className="space-y-20 md:space-y-32">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full">
        <Image
          src="https://placehold.co/1600x900.png"
          alt="Modern law office"
          data-ai-hint="law office interior"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
        <div className="container mx-auto flex h-full items-center justify-center text-center">
          <div className="relative z-10 max-w-3xl text-primary-foreground">
            <h1 className="font-headline text-4xl font-bold md:text-6xl">
              Excellence in Legal Counsel
            </h1>
            <p className="mt-4 text-lg md:text-xl">
              Providing comprehensive legal solutions with integrity and dedication.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/contact">Book a Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="container mx-auto text-center">
        <h2 className="font-headline text-3xl font-bold md:text-4xl">Our Practice Areas</h2>
        <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">We offer a wide range of legal services to meet the diverse needs of our clients.</p>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {practiceAreas.map((area) => (
            <Card key={area.name} className="text-center transition-transform hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <area.icon className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline pt-4">{area.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{area.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button asChild variant="outline" size="lg" className="mt-12">
          <Link href="/services">View All Services</Link>
        </Button>
      </section>

      {/* Why Choose Us */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-headline text-3xl font-bold md:text-4xl">Why Choose Tyagi Legal</h2>
            <p className="mt-4 text-muted-foreground">
              Our firm is built on a foundation of trust, experience, and a relentless pursuit of justice for our clients.
            </p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start">
                <ShieldCheck className="mr-3 mt-1 h-6 w-6 shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">Client-Centric Approach</h3>
                  <p className="text-muted-foreground">We prioritize your needs, offering personalized strategies and transparent communication.</p>
                </div>
              </li>
              <li className="flex items-start">
                <Briefcase className="mr-3 mt-1 h-6 w-6 shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">Proven Track Record</h3>
                  <p className="text-muted-foreground">Our history of successful outcomes speaks to our legal expertise and dedication.</p>
                </div>
              </li>
              <li className="flex items-start">
                <Users className="mr-3 mt-1 h-6 w-6 shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">Experienced Team</h3>
                  <p className="text-muted-foreground">Our attorneys bring a wealth of knowledge and diverse experience to every case.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="h-full min-h-[300px] w-full">
            <Image 
              src="https://placehold.co/600x400.png" 
              alt="Lawyers in a meeting"
              data-ai-hint="lawyers meeting"
              width={600}
              height={400}
              className="rounded-lg object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto text-center">
        <h2 className="font-headline text-3xl font-bold md:text-4xl">What Our Clients Say</h2>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
             <Card key={testimonial.name} className="flex flex-col">
              <CardContent className="flex-grow pt-6">
                <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
              </CardContent>
              <CardHeader className="flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage src={`https://placehold.co/40x40.png?text=${testimonial.initial}`} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.initial}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-left text-base">{testimonial.name}</CardTitle>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
