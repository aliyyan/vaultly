import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const formData = await request.json();
    
    // Validate required fields
    const {
      sellerName,
      sellerEmail,
      sellerPhone,
      bankName,
      routingNumber,
      accountNumber,
      accountType,
      fullNameOnAccount,
      bankAddress,
      signature,
      signatureDate
    } = formData;

    // Check required fields
    if (!sellerName || !sellerEmail || !sellerPhone || !bankName || 
        !routingNumber || !accountNumber || !accountType || 
        !fullNameOnAccount || !signature) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save to database
    const { data, error } = await supabase
      .from('legal_agreements')
      .insert([
        {
          seller_name: sellerName,
          seller_email: sellerEmail,
          seller_phone: sellerPhone,
          bank_name: bankName,
          routing_number: routingNumber,
          account_number: accountNumber,
          account_type: accountType,
          full_name_on_account: fullNameOnAccount,
          bank_address: bankAddress || null,
          signature_data: signature,
          signature_date: signatureDate,
          agreement_status: 'signed',
          signed_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to save agreement' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      agreementId: data[0].id,
      message: 'Legal agreement signed and saved successfully'
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 