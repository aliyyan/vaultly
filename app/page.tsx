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
  MapPin,
  CreditCard,
  Heart
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

  const simpleProcess = [
    {
      number: "01",
      title: "Get Your Quote",
      description: "Upload photos and details of your luxury item. Get an instant cash offer in minutes.",
      image: "/process-step1.png",
      icon: Camera
    },
    {
      number: "02", 
      title: "Get Paid Fast",
      description: "Accept your offer and receive cash in your account within 24 hours.",
      image: "/process-step2.png",
      icon: Zap
    },
    {
      number: "03",
      title: "Keep Your Options Open", 
      description: "Your item is safely stored. Buy it back anytime within 90 days if you want.",
      image: "/buyback-image.png",
      icon: Heart
    }
  ]

  const stats = [
    { number: "$50M+", label: "Paid Out", icon: DollarSign },
    { number: "24hrs", label: "Average Payout", icon: Clock },
    { number: "15K+", label: "Happy Customers", icon: Users },
    { number: "4.9★", label: "Customer Rating", icon: Star },
  ]

  const testimonials = [
    {
      name: "Sarah C.",
      role: "Business Owner, Austin TX",
      image: "/testimonial-sarah.png",
      quote: "Got $8,500 cash for my watch in one day. Super easy process and totally stress-free!",
      rating: 5,
      saleAmount: "$8,500",
      item: "Designer Watch",
      timeframe: "Same day"
    },
    {
      name: "David R.", 
      role: "Entrepreneur, Miami FL",
      image: "/testimonial-david.png",
      quote: "Perfect for when you need cash fast but don't want to permanently lose your valuables.",
      rating: 5,
      saleAmount: "$12,000",
      item: "Camera Equipment",
      timeframe: "24 hours"
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
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 text-sm font-semibold animate-pulse">
                  <Zap className="w-4 h-4 mr-2" />
                  Get Cash in 24 Hours
                </Badge>
                <Badge variant="outline" className="border-orange-500 text-orange-700 px-3 py-1">
                  <Star className="w-3 h-3 mr-1 fill-orange-500 text-orange-500" />
                  4.9/5 Rating
                </Badge>
              </div>
              
              <h1 className="font-serif text-6xl md:text-7xl font-bold text-gray-900 leading-tight">
                Turn Your Luxury Items Into
                <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent"> Instant Cash</span>
              </h1>
              
              <p className="text-xl text-gray-700 max-w-lg leading-relaxed">
                Get <strong>up to $25,000 cash</strong> for your luxury watches, jewelry, handbags and more. 
                <strong>Keep the option to buy back</strong> within 90 days if you change your mind.
              </p>
              
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-green-800">$500 - $25,000</div>
                    <div className="text-green-700 text-sm">Cash available today</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-800">24hrs</div>
                    <div className="text-green-700 text-sm">Average payout time</div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full px-12 py-6 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <Link href="/apply">
                    Get My Cash Quote
                    <ArrowRight className="w-6 h-6 ml-2" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="rounded-full px-8 py-6 text-lg border-2 border-gray-300 hover:border-green-500 bg-white hover:bg-green-50 transition-all duration-300"
                >
                  <Link href="#how-it-works">See How It Works</Link>
                </Button>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>No Credit Checks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Same Day Cash</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>90-Day Buyback Option</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800">
                <Image
                  src="/hero-flatlay.png"
                  alt="Luxury assets that can be turned into instant cash"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">$25K</div>
                    <div className="text-sm text-gray-600">Max Cash Today</div>
                  </div>
                </div>
                
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="text-3xl font-bold mb-2">Your Luxury Assets = Instant Cash</h3>
                  <p className="text-gray-200 text-lg">Get paid today, keep the option to buy back later</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-white/20 p-4 rounded-full">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-green-100 text-sm md:text-base font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Process Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white" id="how-it-works">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Get Cash in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              It takes just minutes to get your quote. No paperwork, no credit checks, no hassle.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {simpleProcess.map((step, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-white hover:bg-gradient-to-br hover:from-white hover:to-green-50">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <step.icon className="w-12 h-12 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-green-600 mb-2">{step.number}</div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 leading-relaxed mb-6 text-lg">
                    {step.description}
                  </CardDescription>
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

          <div className="text-center mt-16">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full px-12 py-6 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Link href="/apply">
                Start Getting Cash Now
                <ArrowRight className="w-6 h-6 ml-3" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Asset Categories */}
      <section className="py-24" id="assets">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              What We Pay Cash For
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Turn your luxury items into instant cash. We pay top dollar for authentic, high-value pieces.
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
                      <Badge className="bg-green-500 text-white px-4 py-2 font-bold block text-center text-lg">
                        Up to {category.maxFunding}
                      </Badge>
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
                      <p className="text-xs text-green-300 font-semibold">Up to {category.maxFunding}</p>
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
              Real People, Real Cash, Real Fast
            </h2>
            <p className="text-xl text-gray-300">See what our customers are saying about getting instant cash</p>
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
                  <blockquote className="text-white text-xl leading-relaxed mb-8">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-3 rounded-lg text-center">
                      <div className="text-white font-bold text-xl">{testimonial.saleAmount}</div>
                      <div className="text-green-100 text-sm">Cash Received</div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-3 rounded-lg text-center">
                      <div className="text-white font-bold text-xl">{testimonial.timeframe}</div>
                      <div className="text-blue-100 text-sm">Time to Cash</div>
                    </div>
                  </div>
                  
                  <div className="text-center mb-6">
                    <div className="text-amber-400 font-semibold text-lg">{testimonial.item}</div>
                    <div className="text-gray-400 text-sm">Item Sold</div>
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

      {/* Final CTA Section */}
      <section className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto text-center text-white relative z-10">
          <h2 className="font-serif text-5xl md:text-6xl font-bold mb-8 text-white">
            Ready to Get Cash Today?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Join thousands who've turned their luxury items into instant cash. 
            Get your quote in minutes and cash in hours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button
              size="lg"
              asChild
              className="bg-white text-green-600 hover:bg-gray-100 rounded-full px-12 py-6 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Link href="/apply">
                Get My Cash Quote Now
                <ArrowRight className="w-6 h-6 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 rounded-full px-10 py-6 text-lg backdrop-blur-sm"
            >
              <Link href="tel:678-779-7465">
                <Phone className="w-5 h-5 mr-2" />
                Call: 678-779-7465
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-sm">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-green-300" />
              <span className="text-white">Same-day cash available</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-green-300" />
              <span className="text-white">No credit checks or fees</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-green-300" />
              <span className="text-white">Option to buy back anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Footer - Moved to bottom and simplified */}
      <section className="bg-gray-900 text-white py-12">
        <div className="container mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold mb-2 text-white">Licensed Operations</h3>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              Vaultly operates as a licensed second-hand dealer in select states. 
              This is an asset purchase service with optional repurchase rights.
            </p>
          </div>
          <div className="text-center">
            <Link href="/legal/terms" className="text-gray-400 hover:text-white text-sm underline mr-6">
              Terms & Conditions
            </Link>
            <Link href="/legal/privacy" className="text-gray-400 hover:text-white text-sm underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
