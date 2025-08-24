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
                <p className="text-muted-foreground text-lg">123 Legal Avenue, Lawtown, ST 54321</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary flex-shrink-0">
                <Mail className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-headline">Email Us</h3>
                <p className="text-muted-foreground text-lg">contact@tyagilegal.com</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary flex-shrink-0">
                <Phone className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-headline">Call Us</h3>
                <p className="text-muted-foreground text-lg">(123) 456-7890</p>
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
