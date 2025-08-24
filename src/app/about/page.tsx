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
        <h1 className="font-headline text-5xl font-bold md:text-7xl">A Little About Us</h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
          Get to know the people dedicated to helping you.
        </p>
      </section>

      {/* Our Story */}
      <section className="container mx-auto grid items-center gap-12 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <h2 className="font-headline text-4xl font-bold">Where We Come From</h2>
          <p className="mt-4 text-muted-foreground">
            It all started in 2003 with a simple idea: legal support should be about helping people, not complicating their lives. Anjali Tyagi founded our firm on this principle, and it's guided us ever since. We've grown from a small office into a place people trust, known for our clear advice and commitment to what's right.
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
            <h2 className="font-headline text-4xl font-bold md:text-5xl">Our Promises to You</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">These are the principles we live by, in every case and for every client.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="glass-card p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Target className="h-8 w-8" />
            </div>
            <h3 className="font-headline text-2xl font-bold">Your Goals First</h3>
            <p className="mt-2 text-muted-foreground">We listen to what you need. Your success is our success, and we build our approach around you.</p>
          </div>
          <div className="glass-card p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Scale className="h-8 w-8" />
            </div>
            <h3 className="font-headline text-2xl font-bold">Honest Guidance</h3>
            <p className="mt-2 text-muted-foreground">We believe in being upfront and clear. You'll always get straight answers and trustworthy advice from us.</p>
          </div>
          <div className="glass-card p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="font-headline text-2xl font-bold">Unwavering Support</h3>
            <p className="mt-2 text-muted-foreground">We're committed to doing our best for you, every single time. It's not just about the law; it's about the people we serve.</p>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl font-bold md:text-5xl">Meet the Team</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            The friendly, experienced professionals ready to help.
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
