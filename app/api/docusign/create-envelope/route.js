import { NextResponse } from 'next/server';
import DocuSignService from '@/lib/docusign';

export async function POST(request) {
  try {
    const applicationData = await request.json();
    
    // Validate required fields
    const { firstName, lastName, email, phone } = applicationData;
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: firstName, lastName, email' },
        { status: 400 }
      );
    }

    // Create DocuSign envelope
    const envelope = await DocuSignService.createEnvelope(applicationData);
    
    // Get embedded signing URL
    const returnUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/apply/signature-complete`;
    const signingUrl = await DocuSignService.getEmbeddedSigningView(
      envelope.envelopeId,
      email,
      returnUrl
    );

    return NextResponse.json({
      success: true,
      envelopeId: envelope.envelopeId,
      signingUrl: signingUrl
    });

  } catch (error) {
    console.error('DocuSign error:', error);
    return NextResponse.json(
      { error: 'Failed to create signing document', details: error.message },
      { status: 500 }
    );
  }
} 