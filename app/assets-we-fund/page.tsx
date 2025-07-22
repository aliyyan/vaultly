import type { Metadata } from "next"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Assets We Fund",
  description: "See the wide range of valuables we accept, from watches and jewelry to electronics and designer goods.",
}

const assetCategories = [
  { name: "Watches", img: "/asset-watch.png", description: "From Rolex and Omega to Tudor and Seiko." },
  { name: "Jewelry", img: "/asset-jewelry.png", description: "Diamond rings, gold chains, bracelets, and more." },
  { name: "Handbags", img: "/asset-handbag.png", description: "Louis Vuitton, Chanel, Gucci, and other top brands." },
  { name: "Electronics", img: "/asset-electronics.png", description: "Laptops, tablets, phones, and gaming consoles." },
  { name: "Cameras", img: "/asset-camera.png", description: "DSLRs, mirrorless cameras, and high-end lenses." },
  {
    name: "Musical Instruments",
    img: "/asset-instrument.png",
    description: "Guitars, keyboards, and other pro audio gear.",
  },
  {
    name: "Sneakers",
    img: "/asset-sneakers.png",
    description: "Collectible and rare sneakers from Nike, Adidas, etc.",
  },
  {
    name: "Power Tools",
    img: "/asset-tools.png",
    description: "Tool sets from brands like DeWalt, Milwaukee, and Makita.",
  },
]

export default function AssetsWeFundPage() {
  return (
    <div className="bg-white">
      <section className="container mx-auto py-16 md:py-24 text-center">
        <h1 className="font-serif text-5xl font-bold">What We Accept</h1>
        <p className="text-center mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          We provide cash advances for a diverse range of valuable items. If your item has a resale value of at least
          $500, chances are we can make you an offer. Below are some of our most common categories.
        </p>
      </section>

      <section className="container mx-auto pb-20 md:pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {assetCategories.map((category) => (
            <Card
              key={category.name}
              className="overflow-hidden group border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="relative h-60 bg-gray-100">
                <Image
                  src={category.img || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg">{category.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-20 md:py-28">
        <div className="container mx-auto text-center">
          <h2 className="font-serif text-4xl font-bold">Have Something Else?</h2>
          <p className="mt-4 max-w-xl mx-auto text-gray-600">
            If your item isn't listed, don't worry. We accept many other types of valuables. The best way to find out is
            to start your quote.
          </p>
          <Button
            size="lg"
            asChild
            className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 py-7 text-lg"
          >
            <Link href="/apply">Start My Quote</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
