import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Vaultly's mission to provide fast, fair, and confidential liquidity solutions.",
}

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="container mx-auto py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="font-serif text-5xl font-bold">Providing Financial Flexibility.</h1>
            <p className="mt-4 text-lg text-gray-600">
              Vaultly was founded on a simple idea: the value you've built in your possessions should be accessible when
              you need it most. Traditional financial systems can be slow, invasive, and unforgiving. Selling your
              cherished items often means losing them forever for a fraction of their worth.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              We created a better way. A way to get fast, fair cash for your valuables without credit checks, without
              long-term debt, and without saying a permanent goodbye to your items. Our mission is to provide a secure,
              respectful, and transparent service that empowers you to leverage your assets on your terms.
            </p>
          </div>
          <div className="relative h-[450px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/about-us-image.png"
              alt="A clean, modern office space representing the Vaultly team"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20 md:py-28">
        <div className="container mx-auto text-center">
          <h2 className="font-serif text-4xl font-bold">Have Questions?</h2>
          <p className="mt-4 max-w-xl mx-auto text-gray-600">
            We're here to help. Explore our frequently asked questions or get in touch with our friendly team.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8"
            >
              <Link href="/faq">Read our FAQ</Link>
            </Button>
            <Button size="lg" asChild variant="outline" className="rounded-full px-8 border-gray-300 bg-transparent">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
