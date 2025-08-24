import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Target, Scale, Users } from 'lucide-react';

const teamMembers = [
  { name: 'Anjali Tyagi', title: 'Founder & Senior Partner', initial: 'AT', bio: 'With over 20 years of experience, Anjali specializes in high-stakes corporate litigation and client advisory.', dataAiHint: 'professional woman lawyer' },
  { name: 'Rohan Sharma', title: 'Partner, Real Estate Law', initial: 'RS', bio: 'Rohan is a leading expert in real estate law, known for his meticulous approach to complex transactions.', dataAiHint: 'professional man lawyer' },
  { name: 'Priya Desai', title: 'Associate, Family Law', initial: 'PD', bio: 'Priya brings compassion and sharp legal acumen to every family law case she handles.', dataAiHint: 'professional woman portrait' },
  { name: 'Sameer Gupta', title: 'Associate, Corporate Law', initial: 'SG', bio: 'Sameer focuses on mergers and acquisitions, providing strategic counsel to businesses of all sizes.', dataAiHint: 'professional man portrait' },
];

export default function AboutUsPage() {
  return (
    <div className="space-y-24 md:space-y-32 py-12">
      {/* Page Header */}
      <section className="container mx-auto text-center">
        <h1 className="font-headline text-5xl font-bold md:text-7xl">About Us</h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
          A tradition of excellence, a future of innovation.
        </p>
      </section>

      {/* Our Story */}
      <section className="container mx-auto grid items-center gap-12 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <h2 className="font-headline text-4xl font-bold">Our Story</h2>
          <p className="mt-4 text-muted-foreground">
            Founded in 2003 by Anjali Tyagi, our firm began with a simple yet powerful mission: to provide exceptional legal services with a client-first approach. From a small office with a handful of clients, we have grown into a respected institution known for our legal expertise and unwavering commitment to justice.
          </p>
        </div>
        <div className="order-1 md:order-2">
            <Image 
              src="https://placehold.co/600x400.png"
              alt="Law books and gavel"
              data-ai-hint="law books gavel"
              width={600}
              height={400}
              className="rounded-3xl object-cover"
            />
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="container mx-auto">
        <div className="text-center mb-12">
            <h2 className="font-headline text-4xl font-bold md:text-5xl">Our Mission & Values</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">The principles that guide our every action and decision.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="glass-card p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Target className="h-8 w-8" />
            </div>
            <h3 className="font-headline text-2xl font-bold">Client-Centric</h3>
            <p className="mt-2 text-muted-foreground">Your success is our priority. We tailor our strategies to your unique needs and goals.</p>
          </div>
          <div className="glass-card p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Scale className="h-8 w-8" />
            </div>
            <h3 className="font-headline text-2xl font-bold">Integrity</h3>
            <p className="mt-2 text-muted-foreground">We uphold the highest ethical standards, providing honest, transparent, and trustworthy counsel.</p>
          </div>
          <div className="glass-card p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="font-headline text-2xl font-bold">Excellence</h3>
            <p className="mt-2 text-muted-foreground">We are committed to the relentless pursuit of excellence in everything we do.</p>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl font-bold md:text-5xl">Meet Our Team</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            The experienced professionals behind our firm's success.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <div key={member.name} className="glass-card overflow-hidden text-center p-6">
              <Image
                src={`https://placehold.co/400x400.png`}
                alt={member.name}
                data-ai-hint={member.dataAiHint}
                width={400}
                height={400}
                className="w-full h-auto rounded-2xl mb-4"
              />
              <h3 className="font-headline text-2xl font-bold">{member.name}</h3>
              <p className="text-sm text-primary">{member.title}</p>
              <p className="mt-3 text-sm text-muted-foreground">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
