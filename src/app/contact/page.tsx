import ContactForm from "@/components/contact-form";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto text-center">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Get In Touch</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            We're here to help. Reach out to us with your legal questions, and our team will get back to you promptly.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-headline text-3xl font-bold">Contact Information</h2>
              <p className="mt-2 text-muted-foreground">
                Find us at our office, or contact us via email or phone. We look forward to hearing from you.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Our Office</h3>
                  <p className="text-muted-foreground">123 Legal Avenue, Lawtown, ST 54321</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Email Us</h3>
                  <p className="text-muted-foreground">contact@tyagilegal.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Call Us</h3>
                  <p className="text-muted-foreground">(123) 456-7890</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-lg border bg-card p-8 shadow-lg">
             <h2 className="font-headline text-3xl font-bold">Send Us a Message</h2>
             <p className="mt-2 mb-6 text-muted-foreground">
                Fill out the form below for a free consultation.
              </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
