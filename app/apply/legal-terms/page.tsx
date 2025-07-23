"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function LegalTermsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [formData, setFormData] = useState({
    saleAcknowledgment: false,
    noLiabilityAcknowledgment: false,
    marketRiskAcknowledgment: false,
    kycConsent: false,
    termsAgreement: false
  })

  // Get data from URL params
  const userData = {
    firstName: searchParams.get('firstName') || '',
    lastName: searchParams.get('lastName') || '',
    email: searchParams.get('email') || '',
    phone: searchParams.get('phone') || '',
    address: searchParams.get('address') || '',
    city: searchParams.get('city') || '',
    state: searchParams.get('state') || '',
    zipCode: searchParams.get('zipCode') || '',
    assetCategory: searchParams.get('assetCategory') || '',
    assetBrand: searchParams.get('assetBrand') || '',
    assetModel: searchParams.get('assetModel') || '',
    assetCondition: searchParams.get('assetCondition') || '',
    estimatedValue: searchParams.get('estimatedValue') || '',
    assetDescription: searchParams.get('assetDescription') || '',
    quoteId: searchParams.get('quoteId') || '',
    quoteAmount: searchParams.get('quoteAmount') || '',
    buybackAmount: searchParams.get('buybackAmount') || ''
  }

  const fundingByCategory = [
    {
      category: "Luxury Watches",
      maxFunding: "$25,000",
      buybackAmount: "$27,500",
      examples: "Rolex, Patek Philippe, Audemars Piguet",
      icon: "⌚"
    },
    {
      category: "Fine Jewelry", 
      maxFunding: "$15,000",
      buybackAmount: "$16,500",
      examples: "Diamonds, precious metals, designer pieces",
      icon: "💎"
    },
    {
      category: "Designer Handbags",
      maxFunding: "$10,000", 
      buybackAmount: "$11,000",
      examples: "Hermès, Chanel, Louis Vuitton, Gucci",
      icon: "👜"
    },
    {
      category: "Premium Electronics",
      maxFunding: "$5,000",
      buybackAmount: "$5,500", 
      examples: "Latest phones, laptops, cameras",
      icon: "📱"
    },
    {
      category: "Musical Instruments",
      maxFunding: "$8,000",
      buybackAmount: "$8,800",
      examples: "Guitars, violins, professional equipment", 
      icon: "🎸"
    },
    {
      category: "Photography Equipment",
      maxFunding: "$7,500",
      buybackAmount: "$8,250",
      examples: "Canon, Nikon, Leica, professional lenses",
      icon: "📷"
    },
    {
      category: "Other",
      maxFunding: "$10,000",
      buybackAmount: "$11,000",
      examples: "Art, collectibles, antiques, sports memorabilia",
      icon: "🎨"
    }
  ]

  const selectedCategory = fundingByCategory.find(cat => cat.category === userData.assetCategory)

  const handleInputChange = (field: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all checkboxes are checked
    if (!formData.saleAcknowledgment || 
        !formData.noLiabilityAcknowledgment || 
        !formData.marketRiskAcknowledgment || 
        !formData.kycConsent || 
        !formData.termsAgreement) {
      setSubmitError("Please check all required acknowledgments before continuing.")
      return
    }
    
    // Navigate to the legal agreement page with all data
    const urlParams = new URLSearchParams({
      ...userData,
      // Add legal acknowledgments
      saleAcknowledgment: formData.saleAcknowledgment.toString(),
      noLiabilityAcknowledgment: formData.noLiabilityAcknowledgment.toString(),
      marketRiskAcknowledgment: formData.marketRiskAcknowledgment.toString(),
      kycConsent: formData.kycConsent.toString(),
      termsAgreement: formData.termsAgreement.toString()
    })
    
    window.location.href = `/apply/legal-agreement?${urlParams.toString()}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Legal Terms & Disclaimers</h1>
          <p className="text-xl text-gray-600 mb-4">
            Please review and acknowledge the following legal terms
          </p>
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-green-800 font-semibold">
              Your Quote: ${parseFloat(userData.quoteAmount).toLocaleString()}
            </p>
            <p className="text-green-700 text-sm">
              Asset: {userData.assetBrand} {userData.assetModel} | Buyback: ${parseFloat(userData.buybackAmount).toLocaleString()}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Legal Disclaimer */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
            <div className="flex items-start">
              <AlertTriangle className="w-6 h-6 text-amber-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-amber-800 mb-2">IMPORTANT: This is an Asset Sale, Not a Loan</h3>
                <ul className="text-amber-800 space-y-1 list-disc list-inside text-sm">
                  <li>We purchase your asset with full title transfer</li>
                  <li>You receive immediate cash payment of ${parseFloat(userData.quoteAmount).toLocaleString()}</li>
                  <li>Optional 90-day repurchase right (no obligation)</li>
                  <li>No credit checks, no personal liability</li>
                  <li>Available in select states only</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Legal Acknowledgments */}
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-red-600 text-white">
              <CardTitle className="text-white">Required Legal Acknowledgments</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
                <p className="text-red-800 text-sm font-medium">
                  <span className="text-red-500">*</span> All acknowledgments are required to continue
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5" 
                    required 
                    checked={formData.saleAcknowledgment}
                    onChange={(e) => handleInputChange('saleAcknowledgment', e.target.checked)}
                  />
                  <label className="text-gray-700">
                    I acknowledge this is a <strong>sale transaction with optional repurchase rights</strong>, not a loan. 
                    I have no obligation to repurchase my asset. <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5" 
                    required 
                    checked={formData.noLiabilityAcknowledgment}
                    onChange={(e) => handleInputChange('noLiabilityAcknowledgment', e.target.checked)}
                  />
                  <label className="text-gray-700">
                    I understand that <strong>failure to exercise the repurchase option creates no debt or liability</strong> 
                    and will not affect my credit score. <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5" 
                    required 
                    checked={formData.marketRiskAcknowledgment}
                    onChange={(e) => handleInputChange('marketRiskAcknowledgment', e.target.checked)}
                  />
                  <label className="text-gray-700">
                    I acknowledge that Vaultly will assume <strong>full market risk</strong> for my asset after the 
                    repurchase deadline expires. <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5" 
                    required 
                    checked={formData.kycConsent}
                    onChange={(e) => handleInputChange('kycConsent', e.target.checked)}
                  />
                  <label className="text-gray-700">
                    I consent to <strong>identity verification, OFAC screening</strong>, and reporting to law enforcement 
                    databases as required by law. <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5" 
                    required 
                    checked={formData.termsAgreement}
                    onChange={(e) => handleInputChange('termsAgreement', e.target.checked)}
                  />
                  <label className="text-gray-700">
                    I have read and agree to the <Link href="/legal/terms" className="text-blue-600 underline">Terms and Conditions</Link> 
                    and <Link href="/legal/privacy" className="text-blue-600 underline">Privacy Policy</Link>. <span className="text-red-500">*</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => router.back()}
              className="px-8 py-4"
            >
              Back to Quote
            </Button>
            
            <Button
              type="submit"
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full px-12 py-6 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Continue to Legal Agreement
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </div>
          
          {submitError && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200 mt-4">
              {submitError}
            </div>
          )}
          
          <p className="text-sm text-gray-500 text-center mt-4">
            By continuing, you agree to all terms and acknowledge this is a sale transaction for ${parseFloat(userData.quoteAmount).toLocaleString()}
          </p>
        </form>
      </div>
    </div>
  )
} 