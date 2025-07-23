'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { 
  DollarSign, 
  TrendingUp, 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Star,
  BarChart3,
  Award,
  Camera,
  Zap,
  ArrowRight,
  RefreshCw
} from 'lucide-react'
import Link from 'next/link'

interface QuoteResult {
  sessionId: string
  quoteAmount: number
  buybackAmount: number
  researchedMarketValue: number
  finalMarketValue: number
  confidenceScore: number
  valuationSources: string[]
  researchNotes: string
  conditionAdjustmentFactor: number
  marketTrend: string
  priceHistory: Array<{ date: string; price: number }>
  comparableItems: any[]
  fraudRisk: number
  assetData: {
    assetCategory: string
    assetBrand: string
    assetModel: string
    assetCondition: string
    estimatedValue: string
    assetDescription: string
  }
}

export default function QuoteResultPage() {
  const router = useRouter()
  const [quoteData, setQuoteData] = useState<QuoteResult | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(48 * 60 * 60) // 48 hours in seconds
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // Load quote data from localStorage
    const stored = localStorage.getItem('quoteResult')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setQuoteData(parsed)
      } catch (error) {
        console.error('Error loading quote data:', error)
        router.push('/apply')
      }
    } else {
      router.push('/apply')
    }
  }, [router])

  // Countdown timer
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [timeRemaining])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  const getConfidenceColor = (score: number) => {
    if (score >= 85) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getFraudRiskColor = (risk: number) => {
    if (risk < 20) return 'text-green-600'
    if (risk < 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getFraudRiskLabel = (risk: number) => {
    if (risk < 20) return 'Low Risk'
    if (risk < 50) return 'Medium Risk'
    return 'High Risk'
  }

  if (!quoteData) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <h2 className="text-xl font-semibold mb-2">Loading Your Quote...</h2>
          <p className="text-gray-600">Please wait while we retrieve your personalized offer</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header with countdown */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-4">
          <CheckCircle className="h-5 w-5" />
          <span className="font-semibold">Quote Generated Successfully!</span>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Your Personalized Cash Offer</h1>
        <p className="text-gray-600 mb-4">
          Based on advanced AI market research and real-time pricing data
        </p>
        
        {/* Quote expires countdown */}
        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full">
          <Clock className="h-4 w-4" />
          <span className="text-sm font-medium">
            Quote expires in {formatTime(timeRemaining)}
          </span>
        </div>
      </div>

      {/* Main quote amount */}
      <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <DollarSign className="h-8 w-8 text-green-600" />
              <span className="text-4xl font-bold text-green-600">
                ${quoteData.quoteAmount.toLocaleString()}
              </span>
            </div>
            <p className="text-lg text-gray-700 mb-6">
              Instant cash offer for your {quoteData.assetData.assetBrand} {quoteData.assetData.assetModel}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Award className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">
                  {quoteData.confidenceScore}%
                </div>
                <div className="text-sm text-gray-600">Confidence Score</div>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="text-lg font-semibold text-gray-900">
                  ${quoteData.buybackAmount.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Buyback Option</div>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <BarChart3 className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <div className="text-lg font-semibold text-gray-900">
                  ${quoteData.finalMarketValue.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Market Value</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                Accept This Offer
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3">
                Request Modification
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed analysis tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="research">Market Research</TabsTrigger>
          <TabsTrigger value="trends">Price History</TabsTrigger>
          <TabsTrigger value="security">Risk Analysis</TabsTrigger>
          <TabsTrigger value="details">Item Details</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-600" />
                  Quote Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Market Research Value:</span>
                  <span className="font-semibold">${quoteData.researchedMarketValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Condition Adjustment:</span>
                  <span className="font-semibold">{Math.round(quoteData.conditionAdjustmentFactor * 100)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Adjusted Market Value:</span>
                  <span className="font-semibold">${quoteData.finalMarketValue.toLocaleString()}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Our Offer (40%):</span>
                    <span className="text-green-600">${quoteData.quoteAmount.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-600" />
                  Key Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>No credit check required</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Keep your item (collateral-based)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Instant approval process</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>110% buyback guarantee</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>48-hour quote validity</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <TrendingUp className="h-4 w-4" />
            <AlertDescription>
              <strong>Market Trend:</strong> {quoteData.marketTrend}
            </AlertDescription>
          </Alert>
        </TabsContent>

        {/* Market Research Tab */}
        <TabsContent value="research" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                AI Market Research Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Research Sources:</h4>
                  <div className="flex flex-wrap gap-2">
                    {quoteData.valuationSources.map((source, index) => (
                      <Badge key={index} variant="outline">{source}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Analysis Notes:</h4>
                  <p className="text-gray-700 leading-relaxed">{quoteData.researchNotes}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {quoteData.confidenceScore}%
                    </div>
                    <div className="text-sm text-blue-700">Research Confidence</div>
                    <Progress value={quoteData.confidenceScore} className="mt-2" />
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {quoteData.valuationSources.length}
                    </div>
                    <div className="text-sm text-green-700">Data Sources Used</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Price History Tab */}
        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                12-Month Price History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {quoteData.priceHistory && quoteData.priceHistory.length > 0 ? (
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={quoteData.priceHistory}>
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short' })}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      />
                      <Tooltip 
                        formatter={(value: any) => [`$${value.toLocaleString()}`, 'Market Value']}
                        labelFormatter={(label) => new Date(label).toLocaleDateString()}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#16a34a" 
                        strokeWidth={3}
                        dot={{ fill: '#16a34a', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Price history data not available for this item category
                </div>
              )}
              
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Market Analysis:</h4>
                <p className="text-sm text-gray-700">{quoteData.marketTrend}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk Analysis Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Security & Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold">Fraud Risk Level</span>
                  </div>
                  <div className={`text-2xl font-bold ${getFraudRiskColor(quoteData.fraudRisk)}`}>
                    {getFraudRiskLabel(quoteData.fraudRisk)}
                  </div>
                  <Progress value={100 - quoteData.fraudRisk} className="mt-2" />
                  <div className="text-sm text-gray-600 mt-1">
                    Risk Score: {quoteData.fraudRisk}/100
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-semibold">Security Features</span>
                  </div>
                  <ul className="text-sm space-y-1">
                    <li>✓ AI-powered authenticity check</li>
                    <li>✓ Market data verification</li>
                    <li>✓ Professional item inspection</li>
                    <li>✓ Secure storage facility</li>
                  </ul>
                </div>
              </div>

              {quoteData.fraudRisk > 40 && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Additional verification may be required during the inspection process due to elevated risk factors.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Item Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-purple-600" />
                Item Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Asset Details</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Category:</span> {quoteData.assetData.assetCategory}</div>
                    <div><span className="font-medium">Brand:</span> {quoteData.assetData.assetBrand}</div>
                    <div><span className="font-medium">Model:</span> {quoteData.assetData.assetModel}</div>
                    <div><span className="font-medium">Condition:</span> {quoteData.assetData.assetCondition}</div>
                    <div><span className="font-medium">Your Estimate:</span> ${parseFloat(quoteData.assetData.estimatedValue).toLocaleString()}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Valuation Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Market Research:</span> ${quoteData.researchedMarketValue.toLocaleString()}</div>
                    <div><span className="font-medium">Condition Factor:</span> {Math.round(quoteData.conditionAdjustmentFactor * 100)}%</div>
                    <div><span className="font-medium">Final Market Value:</span> ${quoteData.finalMarketValue.toLocaleString()}</div>
                    <div><span className="font-medium">Our Offer:</span> ${quoteData.quoteAmount.toLocaleString()}</div>
                    <div><span className="font-medium">Buyback Price:</span> ${quoteData.buybackAmount.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {quoteData.assetData.assetDescription && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Item Description</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {quoteData.assetData.assetDescription}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action buttons */}
      <div className="text-center space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4">
            <Zap className="h-5 w-5 mr-2" />
            Accept Offer & Get Funded
          </Button>
          <Button variant="outline" size="lg" className="px-8 py-4">
            Request Higher Offer
          </Button>
          <Button variant="outline" size="lg" className="px-8 py-4">
            Schedule Inspection
          </Button>
        </div>
        
        <p className="text-sm text-gray-600">
          Need help? <Link href="/contact" className="text-blue-600 hover:underline">Contact our experts</Link> • 
          Questions? <Link href="/faq" className="text-blue-600 hover:underline">View FAQ</Link>
        </p>
      </div>
    </div>
  )
} 