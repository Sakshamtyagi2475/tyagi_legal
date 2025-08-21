import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Landmark, ShieldCheck, Users, BrainCircuit, Building, BookOpen, Handshake } from 'lucide-react';

const services = [
  { 
    name: 'Corporate Law', 
    icon: Briefcase, 
    description: 'Expert guidance on corporate governance, mergers, acquisitions, and compliance. We provide strategic legal advice to businesses of all sizes, from startups to established corporations, ensuring your operations are legally sound and positioned for growth.'
  },
  { 
    name: 'Family Law', 
    icon: Users, 
    description: 'Compassionate and robust representation in all family matters, including divorce, child custody, and prenuptial agreements. We navigate these sensitive issues with care, protecting your interests and helping you move forward.'
  },
  { 
    name: 'Real Estate Law', 
    icon: Landmark, 
    description: 'Seamless legal services for residential and commercial real estate transactions. We handle everything from purchase and sale agreements to zoning issues and landlord-tenant disputes, safeguarding your property investments.'
  },
  { 
    name: 'Litigation & Dispute Resolution', 
    icon: ShieldCheck, 
    description: 'Strategic and vigorous representation in complex civil and commercial disputes. Our experienced litigators are prepared to advocate for you in court, arbitration, or mediation to achieve the best possible outcome.'
  },
  { 
    name: 'Intellectual Property', 
    icon: BrainCircuit, 
    description: 'Protection and monetization of your valuable intellectual assets. We assist with patents, trademarks, copyrights, and trade secrets, helping you secure and enforce your rights in a competitive marketplace.'
  },
  { 
    name: 'Commercial Law', 
    icon: Building, 
    description: 'Comprehensive legal support for all your commercial activities. We draft and negotiate contracts, advise on business structures, and help you navigate the complexities of commercial regulations to minimize risk and maximize opportunity.'
  },
  { 
    name: 'Estate Planning', 
    icon: BookOpen, 
    description: 'Personalized estate planning services to protect your assets and provide for your loved ones. We assist with wills, trusts, and powers of attorney, giving you peace of mind for the future.'
  },
  { 
    name: 'Mediation & Arbitration', 
    icon: Handshake, 
    description: 'Effective alternative dispute resolution services to resolve conflicts outside of court. Our skilled mediators and arbitrators facilitate constructive dialogue to reach fair and timely resolutions, saving you time and resources.'
  },
];

export default function ServicesPage() {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto text-center">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Our Legal Services</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            We provide a comprehensive range of expert legal services tailored to meet the diverse needs of our individual and corporate clients.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.name} className="flex flex-col transition-shadow hover:shadow-xl">
              <CardHeader className="flex-row items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <service.icon className="h-6 w-6" />
                </div>
                <CardTitle className="font-headline text-xl">{service.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
