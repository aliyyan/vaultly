-- Vaultly Database Setup
-- Copy and paste this entire file into your Supabase SQL Editor

-- 1. Create todos table (for testing)
CREATE TABLE IF NOT EXISTS todos (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create asset_applications table (main application form)
CREATE TABLE IF NOT EXISTS asset_applications (
  id BIGSERIAL PRIMARY KEY,
  -- Personal Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  
  -- Asset Information
  asset_type TEXT NOT NULL,
  asset_brand TEXT,
  asset_model TEXT,
  asset_description TEXT,
  estimated_value DECIMAL(10,2),
  condition TEXT,
  
  -- Loan Details
  requested_amount DECIMAL(10,2),
  loan_purpose TEXT,
  
  -- Legal & Signature
  signature_date TIMESTAMP WITH TIME ZONE,
  signed_full_name TEXT,
  legal_agreements_accepted BOOLEAN DEFAULT FALSE,
  
  -- Application Status
  status TEXT DEFAULT 'pending',
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create asset_images table (for photo uploads)
CREATE TABLE IF NOT EXISTS asset_images (
  id BIGSERIAL PRIMARY KEY,
  application_id BIGINT REFERENCES asset_applications(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  image_type TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create contact_messages table (contact form)
CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create asset_categories table (reference data)
CREATE TABLE IF NOT EXISTS asset_categories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  max_funding_amount DECIMAL(10,2),
  description TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Insert default asset categories
INSERT INTO asset_categories (name, max_funding_amount, description) VALUES
('Luxury Watches', 25000.00, 'Rolex, Patek Philippe, Audemars Piguet'),
('Fine Jewelry', 15000.00, 'Diamonds, precious metals, designer pieces'),
('Electronics', 5000.00, 'Cameras, phones, laptops, gaming equipment'),
('Designer Handbags', 8000.00, 'Louis Vuitton, Chanel, Hermès'),
('Art & Collectibles', 20000.00, 'Paintings, sculptures, rare collectibles'),
('Musical Instruments', 10000.00, 'Guitars, violins, professional equipment'),
('Other', 10000.00, 'Art, collectibles, antiques, sports memorabilia')
ON CONFLICT (name) DO NOTHING;

-- 7. Enable Row Level Security (RLS)
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;
ALTER TABLE asset_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE asset_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE asset_categories ENABLE ROW LEVEL SECURITY;

-- 8. Create policies (allowing all operations for development)
-- Note: In production, you should create more restrictive policies

-- Todos policies
DROP POLICY IF EXISTS "Allow all operations on todos" ON todos;
CREATE POLICY "Allow all operations on todos" ON todos
FOR ALL USING (true) WITH CHECK (true);

-- Asset applications policies
DROP POLICY IF EXISTS "Allow all operations on asset_applications" ON asset_applications;
CREATE POLICY "Allow all operations on asset_applications" ON asset_applications
FOR ALL USING (true) WITH CHECK (true);

-- Asset images policies
DROP POLICY IF EXISTS "Allow all operations on asset_images" ON asset_images;
CREATE POLICY "Allow all operations on asset_images" ON asset_images
FOR ALL USING (true) WITH CHECK (true);

-- Contact messages policies
DROP POLICY IF EXISTS "Allow all operations on contact_messages" ON contact_messages;
CREATE POLICY "Allow all operations on contact_messages" ON contact_messages
FOR ALL USING (true) WITH CHECK (true);

-- Asset categories policies
DROP POLICY IF EXISTS "Allow read access to asset_categories" ON asset_categories;
CREATE POLICY "Allow read access to asset_categories" ON asset_categories
FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow all operations on asset_categories" ON asset_categories;
CREATE POLICY "Allow all operations on asset_categories" ON asset_categories
FOR ALL USING (true) WITH CHECK (true);

-- 9. Create storage bucket for asset images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('asset-images', 'asset-images', true)
ON CONFLICT (id) DO NOTHING;

-- 10. Create storage policies
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
CREATE POLICY "Allow public uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'asset-images');

DROP POLICY IF EXISTS "Allow public access" ON storage.objects;
CREATE POLICY "Allow public access" ON storage.objects
FOR SELECT USING (bucket_id = 'asset-images');

-- Setup complete!
-- You can now test your database at: http://localhost:3000/supabase-test 