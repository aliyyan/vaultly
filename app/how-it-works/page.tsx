import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "How It Works",
  description: "Learn about Vaultly's simple, 3-step process to get cash for your valuables.",
}

export default function HowItWorksPage() {
  return (
    <div className="bg-white">
      <section className="container mx-auto py-16 md:py-24 text-center">
        <h1 className="font-serif text-5xl font-bold">A Process Built on Speed and Trust</h1>
        <p className="text-center mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          We've removed the complexity and uncertainty of getting cash for your items. Our straightforward process is
          designed to be fast, secure, and completely transparent from start to finish.
        </p>
      </section>

      <section className="py-20 md:py-28 bg-secondary">
        <div className="container mx-auto">
          <div className="relative">
            <div
              className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block"
              aria-hidden="true"
            ></div>
            <div className="space-y-16">
              <div className="md:grid md:grid-cols-2 md:gap-8 items-center relative">
                <div className="md:text-right md:pr-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold mb-4">
                    1
                  </div>
                  <h3 className="font-bold text-2xl">Submit Your Item Online</h3>
                  <p className="text-gray-600 mt-2">
                    Use our simple online form to tell us about your valuable. You'll describe the item and its condition.
                    Photos are highly recommended for more accurate quotes but not required. This initial step takes just a few minutes and provides our experts with
                    the information they need to give you a preliminary offer.
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Image
                    src="/process-submit.png"
                    alt="Person submitting asset details on a laptop"
                    width={500}
                    height={350}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8 items-center relative">
                <div className="md:col-start-2 md:text-left md:pl-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold mb-4">
                    2
                  </div>
                  <h3 className="font-bold text-2xl">Ship Your Item For Free</h3>
                  <p className="text-gray-600 mt-2">
                    If you accept our initial offer, we'll email you a prepaid, fully insured shipping label from FedEx
                    or UPS. Carefully package your item, attach the label, and drop it off at the nearest location. Your
                    item is insured for its full value from the moment it leaves your hands.
                  </p>
                </div>
                <div className="md:col-start-1 md:row-start-1 mt-4 md:mt-0">
                  <Image
                    src="/process-shipping.png"
                    alt="Securely packaged box with a shipping label"
                    width={500}
                    height={350}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8 items-center relative">
                <div className="md:text-right md:pr-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold mb-4">
                    3
                  </div>
                  <h3 className="font-bold text-2xl">Verification & Fast Payment</h3>
                  <p className="text-gray-600 mt-2">
                    Once your item arrives at our secure facility, our team of experts will verify its authenticity and
                    condition. Upon successful verification, we finalize your offer and wire the cash advance directly
                    to your bank account, often on the same day.
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Image
                    src="/process-funding.png"
                    alt="Bank wire transfer confirmation on a phone"
                    width={500}
                    height={350}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto py-20 md:py-28 text-center">
        <h2 className="font-serif text-4xl font-bold">Ready to Start?</h2>
        <p className="mt-4 max-w-xl mx-auto text-gray-600">
          Get your free, no-obligation offer today. It's the first step to unlocking the cash in your valuables.
        </p>
        <Button
          size="lg"
          asChild
          className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 py-7 text-lg"
        >
          <Link href="/apply">Get My Offer</Link>
        </Button>
      </section>
    </div>
  )
}
