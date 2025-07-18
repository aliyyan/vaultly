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
  Phone
} from "lucide-react"

export default function HomePage() {
  const premiumCategories = [
    { 
      name: "Luxury Watches", 
      img: "/asset-watch.png", 
      href: "/assets-we-fund#watches",
      range: "$1K - $50K",
      description: "Rolex, Patek Philippe, Audemars Piguet",
      featured: true
    },
    { 
      name: "Fine Jewelry", 
      img: "/asset-jewelry.png", 
      href: "/assets-we-fund#jewelry",
      range: "$500 - $25K", 
      description: "Diamonds, precious metals, designer pieces",
      featured: true
    },
    { 
      name: "Designer Handbags", 
      img: "/asset-handbag.png", 
      href: "/assets-we-fund#handbags",
      range: "$500 - $15K",
      description: "Hermès, Chanel, Louis Vuitton, Gucci",
      featured: true
    },
    { 
      name: "Premium Electronics", 
      img: "/asset-electronics.png", 
      href: "/assets-we-fund#electronics",
      range: "$500 - $10K",
      description: "Latest phones, laptops, cameras",
      featured: false
    },
    { 
      name: "Musical Instruments", 
      img: "/asset-instrument.png", 
      href: "/assets-we-fund#instruments",
      range: "$500 - $20K",
      description: "Guitars, violins, professional equipment",
      featured: false
    },
    { 
      name: "Photography Equipment", 
      img: "/asset-camera.png", 
      href: "/assets-we-fund#cameras",
      range: "$500 - $15K",
      description: "Canon, Nikon, Leica, professional lenses",
      featured: false
    },
    { 
      name: "Collectibles & Art", 
      img: "/fine-art-category.png", 
      href: "/assets-we-fund#art",
      range: "$1K - $100K",
      description: "Paintings, sculptures, rare collectibles",
      featured: false
    },
    { 
      name: "Luxury Accessories", 
      img: "/luxury-watch-category.png", 
      href: "/assets-we-fund#accessories",
      range: "$500 - $10K",
      description: "Pens, cufflinks, luxury lifestyle items",
      featured: false
    }
  ]

  const processSteps = [
    {
      number: "01",
      title: "AI-Powered Valuation",
      description: "Upload photos and details. Our AI provides instant preliminary quotes based on market data.",
      image: "/process-step1.png",
      icon: Camera
    },
    {
      number: "02", 
      title: "White-Glove Pickup",
      description: "Complimentary insured courier service picks up your items with real-time tracking.",
      image: "/process-step2.png",
      icon: Shield
    },
    {
      number: "03",
      title: "Expert Authentication", 
      description: "Our certified specialists authenticate and appraise your items using advanced technology.",
      image: "/process-step3.png",
      icon: Eye
    },
    {
      number: "04",
      title: "Instant Wire Transfer",
      description: "Same-day wire transfer once approved. Keep buyback rights for up to 12 months.",
      image: "/process-funding.png", 
      icon: Zap
    }
  ]

  const stats = [
    { number: "$500M+", label: "Assets Funded", icon: DollarSign },
    { number: "24hrs", label: "Average Funding Time", icon: Clock },
    { number: "98%", label: "Customer Satisfaction", icon: Star },
    { number: "50K+", label: "Happy Clients", icon: Users },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Art Collector, Manhattan",
      image: "/testimonial-sarah.png",
      quote: "Vaultly provided a $15K advance on my Rolex in under 12 hours. The white-glove service and fair valuation exceeded all expectations.",
      rating: 5,
      amount: "$15,000",
      item: "Rolex Submariner"
    },
    {
      name: "David Rodriguez", 
      role: "Entrepreneur, Beverly Hills",
      image: "/testimonial-david.png",
      quote: "Needed quick capital for my startup. Vaultly funded $25K against my art collection with complete professionalism and transparency.",
      rating: 5,
      amount: "$25,000", 
      item: "Art Collection"
    }
  ]

  const trustIndicators = [
    { name: "A+ BBB Rating", logo: "/logo-forbes.png" },
    { name: "As Seen in Forbes", logo: "/logo-forbes.png" },
    { name: "WSJ Featured", logo: "/logo-wsj.png" },
    { name: "Bloomberg Coverage", logo: "/logo-bloomberg.png" },
    { name: "TechCrunch Review", logo: "/logo-techcrunch.png" }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
        <div className="container mx-auto py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col items-start space-y-8">
              <div className="flex items-center space-x-3">
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 text-sm font-semibold">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Premium Asset Funding
                </Badge>
                <Badge variant="outline" className="border-green-500 text-green-700 px-3 py-1">
                  <Shield className="w-3 h-3 mr-1" />
                  Insured & Secure
                </Badge>
              </div>
              
              <h1 className="font-serif text-6xl md:text-7xl font-bold text-gray-900 leading-tight">
                Unlock Your
                <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 bg-clip-text text-transparent"> Asset's Value</span>
              </h1>
              
              <p className="text-xl text-gray-700 max-w-lg leading-relaxed">
                Get instant cash advances from <strong>$500 to $50,000</strong> for your luxury items. 
                Professional valuation, white-glove service, and the option to buy back your treasures.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-full px-10 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <Link href="/apply">
                    Get Instant Quote
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="rounded-full px-8 py-6 text-lg border-2 border-gray-300 hover:border-amber-500 bg-white hover:bg-amber-50 transition-all duration-300"
                >
                  <Link href="/how-it-works">How It Works</Link>
                </Button>
              </div>
              
              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1,2,3,4,5].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 border-3 border-white flex items-center justify-center text-white text-xs font-bold">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-semibold text-gray-900">50,000+ Happy Clients</div>
                    <div className="flex items-center space-x-1">
                      {[1,2,3,4,5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">4.9/5 Rating</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>No Credit Checks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>24hr Funding</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>12mo Buyback</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800">
                <Image
                  src="/hero-flatlay.png"
                  alt="Luxury collection including Rolex watch, designer handbag, and premium electronics"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Floating Value Cards */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="text-2xl font-bold text-gray-900">$25,000</div>
                  <div className="text-sm text-gray-600">Instant Valuation</div>
                </div>
                
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="text-3xl font-bold mb-2">Premium Asset Collection</h3>
                  <p className="text-gray-200 text-lg">Professional authentication and market-leading valuations</p>
                </div>
              </div>
              
              {/* Floating Trust Indicators */}
              <div className="absolute -top-4 -left-4 bg-green-500 text-white p-4 rounded-full shadow-lg animate-pulse">
                <Shield className="w-8 h-8" />
              </div>
              <div className="absolute top-1/3 -right-6 bg-amber-500 text-white p-4 rounded-full shadow-lg animate-pulse" style={{animationDelay: '1s'}}>
                <Award className="w-8 h-8" />
              </div>
              <div className="absolute -bottom-6 left-1/3 bg-blue-500 text-white p-4 rounded-full shadow-lg animate-pulse" style={{animationDelay: '2s'}}>
                <TrendingUp className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-gray-900 text-white py-12">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <p className="text-gray-400 text-sm uppercase tracking-wide">Trusted by industry leaders</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Image
                  src={indicator.logo}
                  alt={indicator.name}
                  width={120}
                  height={40}
                  className="filter brightness-0 invert opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-20">
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
                <div className="text-amber-100 text-sm md:text-base font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Process Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Get Funded in 4 Simple Steps
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process combines cutting-edge technology with white-glove service
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-white hover:bg-gradient-to-br hover:from-white hover:to-amber-50">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-amber-600 mb-2">{step.number}</div>
                  <CardTitle className="text-xl font-bold text-gray-900">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 leading-relaxed mb-6">
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
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-full px-12 py-6 text-lg font-semibold shadow-xl"
            >
              <Link href="/how-it-works">
                Learn More About Our Process
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Premium Asset Categories */}
      <section className="py-24" id="assets">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Premium Assets We Fund
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From luxury timepieces to rare collectibles, we provide competitive funding for high-value assets
            </p>
          </div>
          
          {/* Featured Categories */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {premiumCategories.filter(cat => cat.featured).map((category, index) => (
              <Link href={category.href} key={category.name}>
                <Card className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white hover:bg-gradient-to-br hover:from-white hover:to-amber-50">
                  <div className="relative h-80">
                    <Image
                      src={category.img}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-amber-500 text-white px-3 py-1 font-semibold">
                        {category.range}
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
          
          {/* All Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {premiumCategories.filter(cat => !cat.featured).map((category, index) => (
              <Link href={category.href} key={category.name}>
                <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white hover:bg-gradient-to-br hover:from-white hover:to-amber-50">
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
                      <p className="text-xs text-gray-300">{category.range}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-full px-12 py-6 text-lg font-semibold shadow-xl"
            >
              <Link href="/assets-we-fund">
                View All Categories
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-24">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              Client Success Stories
            </h2>
            <p className="text-xl text-gray-300">Real clients, real results, real satisfaction</p>
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
                  
                  <div className="flex justify-between items-center mb-6">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 rounded-full">
                      <span className="text-white font-bold">{testimonial.amount}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-amber-400 font-semibold">{testimonial.item}</div>
                      <div className="text-gray-400 text-sm">Asset Funded</div>
                    </div>
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

      {/* Enhanced CTA Section */}
      <section className="relative bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto text-center text-white relative z-10">
          <h2 className="font-serif text-5xl md:text-6xl font-bold mb-8">
            Ready to Unlock Your Asset's Value?
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Join thousands of satisfied clients who chose Vaultly for fast, fair, and professional asset funding. 
            Get your instant quote today and discover what your valuables are worth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button
              size="lg"
              asChild
              className="bg-white text-amber-600 hover:bg-gray-100 rounded-full px-12 py-6 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Link href="/apply">
                Get Instant Quote
                <ArrowRight className="w-6 h-6 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-2 border-white text-white hover:bg-white hover:text-amber-600 rounded-full px-10 py-6 text-lg backdrop-blur-sm"
            >
              <Link href="/contact">
                <Phone className="w-5 h-5 mr-2" />
                Speak to Expert
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-sm">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-green-300" />
              <span>Free valuation & quotes</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-green-300" />
              <span>No credit checks required</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-green-300" />
              <span>12-month buyback guarantee</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
