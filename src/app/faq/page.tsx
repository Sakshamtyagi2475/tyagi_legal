import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "What are the first steps in a property dispute in Haryana?",
    answer: "The first step is usually to gather all your property documents, like the sale deed ('bainama') and land records ('jamabandi'). It's often helpful to try and resolve the issue through discussion first. If that doesn't work, sending a formal legal notice is a common next step before considering going to court. Consulting a lawyer early can save you a lot of trouble."
  },
  {
    question: "How do I file for divorce in Haryana?",
    answer: "In Haryana, you can file for divorce in the family court of the district where you and your spouse last lived together, or where your marriage took place. You'll need to file a petition with the court, which should explain the reason for the divorce. It can be a mutual decision with your spouse or a contested one. It's a sensitive process, so getting guidance from a family lawyer is highly recommended."
  },
  {
    question: "What should I do if a product I bought is faulty?",
    answer: "As a consumer in India, you have rights. First, contact the seller or the company's customer service with your proof of purchase. If they don't resolve the issue, you can file a complaint with the District Consumer Disputes Redressal Forum. The process is designed to be user-friendly, but having a lawyer can help make your case stronger."
  },
  {
    question: "What's the difference between a will and a trust for my property?",
    answer: "Think of a will as a set of instructions for what happens to your property after you pass away. A trust is a bit different; it's a way to manage your property both while you're alive and after. A trust can help avoid the court process of probate, which can be faster and more private for your family. Which one is right for you depends on your personal situation."
  },
  {
    question: "How do I deal with bounced cheques in a business transaction?",
    answer: "A bounced cheque is a criminal offense in India under the Negotiable Instruments Act. The first step is to send a legal notice to the person who issued the cheque within 30 days of it bouncing. If they don't pay within 15 days of receiving the notice, you can file a criminal complaint in court. It's important to act quickly, so consult a lawyer as soon as the cheque bounces."
  },
];

export default function FAQPage() {
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
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="glass-card p-4">
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
