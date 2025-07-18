import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
})

export const metadata: Metadata = {
  title: {
    default: "Vaultly | Premium Asset Funding & Luxury Valuations",
    template: "%s | Vaultly",
  },
  description:
    "Get instant cash advances for your luxury assets. $500-$50,000 funding in 24 hours. Premium watches, jewelry, art, electronics & more. White-glove service with the option to buy back.",
  keywords: [
    "asset funding",
    "luxury valuations", 
    "cash advance",
    "watch appraisal",
    "jewelry funding",
    "art financing",
    "luxury goods",
    "collateral loans",
    "asset-based lending",
    "high-value items"
  ],
  authors: [{ name: "Vaultly Asset Funding" }],
  creator: "Vaultly",
  publisher: "Vaultly",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://vaultly.com"),
  openGraph: {
    title: "Vaultly - Premium Asset Funding & Luxury Valuations",
    description: "Instant cash advances for luxury assets. $500-$50,000 funding in 24 hours with buyback options.",
    url: "https://vaultly.com",
    siteName: "Vaultly",
    images: [
      {
        url: "/hero-flatlay.png",
        width: 1200,
        height: 630,
        alt: "Luxury assets including watches, jewelry and electronics",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaultly - Premium Asset Funding",
    description: "Instant cash advances for luxury assets with white-glove service",
    images: ["/hero-flatlay.png"],
  },
  generator: 'Vaultly Asset Platform'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn("scroll-smooth", inter.variable, playfairDisplay.variable)}>
      <body className="bg-white text-dark">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
