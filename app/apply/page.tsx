"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Shield, FileText, Camera, CreditCard, MapPin, Clock, DollarSign, ArrowRight, CheckCircle2, User, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { createAssetApplication } from "@/lib/supabase"

function ApplyPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [applicationId, setApplicationId] = useState<number | null>(null)
  const [needsMoreInfo, setNeedsMoreInfo] = useState(false)

  // Initialize form data from URL params if available (when returning from quote page)
  const [formData, setFormData] = useState(() => {
    const firstName = searchParams.get('firstName') || ""
    const lastName = searchParams.get('lastName') || ""
    const email = searchParams.get('email') || ""
    const phone = searchParams.get('phone') || ""
    const address = searchParams.get('address') || ""
    const city = searchParams.get('city') || ""
    const state = searchParams.get('state') || ""
    const zipCode = searchParams.get('zipCode') || ""
    const assetCategory = searchParams.get('assetCategory') || ""
    const assetBrand = searchParams.get('assetBrand') || ""
    const assetModel = searchParams.get('assetModel') || ""
    const assetCondition = searchParams.get('assetCondition') || ""
    const estimatedValue = searchParams.get('estimatedValue') || ""
    const assetDescription = searchParams.get('assetDescription') || ""
    const needsMoreInfoFlag = searchParams.get('needsMoreInfo') === 'true'

    if (needsMoreInfoFlag) {
      setNeedsMoreInfo(true)
    }

    return {
      // Personal Information
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      zipCode,
      
      // Asset Information
      assetCategory,
      assetBrand,
      assetModel,
      assetCondition,
      estimatedValue,
      assetDescription,
      
      // Legal Acknowledgments
      saleAcknowledgment: false,
      noLiabilityAcknowledgment: false,
      marketRiskAcknowledgment: false,
      kycConsent: false,
      termsAgreement: false
    }
  })

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

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    const requiredFields = [
      { field: 'firstName', label: 'First Name' },
      { field: 'lastName', label: 'Last Name' },
      { field: 'email', label: 'Email' },
      { field: 'phone', label: 'Phone' },
      { field: 'address', label: 'Address' },
      { field: 'city', label: 'City' },
      { field: 'state', label: 'State' },
      { field: 'zipCode', label: 'Zip Code' },
      { field: 'assetCategory', label: 'Asset Category' },
      { field: 'assetBrand', label: 'Asset Brand' },
      { field: 'assetModel', label: 'Asset Model' },
      { field: 'assetCondition', label: 'Asset Condition' },
      { field: 'estimatedValue', label: 'Estimated Value' }
    ]
    
    const missingFields = requiredFields.filter(({ field }) => !formData[field as keyof typeof formData])
    
    if (missingFields.length > 0) {
      const fieldNames = missingFields.map(({ label }) => label).join(', ')
      setSubmitError(`Please fill out all required fields: ${fieldNames}`)
      return
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setSubmitError("Please enter a valid email address")
      return
    }
    
    // Validate estimated value is a number
    if (isNaN(parseFloat(formData.estimatedValue)) || parseFloat(formData.estimatedValue) <= 0) {
      setSubmitError("Please enter a valid estimated value")
      return
    }
    
    setSubmitError("") // Clear any previous errors
    
    // Redirect to quote page with form data as URL parameters
    const urlParams = new URLSearchParams({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      assetCategory: formData.assetCategory,
      assetBrand: formData.assetBrand,
      assetModel: formData.assetModel,
      assetCondition: formData.assetCondition,
      estimatedValue: formData.estimatedValue,
      assetDescription: formData.assetDescription
    })
    
    window.location.href = `/apply/quote?${urlParams.toString()}`
  }

  const handleStep2Submit = (e: React.FormEvent) => {
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
    
    // Navigate to the legal agreement page instead of going to step 3
    window.location.href = '/apply/legal-agreement'
  }

  // Helper functions for category-specific guidance
  const getCategorySpecificGuidance = (category: string, brand: string) => {
    const brandLower = brand.toLowerCase()
    
    if (category === "Luxury Watches") {
      if (brandLower.includes('rolex')) {
        return (
          <ul className="text-blue-700 text-xs space-y-1 list-disc list-inside">
            <li>Reference number (e.g., 116610LN, 126234)</li>
            <li>Year of manufacture or purchase</li>
            <li>Box & papers included?</li>
            <li>Serial number location and visibility</li>
            <li>Service history if available</li>
          </ul>
        )
      }
      if (brandLower.includes('patek') || brandLower.includes('philippe')) {
        return (
          <ul className="text-blue-700 text-xs space-y-1 list-disc list-inside">
            <li>Complete model number (e.g., 5711/1A-010)</li>
            <li>Year and certificate of origin</li>
            <li>Case material and dial color</li>
            <li>Service documentation</li>
          </ul>
        )
      }
      return (
        <ul className="text-blue-700 text-xs space-y-1 list-disc list-inside">
          <li>Model/reference number</li>
          <li>Year and condition details</li>
          <li>Box, papers, and certificates</li>
          <li>Service history if available</li>
        </ul>
      )
    }
    
    if (category === "Vehicles") {
      return (
        <ul className="text-blue-700 text-xs space-y-1 list-disc list-inside">
          <li>Year, exact mileage, VIN (last 6 digits)</li>
          <li>Engine type and transmission</li>
          <li>Service records and maintenance history</li>
          <li>Title status and accident history</li>
          <li>Modifications or aftermarket parts</li>
        </ul>
      )
    }
    
    if (category === "Designer Handbags") {
      if (brandLower.includes('hermes')) {
        return (
          <ul className="text-blue-700 text-xs space-y-1 list-disc list-inside">
            <li>Model and size (e.g., Birkin 30cm)</li>
            <li>Leather type (Togo, Clemence, Epsom)</li>
            <li>Hardware color (Gold, Palladium)</li>
            <li>Date stamp and authenticity cards</li>
          </ul>
        )
      }
      return (
        <ul className="text-blue-700 text-xs space-y-1 list-disc list-inside">
          <li>Model, size, and color</li>
          <li>Material type and hardware</li>
          <li>Serial numbers or date codes</li>
          <li>Authenticity documentation</li>
        </ul>
      )
    }
    
    if (category === "Collectibles") {
      return (
        <ul className="text-blue-700 text-xs space-y-1 list-disc list-inside">
          <li>Grading details (PSA, BGS, CGC scores)</li>
          <li>Set name and card numbers</li>
          <li>Edition type (1st Edition, Limited)</li>
          <li>Condition and certification</li>
        </ul>
      )
    }
    
    if (category === "Electronics") {
      if (brandLower.includes('apple')) {
        return (
          <ul className="text-blue-700 text-xs space-y-1 list-disc list-inside">
            <li>Exact model and storage capacity</li>
            <li>Color and carrier status (if phone)</li>
            <li>Battery health and screen condition</li>
            <li>Original accessories and AppleCare+</li>
          </ul>
        )
      }
      return (
        <ul className="text-blue-700 text-xs space-y-1 list-disc list-inside">
          <li>Model number and specifications</li>
          <li>Age, condition, and functionality</li>
          <li>Original accessories included</li>
          <li>Purchase date and warranty status</li>
        </ul>
      )
    }
    
    return (
      <ul className="text-blue-700 text-xs space-y-1 list-disc list-inside">
        <li>Brand, model, and specifications</li>
        <li>Age, condition, and functionality</li>
        <li>Serial numbers or unique identifiers</li>
        <li>Original accessories and documentation</li>
      </ul>
    )
  }

  const getPlaceholderText = (category: string, brand: string) => {
    const brandLower = brand.toLowerCase()
    
    if (category === "Luxury Watches" && brandLower.includes('rolex')) {
      return "e.g., 126610LN Submariner, 2023, complete with box and papers, serial S12345, excellent condition"
    }
    if (category === "Vehicles") {
      return "e.g., 2020 BMW M3, 32,000 miles, VIN ending 123456, 3.0L Twin Turbo, Manual, full service records, clean title"
    }
    if (category === "Designer Handbags" && brandLower.includes('hermes')) {
      return "e.g., Birkin 30cm Togo Black with Gold hardware, 2019 T stamp, complete with box and authenticity card"
    }
    if (category === "Electronics" && brandLower.includes('apple')) {
      return "e.g., iPhone 15 Pro 256GB Space Black, Unlocked, 95% battery health, original box and cables"
    }
    if (category === "Collectibles") {
      return "e.g., Charizard Base Set 4/102, 1st Edition, PSA 10, English holo, perfect centering"
    }
    
    return "Include specific details like model numbers, serial numbers, condition, age, accessories, and any unique features"
  }

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Navigate to the legal agreement page instead of submitting to database
    window.location.href = '/apply/legal-agreement'
  }

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto py-16 max-w-4xl">
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

          {/* Step 1: Basic Information Form */}
          <form onSubmit={handleStep1Submit} className="space-y-8">
            {/* Personal Information */}
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <CardTitle className="flex items-center text-white">
                  <User className="w-6 h-6 mr-3" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    required
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      required
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Select onValueChange={(value) => handleInputChange('state', value)} required>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {eligibleStates.map((state) => (
                          <SelectItem key={state.code} value={state.code}>
                            {state.name} ({state.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Asset Information */}
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <CardTitle className="flex items-center text-white">
                  <DollarSign className="w-6 h-6 mr-3" />
                  Asset Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="assetCategory">Asset Category *</Label>
                  <Select onValueChange={(value) => handleInputChange('assetCategory', value)} required>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select asset category" />
                    </SelectTrigger>
                    <SelectContent>
                      {fundingByCategory.map((category) => (
                        <SelectItem key={category.category} value={category.category}>
                          {category.icon} {category.category} (up to {category.maxFunding})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="assetBrand">Brand/Manufacturer *</Label>
                    <Input
                      id="assetBrand"
                      required
                      value={formData.assetBrand}
                      onChange={(e) => handleInputChange('assetBrand', e.target.value)}
                      className="mt-2"
                      placeholder="e.g. Rolex, Canon, Hermès"
                    />
                  </div>
                  <div>
                    <Label htmlFor="assetModel">Model/Name *</Label>
                    <Input
                      id="assetModel"
                      required
                      value={formData.assetModel}
                      onChange={(e) => handleInputChange('assetModel', e.target.value)}
                      className="mt-2"
                      placeholder="e.g. Submariner, 5D Mark IV, Birkin"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="assetCondition">Condition *</Label>
                    <Select onValueChange={(value) => handleInputChange('assetCondition', value)} required>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New/Mint</SelectItem>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="very-good">Very Good</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="estimatedValue">Estimated Value *</Label>
                    <Input
                      id="estimatedValue"
                      required
                      value={formData.estimatedValue}
                      onChange={(e) => handleInputChange('estimatedValue', e.target.value)}
                      className="mt-2"
                      placeholder="$0"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="assetDescription">
                    Detailed Description 
                    {needsMoreInfo && <span className="text-red-500 font-bold"> *Required for accurate quote</span>}
                  </Label>
                  
                  {/* Category-specific guidance */}
                  {formData.assetCategory && !needsMoreInfo && (
                    <div className="mt-2 mb-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-semibold text-blue-800 text-sm mb-2">
                        💡 For the most accurate quote, include:
                      </h4>
                      {getCategorySpecificGuidance(formData.assetCategory, formData.assetBrand)}
                    </div>
                  )}
                  
                  <Textarea
                    id="assetDescription"
                    value={formData.assetDescription}
                    onChange={(e) => handleInputChange('assetDescription', e.target.value)}
                    className={`mt-2 ${needsMoreInfo ? 'border-red-500 border-2 ring-2 ring-red-200' : ''}`}
                    rows={needsMoreInfo ? 6 : 4}
                    placeholder={needsMoreInfo 
                      ? "Please add the specific details requested for your item (reference numbers, serial numbers, condition details, etc.)"
                      : getPlaceholderText(formData.assetCategory, formData.assetBrand)
                    }
                  />
                  {needsMoreInfo && (
                    <div className="mt-2 p-3 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-red-700 text-sm font-medium mb-1">
                            💡 Missing Information Detected
                          </p>
                          <p className="text-red-600 text-xs">
                            Add the specific details shown above to get your accurate quote. 
                            The more details you provide, the better our AI can price your item.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Photo Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-emerald-600" />
                  Item Photos
                  <Badge variant="outline" className="border-emerald-500 text-emerald-700">Highly Suggested</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Camera className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-emerald-800 mb-2">📸 Photos Highly Recommended</p>
                      <p className="text-emerald-700 mb-2">
                        While photos aren't required, uploading <strong>1-3 clear photos</strong> helps us provide more accurate quotes. Show:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-emerald-700">
                        <li>Overall condition and authenticity</li>
                        <li>Any serial numbers, model markings, or signatures (if visible)</li>
                        <li>Key identifying features</li>
                      </ul>
                      <p className="text-emerald-600 text-xs mt-2 font-medium">
                        💡 Items with photos typically receive quotes 15-20% more accurate than description alone
                      </p>
                    </div>
                  </div>
                </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-400 transition-colors">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-600 mb-2">Upload Your Item Photos (Optional)</p>
                    <p className="text-sm text-gray-500 mb-4">
                      Click to select files or drag and drop images here
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        // Handle file upload logic here
                        if (e.target.files) {
                          Array.from(e.target.files).forEach(file => {
                            console.log('Uploaded:', file.name)
                          })
                        }
                      }}
                      className="hidden"
                      id="photo-upload"
                    />
                    <Button 
                      type="button"
                      variant="outline" 
                      onClick={() => document.getElementById('photo-upload')?.click()}
                      className="border-emerald-300 text-emerald-600 hover:bg-emerald-50"
                    >
                      Select Photos
                    </Button>
                    <div className="mt-3 text-xs text-gray-400">
                      Supported formats: JPG, PNG, HEIC • Max 10MB per file • 1-3 photos recommended
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-emerald-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-emerald-800 mb-1">Photo Security & Privacy</p>
                        <p className="text-emerald-700">
                          Your photos are encrypted and only used for valuation purposes. They are automatically deleted after 30 days unless you complete a transaction.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

            {/* Submit Button */}
            <div className="text-center space-y-4">
              {submitError && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                  {submitError}
                </div>
              )}
              <Button
                type="submit"
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full px-12 py-6 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Get Instant Quote
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
              <p className="text-sm text-gray-500 mt-4">
                {needsMoreInfo 
                  ? "Next: Get your accurate quote with the additional details"
                  : "Next: AI-powered market research and instant quote"
                }
              </p>
              {needsMoreInfo && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto">
                  <p className="text-blue-800 text-sm font-medium text-center">
                    ✅ Your information has been saved. Just add the missing details above and click "Get Instant Quote" again.
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    )
  }

  if (step === 2) {
    const selectedCategory = fundingByCategory.find(cat => cat.category === formData.assetCategory)
    
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
                Asset: {formData.assetBrand} {formData.assetModel}
              </p>
              <p className="text-green-700 text-sm">
                Max Funding: {selectedCategory?.maxFunding} | Buyback: {selectedCategory?.buybackAmount}
              </p>
            </div>
          </div>

          <form onSubmit={handleStep2Submit} className="space-y-8">
            {/* Legal Disclaimer */}
            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
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
                onClick={() => setStep(1)}
                className="px-8 py-4"
              >
                Back to Edit Information
              </Button>
              
              <Button
                type="submit"
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full px-12 py-6 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Continue to Legal Review
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </div>
            
            {submitError && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200 mt-4">
                {submitError}
              </div>
            )}
            
            <p className="text-sm text-gray-500 text-center mt-4">
              By continuing, you agree to all terms and acknowledge this is a sale transaction
            </p>
          </form>
        </div>
      </div>
    )
  }

  // Step 3: Legal Document & Signature
  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto py-16 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Legal Agreement & Digital Signature</h1>
            <p className="text-xl text-gray-600">
              Please review the complete legal agreement and provide your digital signature
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <form onSubmit={handleFinalSubmit} className="space-y-8">
              {/* Legal Document */}
              <div className="bg-gray-50 border rounded-lg p-6 max-h-96 overflow-y-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  VAULTLY ASSET PURCHASE AGREEMENT
                </h3>
                
                <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                  <p><strong>PARTIES:</strong> This Agreement is between Vaultly, LLC ("Buyer") and {formData.firstName} {formData.lastName} ("Seller").</p>
                  
                  <p><strong>ASSET DESCRIPTION:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Type: {formData.assetCategory}</li>
                    <li>Brand: {formData.assetBrand}</li>
                    <li>Model: {formData.assetModel}</li>
                    <li>Condition: {formData.assetCondition}</li>
                    <li>Description: {formData.assetDescription}</li>
                  </ul>

                  <p><strong>PURCHASE TERMS:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Estimated Value: ${parseFloat(formData.estimatedValue || '0').toLocaleString()}</li>
                    <li>Proposed Purchase Amount: ${(parseFloat(formData.estimatedValue || '0') * 0.6).toLocaleString()}</li>
                    <li>Buyback Period: 90 days from purchase date</li>
                    <li>Buyback Amount: ${(parseFloat(formData.estimatedValue || '0') * 0.7).toLocaleString()}</li>
                  </ul>

                  <p><strong>SELLER REPRESENTATIONS & WARRANTIES:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Seller owns the asset free and clear of all liens and encumbrances</li>
                    <li>Asset description and condition are accurate to the best of Seller's knowledge</li>
                    <li>Seller has the right to sell the asset</li>
                    <li>Asset is authentic and not counterfeit</li>
                  </ul>

                  <p><strong>BUYBACK OPTION:</strong> Seller may repurchase the asset within 90 days by paying the buyback amount plus any applicable fees. If not repurchased, Buyer retains full ownership.</p>

                  <p><strong>INSPECTION & VERIFICATION:</strong> This agreement is subject to Buyer's inspection and authentication of the asset. Final purchase price may be adjusted based on actual condition and market value.</p>

                  <p><strong>PAYMENT:</strong> Payment will be made within 24 hours of asset receipt and verification via ACH transfer to Seller's designated bank account.</p>

                  <p><strong>RISK DISCLOSURE:</strong> Asset values may fluctuate. Seller acknowledges the risk of market value changes during the buyback period.</p>

                  <p><strong>GOVERNING LAW:</strong> This agreement is governed by the laws of the State of Delaware.</p>
                </div>
              </div>

              {/* Signature Section */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="text-xl font-bold text-blue-900 mb-4">Digital Signature</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-blue-800">Full Legal Name</Label>
                    <Input
                      value={`${formData.firstName} ${formData.lastName}`}
                      readOnly
                      className="bg-white border-blue-300"
                    />
                  </div>
                  <div>
                    <Label className="text-blue-800">Date</Label>
                    <Input
                      value={new Date().toLocaleDateString()}
                      readOnly
                      className="bg-white border-blue-300"
                    />
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-white border-2 border-dashed border-blue-300 rounded-lg text-center">
                  <p className="text-blue-700 font-medium">
                    By clicking "Sign & Submit Application" below, I electronically sign this agreement and acknowledge that:
                  </p>
                  <ul className="text-sm text-blue-600 mt-2 space-y-1">
                    <li>• I have read and understand all terms of this agreement</li>
                    <li>• This constitutes a legally binding digital signature</li>
                    <li>• I agree to sell my asset under the terms specified above</li>
                    <li>• All information provided is accurate and complete</li>
                  </ul>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => setStep(2)}
                  className="px-8 py-4"
                >
                  Back to Legal Review
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full px-12 py-6 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Signing & Submitting..." : "Sign & Submit Application"}
                  <CheckCircle2 className="w-6 h-6 ml-3" />
                </Button>
              </div>
              
              {submitError && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                  {submitError}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Step 4: Success Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto py-24 max-w-2xl text-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Application Submitted Successfully!</h1>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-green-800 mb-4">Next Steps:</h3>
            <ul className="text-green-700 space-y-2 text-left">
              <li>• You'll receive an email confirmation within 5 minutes</li>
              <li>• Our team will contact you within 24 hours to schedule asset inspection</li>
              <li>• Identity verification (KYC) will be completed during your call</li>
              <li>• Purchase offer will be provided within 48 hours of inspection</li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
            <div className="bg-gray-50 p-4 rounded-lg">
              <strong>Application ID:</strong><br/>
              {applicationId ? `APP-${applicationId}` : 'VLT-' + Date.now().toString().slice(-8)}
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <strong>Asset:</strong><br/>
              {formData.assetBrand} {formData.assetModel}
            </div>
          </div>

          <div className="space-y-4">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full px-8 py-4"
            >
              <Link href="/">Return to Homepage</Link>
            </Button>
            
            <p className="text-gray-600">
              Questions? Call us at <strong>(555) 123-VAULT</strong> or email <strong>support@vaultly.com</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ApplyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading application form...</p>
        </div>
      </div>
    }>
      <ApplyPageContent />
    </Suspense>
  )
}
