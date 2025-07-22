# DocuSign Integration Setup Guide

## 🎯 Overview
This guide will help you integrate DocuSign e-signature functionality into your Vaultly application for legal agreements and digital signatures.

## 📋 Prerequisites
- DocuSign Developer Account (free sandbox)
- Your legal agreement document in PDF format
- Next.js application (already set up)

## 🔧 Step 1: DocuSign Account Setup

### 1.1 Create Developer Account
1. Go to [DocuSign Developer](https://developers.docusign.com/)
2. Sign up for a free developer account
3. Verify your email address

### 1.2 Create Integration Key
1. Log into your DocuSign Developer account
2. Go to **Apps & Keys** in the admin panel
3. Click **Add App and Integration Key**
4. Fill in app details:
   - **App Name**: "Vaultly Asset Funding"
   - **Description**: "Digital signature for asset funding agreements"
5. Save and copy your **Integration Key**

### 1.3 Get Account Information
1. In DocuSign admin, go to **Settings** → **API and Keys**
2. Copy your **Account ID** (looks like: `12345678-1234-1234-1234-123456789abc`)
3. Copy your **User ID** (your email or GUID)

## 🔐 Step 2: Environment Variables

Add these to your `.env.local` file:

```bash
# DocuSign Configuration
DOCUSIGN_INTEGRATION_KEY=your_integration_key_here
DOCUSIGN_USER_ID=your_user_id_here
DOCUSIGN_ACCOUNT_ID=your_account_id_here
DOCUSIGN_ACCESS_TOKEN=your_jwt_token_here
DOCUSIGN_BASE_PATH=https://demo.docusign.net/restapi
NEXT_PUBLIC_BASE_URL=https://tryvaultly.com
```

## 🔑 Step 3: JWT Token Setup

### 3.1 Generate RSA Key Pair
```bash
# Generate private key
openssl genrsa -out private.key 2048

# Generate public key
openssl rsa -in private.key -outform PEM -pubout -out public.key
```

### 3.2 Add Public Key to DocuSign
1. In DocuSign admin → **Apps & Keys**
2. Click on your app
3. Under **Authentication**, click **Add RSA Keypair**
4. Paste your public key content
5. Save

### 3.3 Generate JWT Token
Use DocuSign's JWT generator or implement OAuth2 flow (recommended for production).

## 📄 Step 4: Legal Document Setup

### 4.1 Create Document Template
1. Create your legal agreement PDF
2. Add form fields where users will sign/enter data:
   - Signature fields
   - Text fields for name, email, phone
   - Date fields
   - Banking information fields

### 4.2 Save Document
Save your legal document as `documents/legal-agreement.pdf` in your project root.

## 🔗 Step 5: Frontend Integration

### 5.1 Update Application Form
Add this to your application form submission:

```jsx
const handleSigningProcess = async (formData) => {
  try {
    // Create DocuSign envelope
    const response = await fetch('/api/docusign/create-envelope', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const { signingUrl, envelopeId } = await response.json();
    
    // Redirect to embedded signing
    window.location.href = signingUrl;
  } catch (error) {
    console.error('Signing error:', error);
  }
};
```

### 5.2 Add Signing Button
```jsx
<Button 
  onClick={() => handleSigningProcess(applicationData)}
  className="w-full"
>
  Sign Agreement Digitally
</Button>
```

## 🏦 Step 6: Banking Information Security

### 6.1 PCI DSS Compliance
For banking information, ensure:
- Use HTTPS everywhere
- Never log sensitive data
- Implement field-level encryption
- Use DocuSign's secure form fields

### 6.2 Recommended Banking Fields
```jsx
// Add these to your DocuSign template
const bankingFields = [
  'Account Holder Name',
  'Bank Name', 
  'Account Number',
  'Routing Number',
  'Account Type' // Checking/Savings
];
```

## 🚀 Step 7: Testing

### 7.1 Sandbox Testing
1. Use sandbox environment: `https://demo.docusign.net/restapi`
2. Test with your email address as signer
3. Verify document flow works end-to-end

### 7.2 Production Deployment
1. Switch to production API: `https://na1.docusign.net/restapi`
2. Update environment variables
3. Test with real users

## 📊 Step 8: Webhook Integration (Optional)

Set up webhooks to track signature status:

```javascript
// webhook endpoint: /api/docusign/webhook
export async function POST(request) {
  const data = await request.json();
  
  if (data.event === 'envelope-completed') {
    // Update your database
    await updateApplicationStatus(data.envelopeId, 'signed');
  }
}
```

## 💰 Pricing Considerations

**DocuSign Pricing:**
- Developer (Free): 3 envelopes/month
- Standard ($10/month): 10 envelopes/month  
- Business Pro ($25/month): 25 envelopes/month
- Enterprise: Custom pricing

## 🎛️ Alternative Solutions

If DocuSign is too expensive:

### HelloSign (Dropbox Sign)
```bash
npm install hellosign-sdk
```
- Cheaper option (~$13/month)
- Simpler API
- Good for smaller volume

### PandaDoc
- All-in-one document platform
- Built-in templates
- ~$19/month

### Adobe Sign
- Enterprise-focused
- Complex documents
- ~$18/month

## 📝 Implementation Checklist

- [ ] DocuSign developer account created
- [ ] Integration key obtained
- [ ] RSA keys generated and added
- [ ] Environment variables configured
- [ ] Legal document PDF created
- [ ] API routes implemented
- [ ] Frontend integration completed
- [ ] Banking fields secured
- [ ] Sandbox testing completed
- [ ] Production deployment planned
- [ ] Webhook integration (optional)
- [ ] User flow tested

## 🔍 Troubleshooting

### Common Issues:
1. **401 Unauthorized**: Check access token and integration key
2. **Account not found**: Verify account ID format
3. **Document not loading**: Check PDF base64 encoding
4. **Signature positioning**: Adjust x/y coordinates in template

### Support Resources:
- [DocuSign Developer Docs](https://developers.docusign.com/)
- [DocuSign Support](https://support.docusign.com/)
- [API Reference](https://developers.docusign.com/esign-rest-api/reference) 