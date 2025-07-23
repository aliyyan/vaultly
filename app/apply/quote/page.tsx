"use client"

import { useState, useEffect, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, TrendingUp, CheckCircle2, Clock, DollarSign, Search, ArrowRight, RefreshCw, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

interface QuoteData {
  id: number
  assetCategory: string
  assetBrand: string
  assetModel: string
  assetCondition: string
  userEstimatedValue: number
  researchedMarketValue: number
  finalMarketValue: number
  quoteAmount: number
  buybackAmount: number
  confidenceScore: number
  valuationSources: string[]
  researchNotes: string
  expiresAt: string
}

function QuoteContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  // Get asset data from URL params (passed from previous page)
  const assetData = {
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
    assetDescription: searchParams.get('assetDescription') || ''
  }

  useEffect(() => {
    generateQuote()
  }, [])

  const generateQuote = async () => {
    try {
      setIsLoading(true)
      setError("")

      // Create application session ID for tracking
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      const response = await fetch('/api/generate-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          assetData
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate quote')
      }

      const quote = await response.json()
      setQuoteData(quote)
    } catch (err) {
      console.error('Quote generation error:', err)
      setError(err instanceof Error ? err.message : 'Failed to generate quote')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAcceptQuote = () => {
    if (!quoteData) return

    // Save quote acceptance and redirect to legal terms
    const urlParams = new URLSearchParams({
      ...assetData,
      quoteId: quoteData.id.toString(),
      quoteAmount: quoteData.quoteAmount.toString(),
      buybackAmount: quoteData.buybackAmount.toString()
    })

    router.push(`/apply/legal-terms?${urlParams.toString()}`)
  }

  const handleDeclineQuote = () => {
    router.push('/')
  }

  const handleFixInformation = () => {
    // Preserve all their previous inputs when going back to fix information
    const urlParams = new URLSearchParams({
      firstName: assetData.firstName,
      lastName: assetData.lastName,
      email: assetData.email,
      phone: assetData.phone,
      address: assetData.address,
      city: assetData.city,
      state: assetData.state,
      zipCode: assetData.zipCode,
      assetCategory: assetData.assetCategory,
      assetBrand: assetData.assetBrand,
      assetModel: assetData.assetModel,
      assetCondition: assetData.assetCondition,
      estimatedValue: assetData.estimatedValue,
      assetDescription: assetData.assetDescription,
      needsMoreInfo: 'true' // Flag to highlight the description field
    })
    
    router.push(`/apply?${urlParams.toString()}`)
  }

  const getConditionColor = (condition: string) => {
    const colors = {
      'new': 'bg-green-100 text-green-800 border-green-200',
      'excellent': 'bg-blue-100 text-blue-800 border-blue-200',
      'very-good': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'good': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'fair': 'bg-orange-100 text-orange-800 border-orange-200'
    }
    return colors[condition as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto py-16 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Generating Your Quote</h1>
            <p className="text-xl text-gray-600">
              Our AI is researching the market value of your {assetData.assetBrand} {assetData.assetModel}
            </p>
          </div>

          <Card className="shadow-2xl border-0 bg-white">
            <CardContent className="p-12">
              <div className="text-center space-y-8">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <RefreshCw className="w-12 h-12 text-blue-600 animate-spin" />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">Analyzing Market Data...</h3>
                  <div className="space-y-3 text-left max-w-md mx-auto">
                    <div className="flex items-center space-x-3">
                      <Search className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">Searching market databases</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Analyzing recent sales data</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <DollarSign className="w-5 h-5 text-yellow-600" />
                      <span className="text-gray-700">Calculating fair offer price</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <p className="text-blue-800 font-medium">
                    This usually takes 10-15 seconds while we research current market values
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (error) {
    const isValidationError = error.includes('Brand') || 
                            error.includes('not recognized') || 
                            error.includes('not found') ||
                            error.includes('Invalid product') ||
                            error.includes('Product validation failed') ||
                            error.includes('mass-market consumer goods')
    
    const isInsufficientInfo = error.includes('INSUFFICIENT_INFO:')
    const infoMessage = isInsufficientInfo ? error.replace('INSUFFICIENT_INFO: ', '') : ''

    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <div className="container mx-auto py-16 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {isValidationError ? 'Product Not Found' : 
               isInsufficientInfo ? 'More Information Needed' : 
               'Quote Generation Error'}
            </h1>
            <p className="text-xl text-gray-600">
              {isValidationError 
                ? "We couldn't find this product in our database" 
                : isInsufficientInfo
                ? "We need more details to provide an accurate quote"
                : "We encountered an issue generating your quote"
              }
            </p>
          </div>

          <Card className="shadow-2xl border-0 bg-white">
            <CardContent className="p-12">
              <div className="text-center space-y-6">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <X className="w-12 h-12 text-red-600" />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-red-900">
                    {isValidationError ? 'Invalid Product Information' : 
                     isInsufficientInfo ? 'Additional Details Required' :
                     'Unable to Generate Quote'}
                  </h3>
                  
                  {isInsufficientInfo ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left">
                      <h4 className="font-bold text-blue-800 mb-3">For the most accurate quote:</h4>
                      <div className="bg-white border border-blue-300 rounded-lg p-4 mb-4">
                        <p className="text-blue-700 font-medium">{infoMessage}</p>
                      </div>
                      <div className="space-y-2 text-blue-700 text-sm">
                        <p><strong>💡 How to add this information:</strong></p>
                        <p>1. Click "Fix Product Information" below</p>
                        <p>2. Add the requested details to your <strong>Description</strong> field</p>
                        <p>3. Click "Get Instant Quote" again</p>
                      </div>
                      <div className="mt-4 p-3 bg-blue-100 border border-blue-300 rounded-lg">
                        <p className="text-blue-800 text-sm font-medium">
                          📊 More details = More accurate pricing
                        </p>
                      </div>
                    </div>
                  ) : isValidationError ? (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-left">
                      <h4 className="font-bold text-amber-800 mb-3">Please check your product details:</h4>
                      <ul className="text-amber-700 space-y-2 list-disc list-inside text-sm">
                        <li>Make sure the <strong>brand name</strong> is spelled correctly</li>
                        <li>Verify the <strong>model name</strong> matches the actual product</li>
                        <li>Ensure the product exists and is available for sale</li>
                        <li>Check that the brand matches the selected category</li>
                      </ul>
                      <p className="text-amber-600 mt-4 text-sm font-medium">
                        We only provide quotes for genuine, verifiable products from recognized brands.
                      </p>
                    </div>
                  ) : (
                    <p className="text-red-700 bg-red-50 border border-red-200 rounded-lg p-4">
                      {error}
                    </p>
                  )}
                </div>

                <div className="flex gap-4 justify-center">
                  <Button 
                    variant="outline"
                    onClick={(isValidationError || isInsufficientInfo) ? handleFixInformation : () => router.push('/apply')}
                    className="px-8 py-3"
                  >
                    {(isValidationError || isInsufficientInfo) ? 'Fix Product Information' : 'Back to Application'}
                  </Button>
                  {!isValidationError && !isInsufficientInfo && (
                    <Button 
                      onClick={generateQuote}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                    >
                      <RefreshCw className="w-5 h-5 mr-2" />
                      Try Again
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!quoteData) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto py-16 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Your Instant Cash Quote</h1>
          <p className="text-xl text-gray-600 mb-4">
            Based on current market research for your {assetData.assetBrand} {assetData.assetModel}
          </p>
          <div className="flex justify-center gap-3">
            <Badge className="bg-green-600 text-white px-4 py-2">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              AI Verified
            </Badge>
            <Badge variant="outline" className="border-blue-500 text-blue-700 px-4 py-2">
              <Clock className="w-4 h-4 mr-2" />
              Quote expires in 48 hours
            </Badge>
          </div>
        </div>

        {/* Main Quote Card */}
        <Card className="shadow-2xl border-0 bg-white mb-8">
          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center py-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Your Instant Cash Offer</h2>
              <div className="text-6xl font-bold text-white">
                ${quoteData.quoteAmount.toLocaleString()}
              </div>
              <p className="text-green-100 text-lg">
                Available immediately upon asset verification
              </p>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <h4 className="font-bold text-green-900 mb-2">Your Cash Offer</h4>
                <p className="text-2xl font-bold text-green-700">
                  ${quoteData.quoteAmount.toLocaleString()}
                </p>
                <p className="text-sm text-green-600 mt-1">
                  Based on current market analysis
                </p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
                <h4 className="font-bold text-purple-900 mb-2">Buyback Price</h4>
                <p className="text-2xl font-bold text-purple-700">
                  ${quoteData.buybackAmount.toLocaleString()}
                </p>
                <p className="text-sm text-purple-600 mt-1">
                  90-day repurchase option
                </p>
              </div>
            </div>

            {/* Asset Details */}
            <div className="bg-gray-50 border rounded-lg p-6 mb-6">
              <h4 className="font-bold text-gray-900 mb-4">Asset Details</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600">Item:</span>
                  <span className="font-semibold ml-2">{assetData.assetBrand} {assetData.assetModel}</span>
                </div>
                <div>
                  <span className="text-gray-600">Category:</span>
                  <span className="font-semibold ml-2">{assetData.assetCategory}</span>
                </div>
                <div>
                  <span className="text-gray-600">Condition:</span>
                  <Badge className={`ml-2 ${getConditionColor(assetData.assetCondition)}`}>
                    {assetData.assetCondition.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </Badge>
                </div>
                <div>
                  <span className="text-gray-600">Your Estimate:</span>
                  <span className="font-semibold ml-2">${parseFloat(assetData.estimatedValue).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Market Analysis */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-blue-900">Market Analysis</h4>
                <Badge className={`${getConfidenceColor(quoteData.confidenceScore)} bg-white border`}>
                  {quoteData.confidenceScore}% Confidence
                </Badge>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-blue-700 font-medium">Research Sources:</span>
                  <span className="text-blue-600 ml-2">{quoteData.valuationSources.join(', ')}</span>
                </div>
                <div>
                  <span className="text-blue-700 font-medium">Market Notes:</span>
                  <p className="text-blue-600 mt-1">{quoteData.researchNotes}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Button
                onClick={handleAcceptQuote}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full px-12 py-6 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Accept Quote & Continue
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
              <Button
                onClick={handleDeclineQuote}
                variant="outline"
                size="lg"
                className="px-12 py-6 text-lg"
              >
                Decline Quote
              </Button>
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                This quote is valid for 48 hours. No obligation to proceed.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">How Our AI Quote System Works</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Market Research</h4>
                <p className="text-gray-600 text-sm">
                  We analyze recent sales, auction results, and dealer prices across multiple platforms
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">AI Analysis</h4>
                <p className="text-gray-600 text-sm">
                  Our AI factors in condition, rarity, market trends, and demand to determine fair value
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Instant Quote</h4>
                <p className="text-gray-600 text-sm">
                  You receive our best cash offer immediately - no waiting or negotiations needed
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function QuotePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quote system...</p>
        </div>
      </div>
    }>
      <QuoteContent />
    </Suspense>
  )
} 