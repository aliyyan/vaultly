'use client'

import { useState, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import SignatureCanvas from 'react-signature-canvas'
import { FileText, PenTool, Save, Trash2 } from 'lucide-react'

function LegalAgreementContent() {
  const sigRef = useRef<SignatureCanvas>(null)
  const searchParams = useSearchParams()
  
  // Get application data from URL params
  const applicationData = {
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
    quoteAmount: parseFloat(searchParams.get('quoteAmount') || '0'),
    buybackAmount: parseFloat(searchParams.get('buybackAmount') || '0')
  }

  const [formData, setFormData] = useState({
    sellerName: `${applicationData.firstName} ${applicationData.lastName}`,
    sellerEmail: applicationData.email,
    sellerPhone: applicationData.phone,
    bankName: '',
    routingNumber: '',
    accountNumber: '',
    accountType: '',
    fullNameOnAccount: `${applicationData.firstName} ${applicationData.lastName}`,
    bankAddress: '',
    signatureDate: new Date().toLocaleDateString()
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const clearSignature = () => {
    sigRef.current?.clear()
  }

  const handleSubmit = async () => {
    if (sigRef.current && !sigRef.current.isEmpty()) {
      try {
        const signatureData = sigRef.current.toDataURL()
        
        const completeData = {
          ...formData,
          signature: signatureData,
          // Include quote information
          quoteId: applicationData.quoteId,
          quoteAmount: applicationData.quoteAmount,
          buybackAmount: applicationData.buybackAmount,
          // Include asset information
          assetCategory: applicationData.assetCategory,
          assetBrand: applicationData.assetBrand,
          assetModel: applicationData.assetModel,
          assetCondition: applicationData.assetCondition,
          assetDescription: applicationData.assetDescription
        }
        
        const response = await fetch('/api/legal-agreement/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(completeData),
        })

        const result = await response.json()

        if (response.ok) {
          alert('Legal agreement signed and saved successfully!')
          // Redirect to home page after successful submission
          window.location.href = '/'
        } else {
          const errorMsg = result.details 
            ? `Error: ${result.error}\nDetails: ${result.details}\nCode: ${result.code || 'N/A'}`
            : `Error: ${result.error}`
          alert(errorMsg)
        }
      } catch (error) {
        console.error('Submission error:', error)
        alert('Failed to submit agreement. Please try again.')
      }
    } else {
      alert('Please provide your digital signature before submitting.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="bg-white rounded-xl shadow-lg">
          {/* Header */}
                        <div className="bg-slate-900 text-white p-6 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="w-8 h-8" />
                <div>
                  <h1 className="text-2xl font-bold">Legal Agreement & Digital Signature</h1>
                  <p className="text-slate-300">Asset Purchase and Buyback Agreement</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-yellow-400">${applicationData.quoteAmount.toLocaleString()}</div>
                <div className="text-sm text-slate-300">Preliminary Quote</div>
                <div className="text-xs text-yellow-200">Subject to inspection</div>
              </div>
            </div>
          </div>

          {/* Legal Document Content */}
          <div className="p-8 border-b">
            <div className="prose prose-slate max-w-none text-sm leading-relaxed">
              <h2 className="text-xl font-bold text-center mb-6">ASSET PURCHASE AND BUYBACK AGREEMENT</h2>
              
              <p className="mb-4">
                This Asset Purchase and Buyback Agreement ("Agreement") is entered into by and between the undersigned individual or entity ("Seller") and [Your Company Name], a Delaware corporation ("Buyer").
              </p>

              <h3 className="font-semibold text-lg mt-6 mb-3">1. SELLER REPRESENTATIONS & WARRANTIES</h3>
              <p className="mb-2">The Seller hereby represents and warrants the following:</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Seller is the sole legal and beneficial owner of the asset described below ("Asset"), free and clear of all liens, claims, encumbrances, or third-party interests.</li>
                <li>The Asset is accurately described by the Seller and in the condition stated to the best of the Seller's knowledge.</li>
                <li>Seller has full legal authority and capacity to enter into this Agreement and sell the Asset.</li>
                <li>The Asset is genuine, authentic, and not a counterfeit or reproduction.</li>
                <li>The Asset is not stolen, subject to any legal dispute, or under investigation by any law enforcement agency.</li>
                <li>The Seller is not under the influence of any substances and is of sound mind and legal age to enter into this agreement.</li>
              </ul>

              <h3 className="font-semibold text-lg mt-6 mb-3">2. ASSET DESCRIPTION</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div><strong>Category:</strong> {applicationData.assetCategory}</div>
                  <div><strong>Brand:</strong> {applicationData.assetBrand}</div>
                  <div><strong>Model:</strong> {applicationData.assetModel}</div>
                  <div><strong>Condition:</strong> {applicationData.assetCondition}</div>
                  <div className="md:col-span-2">
                  <strong>Specific Details:</strong>
                  <div className="mt-1 text-sm text-gray-600">
                    {/* Parse and display the specific field details from the description */}
                    {applicationData.assetDescription 
                      ? applicationData.assetDescription.split('. ').map((detail, index) => (
                          <div key={index} className="ml-2">• {detail}</div>
                        ))
                      : 'No specific details provided'
                    }
                  </div>
                </div>
                </div>
              </div>
              <p className="mb-4">The Seller agrees that the above description is accurate and complete to the best of their knowledge.</p>

              <h3 className="font-semibold text-lg mt-6 mb-3">3. PURCHASE TERMS & BUYBACK OPTION</h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div><strong>Purchase Amount:</strong> ${applicationData.quoteAmount.toLocaleString()}</div>
                  <div><strong>Buyback Amount:</strong> ${applicationData.buybackAmount.toLocaleString()}</div>
                  <div><strong>Buyback Period:</strong> 90 calendar days</div>
                  <div><strong>Quote Expires:</strong> 48 hours from acceptance</div>
                </div>
              </div>
              <p className="mb-2">The Seller has the option to repurchase the Asset within 90 calendar days from the date of Buyer's receipt of the Asset ("Buyback Period"). To exercise this right, Seller must:</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Pay the buyback amount of ${applicationData.buybackAmount.toLocaleString()},</li>
                <li>Plus any applicable storage, handling, insurance, and processing fees disclosed at the time of sale,</li>
                <li>Complete the transaction within the Buyback Period.</li>
              </ul>
              <p className="mb-4">If the Seller fails to repurchase the Asset within the Buyback Period, all rights to the Asset shall irrevocably transfer to the Buyer, and the Seller shall have no further claims.</p>

              <h3 className="font-semibold text-lg mt-6 mb-3">4. INSPECTION & VERIFICATION - QUOTE SUBJECT TO CHANGE</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="font-semibold text-yellow-800 mb-2">IMPORTANT: This quote is preliminary and subject to change upon physical inspection.</p>
              </div>
              <p className="mb-2">This Agreement and all quoted amounts are contingent upon Buyer's physical inspection and authentication of the Asset. Buyer reserves the right to:</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><strong>Reject the Asset</strong> and return it to Seller at no cost if it materially differs from the description, is counterfeit, or is not authentic,</li>
                <li><strong>Adjust the final purchase price</strong> (up or down) if the actual condition, authenticity, or specifications differ from what was disclosed,</li>
                <li><strong>Provide a revised quote</strong> based on the actual condition and market value after professional assessment,</li>
                <li><strong>Withhold all payment</strong> until complete inspection, authentication, and final valuation are complete.</li>
              </ul>
              <p className="mb-4 text-sm text-gray-600">The Seller acknowledges that the quoted amounts may change and agrees to accept the final offer after inspection or retrieve their asset at no charge.</p>

              <h3 className="font-semibold text-lg mt-6 mb-3">5. PAYMENT TERMS - PAYMENT AFTER INSPECTION ONLY</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="font-semibold text-blue-800">NO PAYMENT UNTIL ITEM IS RECEIVED AND VERIFIED</p>
              </div>
              <p className="mb-2">Payment terms are as follows:</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><strong>No advance payment:</strong> Payment will not be issued until after Buyer receives, inspects, authenticates, and confirms the final value of the Asset.</li>
                <li><strong>Inspection period:</strong> Buyer has up to 2 business days from receipt to complete full inspection and provide final offer.</li>
                <li><strong>Final payment:</strong> If accepted, payment shall be issued within 24 business hours after Seller accepts the final offer via ACH transfer to the bank account provided.</li>
                <li><strong>Asset return:</strong> If the final offer is declined, the Asset will be returned to Seller within 3 business days at no charge.</li>
              </ul>
              <p className="mb-4">Buyer is not responsible for delays due to incorrect bank information, bank processing times, or shipping delays beyond Buyer's control.</p>

              <h3 className="font-semibold text-lg mt-6 mb-3">6. RISK DISCLOSURE</h3>
              <p className="mb-2">The Seller acknowledges that:</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Asset values may fluctuate during the Buyback Period,</li>
                <li>Buyer does not guarantee the future market value of any Asset,</li>
                <li>The repurchase amount shall not be adjusted for market gains or losses.</li>
              </ul>

              <div className="grid md:grid-cols-2 gap-6 text-xs">
                <div>
                  <h4 className="font-semibold mb-2">7. LIMITATION OF LIABILITY</h4>
                  <p className="mb-3">Buyer's total liability under this Agreement is limited to the original purchase amount. Under no circumstances shall Buyer be liable for indirect, incidental, special, or consequential damages arising out of or in connection with this Agreement.</p>

                  <h4 className="font-semibold mb-2">8. INDEMNIFICATION</h4>
                  <p className="mb-3">Seller agrees to indemnify and hold harmless Buyer, its employees, officers, directors, agents, and affiliates from and against all claims, losses, liabilities, damages, expenses, or costs (including attorneys' fees) arising from any breach of Seller's representations, warranties, or obligations under this Agreement.</p>

                  <h4 className="font-semibold mb-2">9. CONFIDENTIALITY</h4>
                  <p className="mb-3">All personal and transaction information provided by the Seller shall remain confidential and used solely for the purpose of fulfilling this Agreement.</p>

                  <h4 className="font-semibold mb-2">10. NON-CIRCUMVENTION</h4>
                  <p className="mb-3">Seller agrees not to directly or indirectly circumvent the Buyer by attempting to negotiate, solicit, or enter into a separate agreement with any third party introduced through Buyer.</p>

                  <h4 className="font-semibold mb-2">11. FRAUD PREVENTION</h4>
                  <p className="mb-3">Any attempt to misrepresent the condition, authenticity, or ownership of an Asset will result in immediate termination of this Agreement and may be reported to the appropriate legal authorities.</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">12. DISPUTE RESOLUTION</h4>
                  <p className="mb-3">Any disputes arising from or relating to this Agreement shall first be resolved through good-faith negotiations. If resolution is not achieved, the dispute shall be resolved via binding arbitration in the State of Delaware.</p>

                  <h4 className="font-semibold mb-2">13. GOVERNING LAW</h4>
                  <p className="mb-3">This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware without regard to its conflict of law principles.</p>

                  <h4 className="font-semibold mb-2">14. ENTIRE AGREEMENT</h4>
                  <p className="mb-3">This Agreement constitutes the entire agreement between the parties and supersedes all prior or contemporaneous understandings, representations, or communications.</p>

                  <h4 className="font-semibold mb-2">15. SEVERABILITY</h4>
                  <p className="mb-3">If any provision of this Agreement is deemed invalid or unenforceable by a court of law, the remaining provisions shall remain in full force and effect.</p>

                  <h4 className="font-semibold mb-2">16. AMENDMENTS</h4>
                  <p className="mb-3">This Agreement may not be modified except in writing signed by both parties.</p>

                  <h4 className="font-semibold mb-2">17. ELECTRONIC SIGNATURES</h4>
                  <p>This Agreement may be executed electronically. The parties agree that electronic signatures are valid and legally binding.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Signature Section */}
          <div className="p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <PenTool className="w-5 h-5 mr-2" />
              Seller Information & Digital Signature
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="sellerName">Seller Name *</Label>
                    <Input
                      id="sellerName"
                      value={formData.sellerName}
                      onChange={(e) => handleInputChange('sellerName', e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="sellerEmail">Seller Email *</Label>
                    <Input
                      id="sellerEmail"
                      type="email"
                      value={formData.sellerEmail}
                      onChange={(e) => handleInputChange('sellerEmail', e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="sellerPhone">Seller Phone Number *</Label>
                    <Input
                      id="sellerPhone"
                      type="tel"
                      value={formData.sellerPhone}
                      onChange={(e) => handleInputChange('sellerPhone', e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Banking Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Bank Info (ACH)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="bankName">Bank Name *</Label>
                    <Input
                      id="bankName"
                      value={formData.bankName}
                      onChange={(e) => handleInputChange('bankName', e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="routingNumber">Routing Number *</Label>
                    <Input
                      id="routingNumber"
                      value={formData.routingNumber}
                      onChange={(e) => handleInputChange('routingNumber', e.target.value)}
                      className="mt-1"
                      maxLength={9}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="accountNumber">Account Number *</Label>
                    <Input
                      id="accountNumber"
                      value={formData.accountNumber}
                      onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="accountType">Account Type *</Label>
                    <Select onValueChange={(value) => handleInputChange('accountType', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checking">Checking</SelectItem>
                        <SelectItem value="savings">Savings</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="fullNameOnAccount">Full Name on Account *</Label>
                    <Input
                      id="fullNameOnAccount"
                      value={formData.fullNameOnAccount}
                      onChange={(e) => handleInputChange('fullNameOnAccount', e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="bankAddress">Bank Address (optional)</Label>
                    <Input
                      id="bankAddress"
                      value={formData.bankAddress}
                      onChange={(e) => handleInputChange('bankAddress', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Digital Signature */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  Digital Signature *
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={clearSignature}
                    className="flex items-center space-x-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Clear</span>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <SignatureCanvas
                    ref={sigRef}
                    canvasProps={{
                      className: 'w-full h-32 border border-gray-200 rounded',
                      style: { background: 'white' }
                    }}
                  />
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Sign above using your mouse or touch screen
                  </p>
                </div>
                
                <div className="mt-4">
                  <Label htmlFor="signatureDate">Date *</Label>
                  <Input
                    id="signatureDate"
                    value={formData.signatureDate}
                    onChange={(e) => handleInputChange('signatureDate', e.target.value)}
                    className="mt-1 max-w-xs"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Agreement Acknowledgment */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 mb-2">
                <strong>By signing below, Seller affirms that they have read, understood, and agreed to the terms and conditions of this Agreement.</strong>
              </p>
              <p className="text-xs text-blue-600">
                This electronic signature is legally binding and equivalent to a handwritten signature.
              </p>
            </div>

            {/* Submit Button */}
            <div className="mt-8 text-center">
              <Button
                onClick={handleSubmit}
                size="lg"
                className="w-full md:w-auto px-12"
              >
                <Save className="w-4 h-4 mr-2" />
                Sign Agreement & Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LegalAgreementPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading legal agreement...</p>
        </div>
      </div>
    }>
      <LegalAgreementContent />
    </Suspense>
  )
} 