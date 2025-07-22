import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zpsjrdjwiqaqwjsxfhee.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpwc2pyZGp3aXFhcXdqc3hmaGVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwOTMzNTAsImV4cCI6MjA2ODY2OTM1MH0.xCwCfGlc46KM80YFyx970PJ9WzQbPajvDFwFY2uUK5g'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Example usage functions
export async function getTodos() {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
  
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