import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Vaultly team. We're here to help with any questions you may have.",
}

export default function ContactPage() {
  return (
    <div className="bg-secondary">
      <div className="container mx-auto py-16 md:py-24">
        <div className="text-center">
          <h1 className="font-serif text-5xl font-bold">Get in Touch</h1>
          <p className="text-center mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We're here to answer your questions and help you get started.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Phone className="w-8 h-8 text-primary" />
              <CardTitle>By Phone</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Speak with a member of our team:</p>
              <a href="tel:1-800-555-8285" className="font-bold text-primary text-lg">
                1-800-555-VAULT
              </a>
              <p className="text-sm text-gray-500 mt-2">Mon-Fri, 9am - 5pm EST</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Mail className="w-8 h-8 text-primary" />
              <CardTitle>By Email</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Send us your questions:</p>
              <a href="mailto:support@vaultly.com" className="font-bold text-primary text-lg">
                support@vaultly.com
              </a>
              <p className="text-sm text-gray-500 mt-2">We typically respond within 24 hours.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <MapPin className="w-8 h-8 text-primary" />
              <CardTitle>Our Office</CardTitle>
            </CardHeader>
            <CardContent>
              <p>For mail-in and verification:</p>
              <p className="font-bold text-lg">123 Vault St, Suite 100</p>
              <p className="text-sm text-gray-500 mt-2">New York, NY 10001</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
