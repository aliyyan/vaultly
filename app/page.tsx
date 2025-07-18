import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  CheckCircle2, 
  Shield, 
  Clock, 
  TrendingUp, 
  Star, 
  Eye, 
  Zap, 
  Globe, 
  Smartphone,
  Award,
  Sparkles,
  DollarSign,
  Users,
  ArrowRight,
  Camera,
  Phone,
  FileText,
  AlertTriangle,
  MapPin
} from "lucide-react"

export default function HomePage() {
  const premiumCategories = [
    { 
      name: "Luxury Watches", 
      img: "/asset-watch.png", 
      href: "/assets-we-fund#watches",
      maxFunding: "$25,000",
      maxBuyback: "$27,500",
      description: "Rolex, Patek Philippe, Audemars Piguet",
      featured: true
    },
    { 
      name: "Fine Jewelry", 
      img: "/asset-jewelry.png", 
      href: "/assets-we-fund#jewelry",
      maxFunding: "$15,000",
      maxBuyback: "$16,500", 
      description: "Diamonds, precious metals, designer pieces",
      featured: true
    },
    { 
      name: "Designer Handbags", 
      img: "/asset-handbag.png", 
      href: "/assets-we-fund#handbags",
      maxFunding: "$10,000",
      maxBuyback: "$11,000",
      description: "Hermès, Chanel, Louis Vuitton, Gucci",
      featured: true
    },
    { 
      name: "Premium Electronics", 
      img: "/asset-electronics.png", 
      href: "/assets-we-fund#electronics",
      maxFunding: "$5,000",
      maxBuyback: "$5,500",
      description: "Latest phones, laptops, cameras",
      featured: false
    },
    { 
      name: "Musical Instruments", 
      img: "/asset-instrument.png", 
      href: "/assets-we-fund#instruments",
      maxFunding: "$8,000",
      maxBuyback: "$8,800",
      description: "Guitars, violins, professional equipment",
      featured: false
    },
    { 
      name: "Photography Equipment", 
      img: "/asset-camera.png", 
      href: "/assets-we-fund#cameras",
      maxFunding: "$7,500",
      maxBuyback: "$8,250",
      description: "Canon, Nikon, Leica, professional lenses",
      featured: false
    }
  ]

  const legalProcess = [
    {
      number: "01",
      title: "Asset Evaluation & Purchase Offer",
      description: "We evaluate your item and make a cash purchase offer. This is a complete sale transaction, not a loan.",
      image: "/process-step1.png",
      icon: Camera,
      legal: "Bill of Sale executed upon acceptance"
    },
    {
      number: "02", 
      title: "Secure Transfer & Payment",
      description: "We purchase your item with full title transfer and immediate cash payment via wire transfer.",
      image: "/process-step2.png",
      icon: Shield,
      legal: "Full legal and equitable title transferred"
    },
    {
      number: "03",
      title: "Professional Storage & Insurance", 
      description: "Your formerly-owned item is stored in our insured facility. We assume all market risk and ownership.",
      image: "/process-step3.png",
      icon: Eye,
      legal: "Vaultly assumes 100% ownership and market risk"
    },
    {
      number: "04",
      title: "Optional Repurchase Rights",
      description: "You have the exclusive option (not obligation) to repurchase your former item at a fixed price within 90 days.",
      image: "/process-funding.png", 
      icon: Zap,
      legal: "Repurchase option expires automatically - no personal liability"
    }
  ]

  const pricingTable = [
    { purchaseAmount: "$500 - $999", repurchasePrice: "+$100 - $150", term: "90 days" },
    { purchaseAmount: "$1,000 - $2,499", repurchasePrice: "+$150 - $300", term: "90 days" },
    { purchaseAmount: "$2,500 - $4,999", repurchasePrice: "+$300 - $500", term: "90 days" },
    { purchaseAmount: "$5,000 - $9,999", repurchasePrice: "+$500 - $800", term: "90 days" },
    { purchaseAmount: "$10,000 - $24,999", repurchasePrice: "+$800 - $1,500", term: "90 days" },
    { purchaseAmount: "$25,000+", repurchasePrice: "Custom pricing", term: "90 days" }
  ]

  const greenStates = [
    { code: "TX", name: "Texas", status: "Active" },
    { code: "FL", name: "Florida", status: "Active" },
    { code: "GA", name: "Georgia", status: "Active" },
    { code: "AZ", name: "Arizona", status: "Active" },
    { code: "UT", name: "Utah", status: "Active" },
    { code: "AL", name: "Alabama", status: "Active" },
    { code: "SC", name: "South Carolina", status: "Active" },
    { code: "CO", name: "Colorado", status: "Limited" },
    { code: "NV", name: "Nevada", status: "Limited" }
  ]

  const testimonials = [
    {
      name: "Sarah C.",
      role: "Business Owner, Austin TX",
      image: "/testimonial-sarah.png",
      quote: "Professional service and fair valuation. The process was transparent and exactly as described.",
      rating: 5,
      saleAmount: "$8,500",
      repurchaseAmount: "$9,350",
      item: "Designer Watch"
    },
    {
      name: "David R.", 
      role: "Entrepreneur, Miami FL",
      image: "/testimonial-david.png",
      quote: "Quick process with clear terms. Got the funding I needed and understood exactly what I was agreeing to.",
      rating: 5,
      saleAmount: "$12,000",
      repurchaseAmount: "$13,200", 
      item: "Camera Equipment"
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
        <div className="container mx-auto py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col items-start space-y-8">
              <div className="flex items-center space-x-3">
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 text-sm font-semibold">
                  <FileText className="w-4 h-4 mr-2" />
                  Licensed Asset Purchases
                </Badge>
                <Badge variant="outline" className="border-blue-500 text-blue-700 px-3 py-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  9 States Licensed
                </Badge>
              </div>
              
              <h1 className="font-serif text-6xl md:text-7xl font-bold text-gray-900 leading-tight">
                Sell Your Assets
                <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent"> Today</span>
              </h1>
              
              <p className="text-xl text-gray-700 max-w-lg leading-relaxed">
                <strong>Immediate cash purchases</strong> from $500 to $25,000 for luxury items. 
                <strong>Not a loan</strong> - we purchase your asset with full title transfer and optional 90-day repurchase rights.
              </p>
              
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div className="text-sm text-amber-800">
                    <strong>Important:</strong> This is a sale transaction with optional repurchase rights, not a loan. 
                    You have no obligation to repurchase. Available in select states only.
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full px-10 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <Link href="/apply">
                    Get Purchase Quote
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="rounded-full px-8 py-6 text-lg border-2 border-gray-300 hover:border-green-500 bg-white hover:bg-green-50 transition-all duration-300"
                >
                  <Link href="/legal/terms">View Legal Terms</Link>
                </Button>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>No Credit Checks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>24hr Purchase</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>90-day Repurchase Option</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800">
                <Image
                  src="/hero-flatlay.png"
                  alt="Luxury assets available for purchase including watches, jewelry and electronics"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="text-2xl font-bold text-gray-900">Up to $25K</div>
                  <div className="text-sm text-gray-600">Cash Purchase</div>
                  <div className="text-xs text-gray-500 mt-1">+10% repurchase fee</div>
                </div>
                
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="text-3xl font-bold mb-2">Asset Purchase Program</h3>
                  <p className="text-gray-200 text-lg">Immediate cash with optional repurchase rights</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Compliance Notice */}
      <section className="bg-gray-900 text-white py-12">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4 text-white">Licensed Operations in Select States</h3>
            <p className="text-gray-300 max-w-4xl mx-auto">
              Vaultly operates as a licensed second-hand dealer in compliance with state regulations. 
              We purchase assets with full title transfer - this is not a loan or pawn transaction.
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
            {greenStates.map((state, index) => (
              <div key={index} className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-white">{state.name} ({state.code})</span>
                <Badge variant="outline" className="text-xs border-gray-400 text-gray-300">
                  {state.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparent Pricing Table */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Transparent Pricing Structure
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fixed-dollar repurchase fees, not percentage rates. Clear pricing with no hidden costs.
            </p>
          </div>
          
          <Card className="max-w-4xl mx-auto shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              <CardTitle className="text-2xl text-center text-white">Asset Purchase & Repurchase Pricing</CardTitle>
              <CardDescription className="text-green-100 text-center">
                All prices in US Dollars - No percentage rates or hidden fees
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-gray-900">Purchase Amount</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-900">Repurchase Fee</th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-900">Repurchase Period</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {pricingTable.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{row.purchaseAmount}</td>
                        <td className="px-6 py-4 text-green-600 font-semibold">{row.repurchasePrice}</td>
                        <td className="px-6 py-4 text-gray-600">{row.term}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-amber-50 p-6 rounded-b-lg border-t border-amber-200">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-amber-800">
                    <p className="font-semibold mb-2">Important Legal Disclosure:</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>This is a <strong>sale and repurchase transaction</strong>, not a loan</li>
                      <li>You have <strong>no obligation</strong> to repurchase your former asset</li>
                      <li>Failure to exercise repurchase option results in <strong>no debt or liability</strong></li>
                      <li>Vaultly assumes <strong>full market risk</strong> after repurchase deadline expires</li>
                      <li>All transactions subject to <strong>ID verification</strong> and <strong>anti-money laundering</strong> compliance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Legal Process Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Legal Sale & Repurchase Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our compliant 4-step process ensures full legal protection for both parties
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {legalProcess.map((step, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-white hover:bg-gradient-to-br hover:from-white hover:to-green-50">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-green-600 mb-2">{step.number}</div>
                  <CardTitle className="text-xl font-bold text-gray-900">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 leading-relaxed mb-4">
                    {step.description}
                  </CardDescription>
                  <div className="bg-green-50 p-3 rounded-lg mb-6">
                    <p className="text-xs text-green-800 font-medium">{step.legal}</p>
                  </div>
                  <div className="h-48 relative rounded-xl overflow-hidden shadow-md">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Asset Categories */}
      <section className="py-24" id="assets">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Assets We Purchase
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              High-value luxury items with established market values and resale demand
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {premiumCategories.filter(cat => cat.featured).map((category, index) => (
              <Link href={category.href} key={category.name}>
                <Card className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white hover:bg-gradient-to-br hover:from-white hover:to-green-50">
                  <div className="relative h-80">
                    <Image
                      src={category.img}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute top-4 right-4 space-y-2">
                      <Badge className="bg-green-500 text-white px-3 py-1 font-semibold block text-center">
                        Up to {category.maxFunding}
                      </Badge>
                      <div className="bg-white/90 px-3 py-1 rounded text-xs text-gray-800 font-medium text-center">
                        Buyback: {category.maxBuyback}
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="text-gray-200 text-sm">{category.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {premiumCategories.filter(cat => !cat.featured).map((category, index) => (
              <Link href={category.href} key={category.name}>
                <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white hover:bg-gradient-to-br hover:from-white hover:to-green-50">
                  <div className="relative h-48">
                    <Image
                      src={category.img}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h4 className="font-bold text-sm mb-1">{category.name}</h4>
                      <p className="text-xs text-gray-300">Up to {category.maxFunding}</p>
                      <p className="text-xs text-green-300">Buyback: {category.maxBuyback}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-24">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-white">
              Client Success Stories
            </h2>
            <p className="text-xl text-gray-300">Real transactions, honest feedback, transparent results</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <blockquote className="text-white text-lg leading-relaxed mb-8">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-3 rounded-lg text-center">
                      <div className="text-white font-bold text-lg">{testimonial.saleAmount}</div>
                      <div className="text-green-100 text-sm">Sale Amount</div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-3 rounded-lg text-center">
                      <div className="text-white font-bold text-lg">{testimonial.repurchaseAmount}</div>
                      <div className="text-blue-100 text-sm">Repurchase Price</div>
                    </div>
                  </div>
                  
                  <div className="text-center mb-6">
                    <div className="text-amber-400 font-semibold text-lg">{testimonial.item}</div>
                    <div className="text-gray-400 text-sm">Asset Transacted</div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 relative rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-lg">{testimonial.name}</div>
                      <div className="text-gray-300">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Legal CTA Section */}
      <section className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto text-center text-white relative z-10">
          <h2 className="font-serif text-5xl md:text-6xl font-bold mb-8 text-white">
            Ready to Sell Your Asset?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Get your instant quote today with no obligation to repurchase. 
            Licensed operations in 9 states with transparent pricing and no hidden fees.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button
              size="lg"
              asChild
              className="bg-white text-green-600 hover:bg-gray-100 rounded-full px-12 py-6 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Link href="/apply">
                Get Purchase Quote
                <ArrowRight className="w-6 h-6 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 rounded-full px-10 py-6 text-lg backdrop-blur-sm"
            >
              <Link href="/legal/terms">
                <FileText className="w-5 h-5 mr-2" />
                Read Legal Terms
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-sm">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-green-300" />
              <span className="text-white">Licensed second-hand dealer operations</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-green-300" />
              <span className="text-white">Full title transfer - not a loan</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-green-300" />
              <span className="text-white">No personal liability or credit impact</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
