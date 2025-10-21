import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, ShieldCheck, Users, Building, ShoppingBag, ScrollText, ShieldAlert, FileSignature, Banknote, Building2, HeartOff, Gavel } from 'lucide-react';

const services = [
  { 
    name: 'Criminal lawyer', 
    icon: Gavel, 
    description: 'Expert in defending clients accused of crimes and legal violations.'
  },
  { 
    name: 'Divorce Lawyer', 
    icon: HeartOff, 
    description: 'Specializes in marriage dissolution, alimony, and child custody matters.'
  },
  { 
    name: 'RERA Lawyer', 
    icon: Building2, 
    description: 'Handles disputes related to real estate projects and property regulations.'
  },
  { 
    name: 'Cheque Bounce lawyer', 
    icon: Banknote, 
    description: 'Manages cases under Negotiable Instruments Act for dishonored cheques.'
  },
  { 
    name: 'Property lawyer', 
    icon: FileSignature, 
    description: 'Deals with property disputes, transfers, registration, and legal verification.'
  },
  { 
    name: 'Anticipatory Bail Lawyer', 
    icon: ShieldCheck, 
    description: 'Assists clients in obtaining pre-arrest protection against criminal charges.'
  },
  { 
    name: 'Cyber Crime Lawyer', 
    icon: ShieldAlert, 
    description: 'Handles online fraud, data breaches, and cyber law violations.'
  },
  { 
    name: 'Civil Lawyer', 
    icon: ScrollText, 
    description: 'Manages non-criminal disputes involving property, contracts, or personal rights.'
  },
  { 
    name: 'Consumer Lawyer', 
    icon: ShoppingBag, 
    description: 'Protects consumer rights against unfair trade practices and product defects.'
  },
  { 
    name: 'Family Lawyer', 
    icon: Users, 
    description: 'Resolves family disputes including adoption, custody, and domestic issues.'
  },
  { 
    name: 'Labour Lawyer', 
    icon: Briefcase, 
    description: 'Advocates for employee rights, workplace disputes, and industrial relations.'
  },
  { 
    name: 'Corporate Lawyer', 
    icon: Building, 
    description: 'Advises companies on compliance, mergers, contracts, and governance issues.'
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {services.map((service) => (
            <div key={service.name} className="glass-card flex flex-col p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-200">
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
