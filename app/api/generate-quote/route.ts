import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Mock AI valuation service (in production, this would call real APIs)
class AssetValuationService {
  private async searchMarketData(assetData: any): Promise<{
    marketValue: number
    sources: string[]
    confidence: number
    notes: string
  }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    const { assetCategory, assetBrand, assetModel, assetCondition } = assetData

    // Mock market research based on asset type
    let baseValue = 0
    let sources: string[] = []
    let confidence = 75
    let notes = ""

    // Brand and model specific valuations (this would be real API calls)
    if (assetCategory === "Luxury Watches") {
      if (assetBrand.toLowerCase().includes("rolex")) {
        if (assetModel.toLowerCase().includes("submariner")) {
          baseValue = Math.floor(Math.random() * 5000) + 8000 // $8,000-$13,000
          sources = ["Chrono24", "Bob's Watches", "Crown & Caliber"]
          confidence = 90
          notes = "Rolex Submariner prices stable with strong resale market. Recent sales show consistent demand."
        } else if (assetModel.toLowerCase().includes("datejust")) {
          baseValue = Math.floor(Math.random() * 3000) + 6000 // $6,000-$9,000
          sources = ["Chrono24", "Hodinkee Shop", "Tourneau"]
          confidence = 85
          notes = "Datejust models maintain value well. Classic design ensures steady market demand."
        } else {
          baseValue = Math.floor(Math.random() * 4000) + 7000 // $7,000-$11,000
          sources = ["Chrono24", "eBay Sold Listings"]
          confidence = 80
          notes = "Rolex timepieces generally hold value well in secondary market."
        }
      } else if (assetBrand.toLowerCase().includes("omega")) {
        baseValue = Math.floor(Math.random() * 2000) + 3000 // $3,000-$5,000
        sources = ["Omega Boutique", "Chrono24", "WatchStation"]
        confidence = 75
        notes = "Omega watches have good resale value, particularly Speedmaster and Seamaster models."
      } else if (assetBrand.toLowerCase().includes("patek")) {
        baseValue = Math.floor(Math.random() * 20000) + 25000 // $25,000-$45,000
        sources = ["Sotheby's", "Christie's", "Antiquorum"]
        confidence = 95
        notes = "Patek Philippe commands premium prices with exceptional value retention."
      } else {
        baseValue = Math.floor(Math.random() * 2000) + 2000 // $2,000-$4,000
        sources = ["eBay", "Chrono24"]
        confidence = 65
        notes = "Market value estimated based on similar luxury timepieces."
      }
    } else if (assetCategory === "Fine Jewelry") {
      if (assetBrand.toLowerCase().includes("tiffany")) {
        baseValue = Math.floor(Math.random() * 3000) + 2000 // $2,000-$5,000
        sources = ["Tiffany & Co", "1stDibs", "Worthy"]
        confidence = 80
        notes = "Tiffany jewelry retains value due to brand recognition and craftsmanship."
      } else if (assetBrand.toLowerCase().includes("cartier")) {
        baseValue = Math.floor(Math.random() * 5000) + 3000 // $3,000-$8,000
        sources = ["Cartier", "Christie's", "Sotheby's"]
        confidence = 85
        notes = "Cartier pieces are highly sought after in luxury jewelry market."
      } else {
        baseValue = Math.floor(Math.random() * 2000) + 1000 // $1,000-$3,000
        sources = ["GIA", "Blue Nile", "Local Appraisers"]
        confidence = 70
        notes = "Valuation based on precious metal content and gemstone quality."
      }
    } else if (assetCategory === "Designer Handbags") {
      if (assetBrand.toLowerCase().includes("hermes")) {
        baseValue = Math.floor(Math.random() * 8000) + 5000 // $5,000-$13,000
        sources = ["Fashionphile", "Vestiaire Collective", "The RealReal"]
        confidence = 90
        notes = "Hermès bags, especially Birkin and Kelly, often appreciate in value."
      } else if (assetBrand.toLowerCase().includes("chanel")) {
        baseValue = Math.floor(Math.random() * 4000) + 2000 // $2,000-$6,000
        sources = ["Fashionphile", "Rebag", "What Goes Around Comes Around"]
        confidence = 85
        notes = "Chanel Classic Flap and Boy bags maintain strong resale value."
      } else if (assetBrand.toLowerCase().includes("louis vuitton")) {
        baseValue = Math.floor(Math.random() * 2000) + 1000 // $1,000-$3,000
        sources = ["Fashionphile", "Vestiaire Collective", "Yoox"]
        confidence = 75
        notes = "Louis Vuitton classics like Neverfull and Speedy hold value well."
      } else {
        baseValue = Math.floor(Math.random() * 1000) + 500 // $500-$1,500
        sources = ["TheRealReal", "Vestiaire Collective"]
        confidence = 65
        notes = "Designer handbag value based on brand, condition, and current market trends."
      }
    } else if (assetCategory === "Premium Electronics") {
      if (assetBrand.toLowerCase().includes("apple")) {
        baseValue = Math.floor(Math.random() * 800) + 400 // $400-$1,200
        sources = ["Apple Trade-In", "Gazelle", "Swappa"]
        confidence = 85
        notes = "Apple products maintain value well, especially recent iPhone and MacBook models."
      } else if (assetBrand.toLowerCase().includes("canon") || assetBrand.toLowerCase().includes("nikon")) {
        baseValue = Math.floor(Math.random() * 1500) + 800 // $800-$2,300
        sources = ["B&H Photo", "KEH Camera", "eBay"]
        confidence = 80
        notes = "Professional camera equipment holds value well in photography market."
      } else {
        baseValue = Math.floor(Math.random() * 500) + 200 // $200-$700
        sources = ["eBay", "Amazon Trade-In", "Gazelle"]
        confidence = 70
        notes = "Electronics depreciate quickly, value based on age and condition."
      }
    } else if (assetCategory === "Musical Instruments") {
      if (assetBrand.toLowerCase().includes("gibson") || assetBrand.toLowerCase().includes("fender")) {
        baseValue = Math.floor(Math.random() * 2000) + 1000 // $1,000-$3,000
        sources = ["Guitar Center", "Reverb", "eBay"]
        confidence = 85
        notes = "Vintage and USA-made Gibson/Fender guitars maintain excellent value."
      } else if (assetBrand.toLowerCase().includes("steinway")) {
        baseValue = Math.floor(Math.random() * 15000) + 20000 // $20,000-$35,000
        sources = ["Steinway Gallery", "Piano Mart", "Pianos Plus"]
        confidence = 90
        notes = "Steinway pianos are considered investment-grade instruments."
      } else {
        baseValue = Math.floor(Math.random() * 800) + 300 // $300-$1,100
        sources = ["Guitar Center", "Sam Ash", "Reverb"]
        confidence = 75
        notes = "Musical instrument value based on brand reputation and condition."
      }
    } else {
      // Other category
      baseValue = Math.floor(Math.random() * 2000) + 1000 // $1,000-$3,000
      sources = ["Heritage Auctions", "LiveAuctioneers", "eBay"]
      confidence = 60
      notes = "Collectible and art valuations require expert appraisal for accuracy."
    }

    return {
      marketValue: baseValue,
      sources,
      confidence,
      notes
    }
  }

  private getConditionAdjustment(condition: string): number {
    const adjustments = {
      'new': 1.0,
      'excellent': 0.9,
      'very-good': 0.8,
      'good': 0.7,
      'fair': 0.6
    }
    return adjustments[condition as keyof typeof adjustments] || 0.7
  }

  async generateQuote(sessionId: string, assetData: any) {
    // Research market value
    const research = await this.searchMarketData(assetData)
    
    // Apply condition adjustment
    const conditionFactor = this.getConditionAdjustment(assetData.assetCondition)
    const finalMarketValue = Math.round(research.marketValue * conditionFactor)
    
    // Calculate our offer (40% of adjusted market value)
    const quoteAmount = Math.round(finalMarketValue * 0.40)
    
    // Calculate buyback amount (110% of quote)
    const buybackAmount = Math.round(quoteAmount * 1.10)

    return {
      sessionId,
      assetData,
      researchedMarketValue: research.marketValue,
      finalMarketValue,
      quoteAmount,
      buybackAmount,
      confidenceScore: research.confidence,
      valuationSources: research.sources,
      researchNotes: research.notes,
      conditionAdjustmentFactor: conditionFactor
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, assetData } = body

    if (!sessionId || !assetData) {
      return NextResponse.json(
        { error: 'Missing required data' },
        { status: 400 }
      )
    }

    // Generate quote using AI valuation service
    const valuationService = new AssetValuationService()
    const quoteResult = await valuationService.generateQuote(sessionId, assetData)

    // Save quote to database
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    const { data, error } = await supabase
      .from('asset_quotes')
      .insert([
        {
          application_session_id: sessionId,
          asset_category: assetData.assetCategory,
          asset_brand: assetData.assetBrand,
          asset_model: assetData.assetModel,
          asset_condition: assetData.assetCondition,
          user_estimated_value: parseFloat(assetData.estimatedValue),
          asset_description: assetData.assetDescription,
          researched_market_value: quoteResult.researchedMarketValue,
          valuation_sources: quoteResult.valuationSources,
          confidence_score: quoteResult.confidenceScore,
          condition_adjustment_factor: quoteResult.conditionAdjustmentFactor,
          final_market_value: quoteResult.finalMarketValue,
          quote_amount: quoteResult.quoteAmount,
          buyback_amount: quoteResult.buybackAmount,
          research_notes: quoteResult.researchNotes,
          api_responses: {
            mock_research: quoteResult,
            timestamp: new Date().toISOString()
          }
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to save quote data' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      id: data.id,
      assetCategory: data.asset_category,
      assetBrand: data.asset_brand,
      assetModel: data.asset_model,
      assetCondition: data.asset_condition,
      userEstimatedValue: data.user_estimated_value,
      researchedMarketValue: data.researched_market_value,
      finalMarketValue: data.final_market_value,
      quoteAmount: data.quote_amount,
      buybackAmount: data.buyback_amount,
      confidenceScore: data.confidence_score,
      valuationSources: data.valuation_sources,
      researchNotes: data.research_notes,
      expiresAt: data.expires_at
    })

  } catch (error) {
    console.error('Quote generation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 