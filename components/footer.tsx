import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-dark text-secondary">
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-serif font-bold">Vaultly</h3>
            <p className="text-sm text-gray-400 mt-2">Fast, Secure, Confidential.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-400 hover:text-white">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/assets-we-fund" className="text-gray-400 hover:text-white">
                  Assets We Fund
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/security" className="text-gray-400 hover:text-white">
                  Security & Insurance
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/legal/terms" className="text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-xs text-gray-500 space-y-4">
          <p>
            DISCLAIMER: Vaultly engages in non-recourse, sale-repurchase agreements and is not a lender, broker, or pawn
            shop. All transactions involve the legal sale of an asset to Vaultly, wherein the seller receives an
            exclusive option to repurchase the asset at a later date for a pre-determined price. If the seller does not
            exercise their option to repurchase, Vaultly retains ownership of the asset and the transaction is concluded
            with no further obligation from the seller. This is not a loan; no interest is charged, and no credit
            reporting occurs.
          </p>
          <p>
            Services may not be available in all states. All transactions are subject to federal and applicable state
            laws. Vaultly does not currently operate in jurisdictions that prohibit sale-repurchase agreements. Advance
            amounts are based on our internal appraisal of the asset's secondary market value and are not an official
            appraisal for insurance or estate purposes.
          </p>
          <p>&copy; {new Date().getFullYear()} Vaultly Inc. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
