import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Landmark, ShieldCheck, Users, BrainCircuit, Building, BookOpen, Handshake } from 'lucide-react';

const services = [
  { 
    name: 'Corporate Law', 
    icon: Briefcase, 
    description: 'Expert guidance on corporate governance, mergers, acquisitions, and compliance for businesses of all sizes.'
  },
  { 
    name: 'Family Law', 
    icon: Users, 
    description: 'Compassionate and robust representation in all family matters, including divorce, child custody, and prenuptial agreements.'
  },
  { 
    name: 'Real Estate Law', 
    icon: Landmark, 
    description: 'Seamless legal services for residential and commercial real estate transactions, from agreements to disputes.'
  },
  { 
    name: 'Litigation & Dispute Resolution', 
    icon: ShieldCheck, 
    description: 'Strategic and vigorous representation in complex civil and commercial disputes in court, arbitration, or mediation.'
  },
  { 
    name: 'Intellectual Property', 
    icon: BrainCircuit, 
    description: 'Protection and monetization of your valuable intellectual assets, including patents, trademarks, and copyrights.'
  },
  { 
    name: 'Commercial Law', 
    icon: Building, 
    description: 'Comprehensive legal support for all your commercial activities, from contracts to business structures.'
  },
  { 
    name: 'Estate Planning', 
    icon: BookOpen, 
    description: 'Personalized estate planning services including wills, trusts, and powers of attorney to protect your assets.'
  },
  { 
    name: 'Mediation & Arbitration', 
    icon: Handshake, 
    description: 'Effective alternative dispute resolution services to resolve conflicts outside of court, saving time and resources.'
  },
];

export default function ServicesPage() {
  return (
    <div className="py-12">
      {/* Page Header */}
      <section className="container mx-auto text-center">
        <h1 className="font-headline text-5xl font-bold md:text-7xl">Our Legal Services</h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
          A comprehensive range of expert legal services tailored to meet the diverse needs of our clients.
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
