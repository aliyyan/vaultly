import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zpsjrdjwiqaqwjsxfhee.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpwc2pyZGp3aXFhcXdqc3hmaGVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwOTMzNTAsImV4cCI6MjA2ODY2OTM1MH0.xCwCfGlc46KM80YFyx970PJ9WzQbPajvDFwFY2uUK5g'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Todo functions (existing)
export async function getTodos() {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching todos:', error)
    return null
  }
  
  return data
}

export async function createTodo(todo: { title: string; completed?: boolean }) {
  const { data, error } = await supabase
    .from('todos')
    .insert([todo])
    .select()
  
  if (error) {
    console.error('Error creating todo:', error)
    return null
  }
  
  return data
}

export async function updateTodo(id: number, updates: { title?: string; completed?: boolean }) {
  const { data, error } = await supabase
    .from('todos')
    .update(updates)
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Error updating todo:', error)
    return null
  }
  
  return data
}

export async function deleteTodo(id: number) {
  const { data, error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting todo:', error)
    return null
  }
  
  return data
}

// Asset Application functions
export interface AssetApplication {
  id?: number
  first_name: string
  last_name: string
  email: string
  phone: string
  address?: string
  city?: string
  state?: string
  zip_code?: string
  asset_type: string
  asset_brand?: string
  asset_model?: string
  asset_description?: string
  estimated_value?: number
  condition?: string
  requested_amount?: number
  loan_purpose?: string
  signature_date?: string
  signed_full_name?: string
  legal_agreements_accepted?: boolean
  status?: string
  created_at?: string
  updated_at?: string
}

export async function createAssetApplication(application: Omit<AssetApplication, 'id' | 'created_at' | 'updated_at'>) {
  console.log('Attempting to create asset application:', application)
  
  const { data, error } = await supabase
    .from('asset_applications')
    .insert([application])
    .select()
  
  if (error) {
    console.error('Supabase error creating asset application:', error)
    console.error('Error details:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    })
    return null
  }
  
  console.log('Asset application created successfully:', data)
  return data
}

export async function getAssetApplications() {
  const { data, error } = await supabase
    .from('asset_applications')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching asset applications:', error)
    return null
  }
  
  return data
}

export async function getAssetApplicationById(id: number) {
  const { data, error } = await supabase
    .from('asset_applications')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching asset application:', error)
    return null
  }
  
  return data
}

export async function updateAssetApplicationStatus(id: number, status: string) {
  const { data, error } = await supabase
    .from('asset_applications')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Error updating application status:', error)
    return null
  }
  
  return data
}

// Contact Message functions
export interface ContactMessage {
  id?: number
  name: string
  email: string
  subject?: string
  message: string
  status?: string
  created_at?: string
}

export async function createContactMessage(message: Omit<ContactMessage, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([message])
    .select()
  
  if (error) {
    console.error('Error creating contact message:', error)
    return null
  }
  
  return data
}

export async function getContactMessages() {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching contact messages:', error)
    return null
  }
  
  return data
}

// Asset Categories functions
export async function getAssetCategories() {
  const { data, error } = await supabase
    .from('asset_categories')
    .select('*')
    .eq('active', true)
    .order('name')
  
  if (error) {
    console.error('Error fetching asset categories:', error)
    return null
  }
  
  return data
}

// Asset Images functions
export async function uploadAssetImage(applicationId: number, imageFile: File, imageType: string) {
  // First upload the file to Supabase Storage
  const fileExt = imageFile.name.split('.').pop()
  const fileName = `${applicationId}/${imageType}_${Date.now()}.${fileExt}`
  
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('asset-images')
    .upload(fileName, imageFile)
  
  if (uploadError) {
    console.error('Error uploading image:', uploadError)
    return null
  }
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('asset-images')
    .getPublicUrl(fileName)
  
  // Save image record to database
  const { data, error } = await supabase
    .from('asset_images')
    .insert([{
      application_id: applicationId,
      image_url: publicUrl,
      image_type: imageType
    }])
    .select()
  
  if (error) {
    console.error('Error saving image record:', error)
    return null
  }
  
  return data
}

export async function getAssetImages(applicationId: number) {
  const { data, error } = await supabase
    .from('asset_images')
    .select('*')
    .eq('application_id', applicationId)
    .order('uploaded_at')
  
  if (error) {
    console.error('Error fetching asset images:', error)
    return null
  }
  
  return data
} 