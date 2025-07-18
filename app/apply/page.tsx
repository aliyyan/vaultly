"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, FileText, Camera, CreditCard, MapPin, Clock, DollarSign } from "lucide-react"
import Link from "next/link"

export default function ApplyPage() {
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
    }
  ]

  const requiredDocuments = [
    {
      icon: FileText,
      title: "Government-Issued Photo ID",
      description: "Valid driver's license, passport, or state ID",
      required: true
    },
    {
      icon: Camera,
      title: "Asset Photos",
      description: "High-quality photos from multiple angles",
      required: true
    },
    {
      icon: FileText,
      title: "Proof of Ownership",
      description: "Receipt, certificate, or documentation of ownership",
      required: true
    },
    {
      icon: MapPin,
      title: "Address Verification",
      description: "Utility bill or bank statement within 90 days",
      required: false
    }
  ]

  const eligibleStates = [
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto py-16 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Asset Sale Application</h1>
          <p className="text-xl text-gray-600 mb-4">
            Get an instant quote for your luxury asset
          </p>
          <div className="flex justify-center gap-3">
            <Badge className="bg-green-600 text-white px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              Licensed & Insured
            </Badge>
            <Badge variant="outline" className="border-blue-500 text-blue-700 px-4 py-2">
              <Clock className="w-4 h-4 mr-2" />
              24hr Processing
            </Badge>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-amber-600 mt-1 mr-4 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-amber-800 mb-2">IMPORTANT: This is an Asset Sale, Not a Loan</h3>
              <ul className="text-amber-800 space-y-1 list-disc list-inside text-sm">
                <li>We purchase your asset with full title transfer</li>
                <li>You receive immediate cash payment</li>
                <li>Optional 90-day repurchase right (no obligation)</li>
                <li>No credit checks, no personal liability</li>
                <li>Available in select states only</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Funding Amounts by Category */}
        <Card className="shadow-xl border-0 mb-8">
          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <CardTitle className="flex items-center text-white">
              <DollarSign className="w-6 h-6 mr-3" />
              Maximum Funding & Buyback Amounts by Category
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-6 text-center">
              You are eligible for funding up to the amounts shown below based on your asset category. 
              Your buyback guarantee shows the maximum you would pay to repurchase (10% profit margin).
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fundingByCategory.map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-white to-green-50 p-6 rounded-xl border border-green-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{item.icon}</span>
                    <h4 className="font-bold text-lg text-gray-900">{item.category}</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Max Funding:</span>
                      <span className="font-bold text-green-600 text-lg">{item.maxFunding}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Buyback Amount:</span>
                      <span className="font-bold text-blue-600 text-lg">{item.buybackAmount}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-xs text-gray-500">{item.examples}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-800 text-sm text-center">
                <strong>Profit Margin:</strong> All buyback amounts represent a maximum 10% profit margin. 
                Actual amounts vary based on item condition, market value, and authenticity verification.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* State Eligibility */}
        <Card className="shadow-xl border-0 mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardTitle className="flex items-center text-white">
              <MapPin className="w-6 h-6 mr-3" />
              State Eligibility Check
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">
              We currently operate in the following states. You must be located in one of these states to proceed:
            </p>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-6">
              {eligibleStates.map((state, index) => (
                <div key={index} className="flex flex-col items-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-lg font-bold text-green-800">{state.code}</div>
                  <div className="text-xs text-green-600 text-center">{state.name}</div>
                  <Badge variant="outline" className="text-xs mt-1 border-green-400 text-green-700">
                    {state.status}
                  </Badge>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> If you're in CA, NY, IL, NJ, or DC, this service is not currently available 
              due to regulatory restrictions on sale-and-repurchase transactions.
            </p>
          </CardContent>
        </Card>

        {/* Required Documentation */}
        <Card className="shadow-xl border-0 mb-8">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <CardTitle className="flex items-center text-white">
              <FileText className="w-6 h-6 mr-3" />
              Required Documentation (KYC/AML Compliance)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-6">
              Federal and state regulations require identity verification for all second-hand dealer transactions. 
              Please prepare the following documents:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {requiredDocuments.map((doc, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <doc.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{doc.title}</h4>
                      {doc.required && (
                        <Badge className="bg-red-500 text-white text-xs px-2 py-1">Required</Badge>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">{doc.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-800 text-sm">
                <strong>Privacy Notice:</strong> All personal information is encrypted and used solely for identity 
                verification, OFAC screening, and regulatory compliance. We do not share information with credit bureaus 
                or marketing companies.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Application Process */}
        <Card className="shadow-xl border-0 mb-8">
          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <CardTitle className="text-white">Application Process Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-green-600">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Submit Application</h4>
                <p className="text-gray-600 text-sm">Complete form with asset details and upload required documents</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Identity Verification</h4>
                <p className="text-gray-600 text-sm">KYC check and OFAC screening (usually under 30 minutes)</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Asset Evaluation</h4>
                <p className="text-gray-600 text-sm">Professional appraisal and purchase offer generation</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-orange-600">4</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Complete Sale</h4>
                <p className="text-gray-600 text-sm">Sign purchase agreement and receive wire transfer</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal Acknowledgments */}
        <Card className="shadow-xl border-0 mb-8">
          <CardHeader className="bg-red-600 text-white">
            <CardTitle className="text-white">Legal Acknowledgments (Required)</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1" required />
                <label className="text-gray-700 text-sm">
                  I acknowledge this is a <strong>sale transaction with optional repurchase rights</strong>, not a loan. 
                  I have no obligation to repurchase my asset.
                </label>
              </div>
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1" required />
                <label className="text-gray-700 text-sm">
                  I understand that <strong>failure to exercise the repurchase option creates no debt or liability</strong> 
                  and will not affect my credit score.
                </label>
              </div>
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1" required />
                <label className="text-gray-700 text-sm">
                  I acknowledge that Vaultly will assume <strong>full market risk</strong> for my asset after the 
                  repurchase deadline expires.
                </label>
              </div>
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1" required />
                <label className="text-gray-700 text-sm">
                  I consent to <strong>identity verification, OFAC screening</strong>, and reporting to law enforcement 
                  databases as required by law.
                </label>
              </div>
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1" required />
                <label className="text-gray-700 text-sm">
                  I have read and agree to the <Link href="/legal/terms" className="text-blue-600 underline">Terms and Conditions</Link> 
                  and <Link href="/legal/privacy" className="text-blue-600 underline">Privacy Policy</Link>.
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full px-12 py-6 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Start Asset Sale Application
            <FileText className="w-6 h-6 ml-3" />
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Application takes 5-10 minutes • No credit check required • Same-day funding available
          </p>
        </div>
      </div>
    </div>
  )
}
