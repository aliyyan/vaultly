import SupabaseExample from '@/components/supabase-example'

export default function SupabaseTestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Supabase Integration Test
          </h1>
          <p className="text-lg text-gray-600">
            Test your Supabase connection and database operations
          </p>
        </div>
        
        <SupabaseExample />
        
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
} 