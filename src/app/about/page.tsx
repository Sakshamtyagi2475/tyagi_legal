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
    <div className="space-y-20 md:space-y-32">
      {/* Page Header */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto text-center">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">About Tyagi Legal Counsel</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            A tradition of excellence, a future of innovation. Learn about our firm's journey, values, and the people dedicated to your success.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto grid items-center gap-12 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <h2 className="font-headline text-3xl font-bold">Our Story</h2>
          <p className="mt-4 text-muted-foreground">
            Founded in 2003 by Anjali Tyagi, our firm began with a simple yet powerful mission: to provide exceptional legal services with a client-first approach. From a small office with a handful of clients, we have grown into a respected institution known for our legal expertise and unwavering commitment to justice.
          </p>
          <p className="mt-4 text-muted-foreground">
            Through decades of hard work and dedication, we have built a reputation for tackling complex legal challenges and achieving favorable outcomes. Our history is a testament to our core values of integrity, professionalism, and excellence.
          </p>
        </div>
        <div className="order-1 md:order-2">
            <Image 
              src="https://placehold.co/600x400.png"
              alt="Law books and gavel"
              data-ai-hint="law books gavel"
              width={600}
              height={400}
              className="rounded-lg object-cover shadow-xl"
            />
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto">
          <div className="text-center">
             <h2 className="font-headline text-3xl font-bold md:text-4xl">Our Mission & Values</h2>
             <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">The principles that guide our every action and decision.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Target className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline pt-4">Client-Centric</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Your success is our priority. We tailor our strategies to your unique needs and goals, ensuring you are informed and empowered throughout the legal process.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Scale className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline pt-4">Integrity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We uphold the highest ethical standards, providing honest, transparent, and trustworthy counsel. Our reputation is built on a foundation of integrity.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Users className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline pt-4">Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We are committed to the relentless pursuit of excellence in everything we do, from legal research and strategy to client communication and representation.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="container mx-auto">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">Meet Our Team</h2>
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
            The experienced and dedicated professionals behind our firm's success.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <Card key={member.name} className="overflow-hidden text-center">
              <div className="h-48 w-full">
                <Image
                  src={`https://placehold.co/400x400.png`}
                  alt={member.name}
                  data-ai-hint={member.dataAiHint}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-xl">{member.name}</CardTitle>
                <p className="text-sm text-primary">{member.title}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
