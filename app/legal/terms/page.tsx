import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
}

export default function TermsPage() {
  return (
    <div className="container mx-auto py-16 md:py-24">
      <div className="prose max-w-4xl mx-auto">
        <h1>Terms of Service</h1>
        <p>Last updated: July 18, 2025</p>
        <p>
          Welcome to Vaultly. These Terms of Service ("Terms") govern your use of the Vaultly website and the services
          offered. By using our services, you agree to these Terms.
        </p>
        <h2>1. Description of Service</h2>
        <p>
          Vaultly provides a service through which individuals can sell personal property ("Assets") to Vaultly in
          exchange for a cash payment ("Advance"). As part of the sale, Vaultly grants the seller an exclusive option to
          repurchase the Asset at a later date for a pre-determined price ("Repurchase Price"). This transaction is a
          sale-repurchase agreement and is NOT a loan.
        </p>
        <h2>2. Eligibility</h2>
        <p>You must be at least 18 years old and the legal owner of any Asset you submit to us.</p>
        {/* Add more legal content as needed */}
        <h2>3. The Process</h2>
        <p>
          The process involves submitting your item, receiving a preliminary offer, shipping the item to us (at our
          cost), expert verification, and a final offer. If you accept the final offer, we will pay you the Advance.
        </p>
        <h2>4. Repurchase Option</h2>
        <p>
          If you choose not to exercise your repurchase option by the expiration date, your option is void, and Vaultly
          retains full and final ownership of the Asset. There is no penalty or further obligation on your part.
        </p>
      </div>
    </div>
  )
}
