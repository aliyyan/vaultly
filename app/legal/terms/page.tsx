import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, FileText, Clock } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="container mx-auto py-16 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Legal Terms & Conditions</h1>
        <p className="text-xl text-gray-600">
          Asset Purchase and Repurchase Agreement Terms
        </p>
        <div className="flex justify-center mt-4">
          <Badge className="bg-green-600 text-white px-4 py-2">
            <FileText className="w-4 h-4 mr-2" />
            Effective: January 2024
          </Badge>
        </div>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg mb-8">
        <div className="flex items-start">
          <AlertTriangle className="w-6 h-6 text-amber-600 mt-1 mr-4 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-amber-800 mb-2">IMPORTANT LEGAL NOTICE</h3>
            <p className="text-amber-800">
              <strong>This is NOT a loan transaction.</strong> Vaultly purchases your asset with full title transfer. 
              You have an optional right to repurchase but NO OBLIGATION to do so. Failure to repurchase 
              results in no debt, liability, or impact to your credit.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Nature of Transaction */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <CardTitle className="flex items-center">
              <Shield className="w-6 h-6 mr-3" />
              1. Nature of Transaction - Asset Purchase Agreement
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <h4 className="font-bold text-gray-900">Absolute Sale with Repurchase Option</h4>
            <p className="text-gray-700 leading-relaxed">
              Upon execution of this agreement, <strong>Seller hereby transfers full legal and equitable title</strong> 
              of the Asset to Vaultly Asset Holdings LLC ("Vaultly"). This constitutes a complete sale transaction, 
              not a loan, advance, or pawn arrangement.
            </p>
            
            <h4 className="font-bold text-gray-900 mt-6">Repurchase Rights</h4>
            <p className="text-gray-700 leading-relaxed">
              Seller receives an <strong>exclusive repurchase option</strong> personal to Seller, which 
              <strong>expires automatically</strong> ninety (90) days from the sale date. This option cannot 
              be assigned, transferred, or extended beyond the stated deadline.
            </p>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-green-800 font-medium">
                ✓ Complete title transfer upon sale<br/>
                ✓ Fixed repurchase price set on day one<br/>
                ✓ No personal liability if option expires<br/>
                ✓ No credit reporting or debt collections
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Structure */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gray-800 text-white">
            <CardTitle className="flex items-center">
              <Clock className="w-6 h-6 mr-3" />
              2. Pricing Structure - Fixed Dollar Amounts
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <h4 className="font-bold text-gray-900">Purchase Price</h4>
            <p className="text-gray-700 leading-relaxed">
              Vaultly will purchase your asset for the agreed purchase price, paid immediately via wire transfer 
              upon receipt and authentication of the asset.
            </p>
            
            <h4 className="font-bold text-gray-900 mt-6">Repurchase Price - Fixed Dollar Amount</h4>
            <p className="text-gray-700 leading-relaxed">
              The repurchase price is a <strong>fixed dollar amount</strong> determined at the time of sale, 
              representing the fair market premium for the repurchase option. This is <strong>not interest</strong> 
              and is not calculated as an annual percentage rate.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Purchase Amount</th>
                    <th className="px-4 py-3 text-left font-semibold">Repurchase Premium</th>
                    <th className="px-4 py-3 text-left font-semibold">Term</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-4 py-3">$500 - $999</td><td className="px-4 py-3">+$150 - $200</td><td className="px-4 py-3">90 days</td></tr>
                  <tr><td className="px-4 py-3">$1,000 - $2,499</td><td className="px-4 py-3">+$200 - $400</td><td className="px-4 py-3">90 days</td></tr>
                  <tr><td className="px-4 py-3">$2,500 - $4,999</td><td className="px-4 py-3">+$400 - $750</td><td className="px-4 py-3">90 days</td></tr>
                  <tr><td className="px-4 py-3">$5,000+</td><td className="px-4 py-3">Custom pricing</td><td className="px-4 py-3">90 days</td></tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* No Personal Liability */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-red-600 text-white">
            <CardTitle>3. No Personal Covenant to Pay</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-red-800 font-bold text-lg mb-2">
                SELLER HAS NO OBLIGATION TO REPURCHASE
              </p>
              <ul className="text-red-800 space-y-1 list-disc list-inside">
                <li>Failure to exercise repurchase option creates <strong>NO DEBT</strong></li>
                <li>No collections activity will be initiated</li>
                <li>No credit reporting of any kind</li>
                <li>No personal liability beyond the asset sold</li>
                <li>Seller may walk away at any time with no consequences</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Market Risk */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle>4. Market Risk Acknowledgment</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <h4 className="font-bold text-gray-900">Vaultly Assumes Full Market Risk</h4>
            <p className="text-gray-700 leading-relaxed">
              Upon expiration of the repurchase deadline, Vaultly assumes <strong>100% of market risk</strong> 
              for the asset. Seller waives any claim to appreciation or depreciation in asset value after 
              the deadline expires.
            </p>
            
            <h4 className="font-bold text-gray-900 mt-6">Asset Care and Insurance</h4>
            <p className="text-gray-700 leading-relaxed">
              Vaultly will store the asset in a secure, insured facility and maintain appropriate insurance 
              coverage. Asset condition is guaranteed to be maintained during the repurchase period.
            </p>
          </CardContent>
        </Card>

        {/* Compliance */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-purple-600 text-white">
            <CardTitle>5. Regulatory Compliance</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <h4 className="font-bold text-gray-900">Licensed Operations</h4>
            <p className="text-gray-700 leading-relaxed">
              Vaultly operates as a licensed second-hand dealer in compliance with state regulations. 
              All transactions are reported to local law enforcement via LeadsOnline or equivalent systems 
              within 24 hours as required by law.
            </p>
            
            <h4 className="font-bold text-gray-900 mt-6">Know Your Customer (KYC) Requirements</h4>
            <p className="text-gray-700 leading-relaxed">
              All sellers must provide valid government-issued photo identification. Identity verification 
              and OFAC screening will be conducted prior to any transaction. Suspicious transactions will 
              be reported to appropriate authorities.
            </p>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-purple-800 font-medium">
                Licensed Operations in: Texas, Florida, Georgia, Arizona, Utah, Alabama, South Carolina, Colorado, Nevada
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Governing Law */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gray-600 text-white">
            <CardTitle>6. Governing Law and Venue</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              This agreement shall be governed by the laws of the State of Texas, without regard to conflict 
              of law principles. Any disputes shall be resolved in the state or federal courts located in 
              Harris County, Texas. Seller consents to personal jurisdiction in Texas courts.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-green-600 text-white">
            <CardTitle>7. Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Vaultly Asset Holdings LLC</h4>
                <p className="text-gray-700">
                  1234 Asset Boulevard<br/>
                  Houston, TX 77002<br/>
                  Phone: (555) 123-VAULT<br/>
                  Email: legal@vaultly.com
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Business Hours</h4>
                <p className="text-gray-700">
                  Monday - Friday: 9:00 AM - 6:00 PM CST<br/>
                  Saturday: 10:00 AM - 4:00 PM CST<br/>
                  Sunday: Closed<br/>
                  Emergency: (555) 123-HELP
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500">
          Last Updated: January 15, 2024 | Version 2.1<br/>
          These terms constitute the complete agreement between parties and supersede all prior negotiations.
        </p>
      </div>
    </div>
  )
}
