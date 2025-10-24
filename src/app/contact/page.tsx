import ContactForm from "@/components/contact-form";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="py-12">
      {/* Page Header */}
      <section className="container mx-auto text-center">
        <h1 className="font-headline text-5xl font-bold md:text-7xl">Get In Touch</h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
            We're here to help. Reach out to us with your legal questions.
        </p>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary flex-shrink-0">
                <MapPin className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-headline">Our Office</h3>
                <ul className="flex flex-col gap-4 list-disc">
                  <li>A- 37, Lower Ground Floor (Basement) Amar Colony, Opposite SS Khalsa School, Lajpat Nagar- IV, Delhi - 110024</li>
                  <li>B-98, Nehru Ground NIT Faridabad, BK Chowk, Nehru Ground, New Industrial Township, near Head Post Office, Faridabad, Haryana 121001</li>
                  <li>Chamber No. 335, Lawyer Chamber Building, District Court Faridabad, Sector - 12, Faridabad</li>
                  <li>E- 150, Sector 22, Noida, Uttar Pradesh - 201301</li>
                  <li>District Court Surajpur, Greater Noida</li>
                  <li>Chamber No. 148, Saheed Bhagat Singh Block, Gurgaon District Court, Gurgaon</li>
                </ul>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary flex-shrink-0">
                <Mail className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-headline">Email Us</h3>
                <p className="text-muted-foreground text-lg">tyagiassociatelawyer@gmail.com</p>
                <p className="text-muted-foreground text-lg">juslexlawyer@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary flex-shrink-0">
                <Phone className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-headline">Call Us</h3>
                <p className="text-muted-foreground text-lg">+91 98733 24300</p>
                <p className="text-muted-foreground text-lg">+91 85069 24300</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card p-8">
             <h2 className="font-headline text-3xl font-bold mb-4">Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
