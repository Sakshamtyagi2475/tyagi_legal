import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Landmark, ShieldCheck, Users, BrainCircuit, Building, BookOpen, Handshake } from 'lucide-react';

const services = [
  { 
    name: 'For Your Business', 
    icon: Briefcase, 
    description: 'Whether you\'re just starting out or growing your business, we handle the legal details so you can focus on your vision.'
  },
  { 
    name: 'For Your Family', 
    icon: Users, 
    description: 'Navigating sensitive family matters like divorce or custody with care and clear-headed advice.'
  },
  { 
    name: 'For Your Property', 
    icon: Landmark, 
    description: 'We make buying, selling, or managing property straightforward and secure, protecting your investment.'
  },
  { 
    name: 'When You Disagree', 
    icon: ShieldCheck, 
    description: 'If you\'re facing a dispute, we\'ll find the best path forward, whether in court or through negotiation.'
  },
  { 
    name: 'Your Big Ideas', 
    icon: BrainCircuit, 
    description: 'Protecting your creative work and inventions, from trademarks to patents, so your ideas remain yours.'
  },
  { 
    name: 'Day-to-Day Business', 
    icon: Building, 
    description: 'From contracts to partnerships, we provide the legal backbone for your everyday commercial operations.'
  },
  { 
    name: 'Planning for the Future', 
    icon: BookOpen, 
    description: 'Helping you create a clear plan with wills and trusts to protect your legacy and provide for your loved ones.'
  },
  { 
    name: 'Finding Common Ground', 
    icon: Handshake, 
    description: 'Resolving conflicts peacefully and practically through mediation, saving you time, stress, and money.'
  },
];

export default function ServicesPage() {
  return (
    <div className="py-12">
      {/* Page Header */}
      <section className="container mx-auto text-center">
        <h1 className="font-headline text-5xl font-bold md:text-7xl">Legal Support for Your Life</h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
          We offer clear, practical advice for the moments that matter most, whether in your business or personal life.
        </p>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.name} className="glass-card flex flex-col p-8 transition-shadow hover:shadow-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <service.icon className="h-8 w-8" />
                </div>
                <h2 className="font-headline text-2xl font-bold">{service.name}</h2>
              </div>
              <p className="text-muted-foreground flex-grow">{service.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
