-- Create Legal_documents table for signed legal agreements
CREATE TABLE IF NOT EXISTS Legal_documents (
  id BIGSERIAL PRIMARY KEY,
  -- Personal Information
  seller_name TEXT NOT NULL,
  seller_email TEXT NOT NULL,
  seller_phone TEXT NOT NULL,
  
  -- Banking Information
  bank_name TEXT NOT NULL,
  routing_number TEXT NOT NULL,
  account_number TEXT NOT NULL,
  account_type TEXT NOT NULL,
  full_name_on_account TEXT NOT NULL,
  bank_address TEXT,
  
  -- Signature Information
  signature_data TEXT NOT NULL, -- Base64 signature image
  signature_date TEXT NOT NULL,
  
  -- Agreement Status
  agreement_status TEXT DEFAULT 'signed',
  signed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE Legal_documents ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (you can make this more restrictive later)
DROP POLICY IF EXISTS "Allow all operations on Legal_documents" ON Legal_documents;
CREATE POLICY "Allow all operations on Legal_documents" ON Legal_documents
FOR ALL USING (true) WITH CHECK (true); 