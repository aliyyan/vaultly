import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-16 md:py-24">
      <div className="prose max-w-4xl mx-auto">
        <h1>Privacy Policy</h1>
        <p>Last updated: July 18, 2025</p>
        <p>
          Vaultly ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we
          collect, use, disclose, and safeguard your information when you visit our website.
        </p>
        <h2>1. Information We Collect</h2>
        <p>
          We may collect personal information from you such as your name, email address, phone number, and details about
          the assets you wish to sell.
        </p>
        <h2>2. Use of Your Information</h2>
        <p>
          We use the information we collect to:
          <ul>
            <li>Provide, operate, and maintain our services.</li>
            <li>Process your transactions.</li>
            <li>Communicate with you.</li>
            <li>Prevent fraudulent activity.</li>
          </ul>
        </p>
        {/* Add more legal content as needed */}
        <h2>3. Disclosure of Your Information</h2>
        <p>
          We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This
          does not include trusted third parties who assist us in operating our website or servicing you, so long as
          those parties agree to keep this information confidential.
        </p>
      </div>
    </div>
  )
}
