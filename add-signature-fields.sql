-- Migration: Add signature fields to asset_applications table
-- Run this in your Supabase SQL Editor

-- Add the missing signature fields
ALTER TABLE asset_applications 
ADD COLUMN IF NOT EXISTS signature_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS signed_full_name TEXT,
ADD COLUMN IF NOT EXISTS legal_agreements_accepted BOOLEAN DEFAULT FALSE;

-- Verify the columns were added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'asset_applications' 
ORDER BY ordinal_position; 