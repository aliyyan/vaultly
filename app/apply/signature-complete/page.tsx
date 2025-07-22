import Link from 'next/link'
import { CheckCircle, Download, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SignatureComplete() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-4">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Application Submitted Successfully!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Thank you for completing your digital signature. Your asset funding application 
            has been submitted and is now being reviewed by our team.
          </p>

          {/* What's Next Section */}
          <div className="bg-slate-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              What happens next?
            </h2>
            
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Document Review</p>
                  <p className="text-sm text-gray-600">Our team will review your application and signed documents within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Asset Evaluation</p>
                  <p className="text-sm text-gray-600">We'll assess your asset value and determine funding amount</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Funding Decision</p>
                  <p className="text-sm text-gray-600">You'll receive our funding decision via email within 48 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Need assistance?
            </h3>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
              <div className="flex items-center justify-center space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm text-gray-600">678-779-7465</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm text-gray-600">support@tryvaultly.com</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link href="/">
                  Return to Home
                </Link>
              </Button>
              
              <Button asChild>
                <Link href="/contact">
                  Contact Support
                </Link>
              </Button>
            </div>
          </div>

          {/* Reference Number */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">
              Application Reference: {new Date().getTime().toString().slice(-8)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 