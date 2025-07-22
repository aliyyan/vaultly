import type { Metadata } from "next"
import { ShieldCheck, Lock, Truck, UserCheck } from "lucide-react"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Security & Insurance",
  description: "Learn how we protect your valuables with industry-leading security and comprehensive insurance.",
}

export default function SecurityPage() {
  return (
    <div className="bg-white">
      <section className="bg-dark text-dark-foreground">
        <div className="container mx-auto py-16 md:py-24 text-center">
          <ShieldCheck className="w-20 h-20 text-primary mx-auto mb-4" />
          <h1 className="font-serif text-5xl font-bold">Your Trust is Our Priority</h1>
          <p className="text-center mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            We understand that you're entrusting us with your valuable possessions. We've built our entire process
            around state-of-the-art security and complete transparency to ensure your peace of mind.
          </p>
        </div>
      </section>

      <section className="container mx-auto py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[450px] rounded-lg overflow-hidden shadow-xl bg-gray-100 flex items-center justify-center">
            <Image
              src="/security-vault-image.jpg"
              alt="Secure vault storage facility with organized shelving and climate-controlled environment"
              width={500}
              height={450}
              className="rounded-lg object-contain w-full h-full"
            />
          </div>
          <div>
            <h2 className="font-serif text-4xl font-bold mb-8">Our Security Promise</h2>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <Truck className="w-10 h-10 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-xl">Fully Insured Logistics</h3>
                  <p className="text-gray-600 mt-1">
                    From the moment your item is scanned by the courier, it's protected by our comprehensive insurance
                    policy for its full replacement value. We provide prepaid labels from trusted partners like FedEx
                    and UPS, so you can track your package every step of the way.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <Lock className="w-10 h-10 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-xl">Secure Facility & Vault Storage</h3>
                  <p className="text-gray-600 mt-1">
                    Our facility is monitored 24/7 with video surveillance and on-site security personnel. Your items
                    are handled under camera, and once verified, they are stored in climate-controlled,
                    access-restricted vaults.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <UserCheck className="w-10 h-10 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-xl">Data Privacy & Confidentiality</h3>
                  <p className="text-gray-600 mt-1">
                    Your personal information is protected with bank-level encryption. We will never share your data or
                    the details of your transaction with any third party. Your business with us is completely
                    confidential.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
