import type { Metadata } from "next"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Find answers to common questions about Vaultly's services, process, and security.",
}

export default function FAQPage() {
  return (
    <div className="bg-white">
      <section className="container mx-auto py-16 md:py-24">
        <div className="text-center">
          <h1 className="font-serif text-5xl font-bold">Frequently Asked Questions</h1>
          <p className="text-center mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Have a question? We've got answers. If you don't see what you're looking for, please don't hesitate to
            contact us.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mt-16">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium text-left">
                Is this a loan? Will it affect my credit score?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                No, this is not a loan. Vaultly engages in sale-repurchase agreements. This means we buy your item and
                you have the option to buy it back. Because it's not a loan, we do not perform any credit checks, and
                your transaction is never reported to credit agencies. It has zero impact on your credit score.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-medium text-left">
                What happens if I decide not to buy my item back?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Absolutely nothing. If you choose not to exercise your buy-back option, the transaction is simply
                complete. Vaultly retains ownership of the item, and you have no further obligation. There are no
                penalties or hidden fees.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-medium text-left">
                How do you determine the value of my item?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Our in-house experts use real-time market data from a variety of sources, including recent auction
                results and sales records, to determine the current fair market value of your item. Our goal is to
                provide you with the most competitive offer possible.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-medium text-left">What are the fees involved?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We believe in transparency. There are no application fees or hidden charges. The cost of our service is
                a flat premium that is included in your repurchase price. You will know the exact amount you need to pay
                to buy back your item before you even ship it to us.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg font-medium text-left">
                How long do I have to buy my item back?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We offer flexible repurchase option periods, typically ranging from 30 to 90 days. You can choose the
                term that works best for you. In some cases, extensions may be possible. Please discuss options with
                your personal concierge.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  )
}
