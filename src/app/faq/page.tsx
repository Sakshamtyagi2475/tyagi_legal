import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getAllFAQs, staticFAQs } from '@/lib/posts';

export default async function FAQPage() {
  const fetched = await getAllFAQs();
  const faqs = fetched.length > 0 ? fetched : staticFAQs;

  return (
    <div className="py-12">
      {/* Page Header */}
      <section className="container mx-auto text-center">
        <h1 className="font-headline text-5xl font-bold md:text-7xl">Common Questions</h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
          Finding clarity on common legal questions in our community.
        </p>
      </section>

      {/* FAQ Accordion */}
      <section className="container mx-auto mt-20 max-w-4xl">
        <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={`item-${faq.id}`} className="glass-card p-4">
            <AccordionTrigger className="text-left text-xl font-headline font-bold hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="pt-4 text-lg text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
        </Accordion>
      </section>
    </div>
  );
}
