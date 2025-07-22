'use client'

import { useState, useEffect } from 'react'
import { 
  supabase, 
  getTodos, 
  createTodo, 
  createAssetApplication, 
  getAssetApplications,
  createContactMessage,
  getContactMessages,
  getAssetCategories,
  type AssetApplication,
  type ContactMessage
} from '@/lib/supabase'

export default function DatabaseTest() {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'connected' | 'error'>('testing')
  const [testResults, setTestResults] = useState<string[]>([])
  const [todos, setTodos] = useState<any[]>([])
  const [applications, setApplications] = useState<AssetApplication[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    testDatabaseConnection()
  }, [])

  const addTestResult = (message: string, success: boolean = true) => {
    const status = success ? '✅' : '❌'
    setTestResults(prev => [...prev, `${status} ${message}`])
  }

  const testDatabaseConnection = async () => {
    setConnectionStatus('testing')
    setTestResults([])
    
    try {
      // Test basic connection
      addTestResult('Testing database connection...')
      const { data, error } = await supabase.from('todos').select('count').limit(1)
      
      if (error && error.code === '42P01') {
        addTestResult('Tables not found - please run the SQL setup first', false)
        setConnectionStatus('error')
        return
      }
      
      if (error) {
        addTestResult(`Connection error: ${error.message}`, false)
        setConnectionStatus('error')
        return
      }
      
      addTestResult('Database connection successful!')
      setConnectionStatus('connected')
      
      // Run all tests
      await runAllTests()
      
    } catch (err) {
      addTestResult(`Unexpected error: ${err}`, false)
      setConnectionStatus('error')
    }
  }

  const runAllTests = async () => {
    // Test 1: Todos table
    try {
      addTestResult('Testing todos table...')
      
      // Create a test todo
      const todoResult = await createTodo({ title: `Test todo ${Date.now()}`, completed: false })
      if (todoResult) {
        addTestResult('✓ Todo created successfully')
        
        // Fetch todos
        const todosData = await getTodos()
        if (todosData) {
          setTodos(todosData.slice(0, 5)) // Show only last 5
          addTestResult(`✓ Fetched ${todosData.length} todos`)
        }
      }
    } catch (err) {
      addTestResult(`Todo test failed: ${err}`, false)
    }

    // Test 2: Asset Categories table
    try {
      addTestResult('Testing asset_categories table...')
      const categoriesData = await getAssetCategories()
      if (categoriesData) {
        setCategories(categoriesData)
        addTestResult(`✓ Fetched ${categoriesData.length} asset categories`)
      } else {
        addTestResult('No asset categories found - table may be empty', false)
      }
    } catch (err) {
      addTestResult(`Categories test failed: ${err}`, false)
    }

    // Test 3: Asset Applications table
    try {
      addTestResult('Testing asset_applications table...')
      
      // Create a test application
      const testApp: Omit<AssetApplication, 'id' | 'created_at' | 'updated_at'> = {
        first_name: 'Test',
        last_name: 'User',
        email: 'test@example.com',
        phone: '555-0123',
        asset_type: 'watch',
        asset_brand: 'Rolex',
        asset_model: 'Submariner',
        estimated_value: 8000,
        requested_amount: 5000,
        condition: 'excellent'
      }
      
      const appResult = await createAssetApplication(testApp)
      if (appResult) {
        addTestResult('✓ Asset application created successfully')
        
        // Fetch applications
        const appsData = await getAssetApplications()
        if (appsData) {
          setApplications(appsData.slice(0, 5)) // Show only last 5
          addTestResult(`✓ Fetched ${appsData.length} applications`)
        }
      }
    } catch (err) {
      addTestResult(`Asset application test failed: ${err}`, false)
    }

    // Test 4: Contact Messages table
    try {
      addTestResult('Testing contact_messages table...')
      
      // Create a test message
      const testMessage: Omit<ContactMessage, 'id' | 'created_at'> = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Database Test',
        message: `Test message created at ${new Date().toISOString()}`
      }
      
      const messageResult = await createContactMessage(testMessage)
      if (messageResult) {
        addTestResult('✓ Contact message created successfully')
        
        // Fetch messages
        const messagesData = await getContactMessages()
        if (messagesData) {
          setMessages(messagesData.slice(0, 5)) // Show only last 5
          addTestResult(`✓ Fetched ${messagesData.length} messages`)
        }
      }
    } catch (err) {
      addTestResult(`Contact message test failed: ${err}`, false)
    }

    addTestResult('🎉 All database tests completed!')
  }

  const handleRunTests = () => {
    testDatabaseConnection()
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Database Connection Test</h2>
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className={`w-3 h-3 rounded-full ${
            connectionStatus === 'testing' ? 'bg-yellow-500 animate-pulse' :
            connectionStatus === 'connected' ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <span className="font-medium">
            {connectionStatus === 'testing' && 'Testing connection...'}
            {connectionStatus === 'connected' && 'Connected to Supabase'}
            {connectionStatus === 'error' && 'Connection failed'}
          </span>
        </div>
        
        <button
          onClick={handleRunTests}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Run Tests Again
        </button>
      </div>

      {/* Test Results */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">Test Results</h3>
        <div className="space-y-1 font-mono text-sm max-h-60 overflow-y-auto">
          {testResults.map((result, index) => (
            <div key={index} className="text-gray-700">
              {result}
            </div>
          ))}
        </div>
      </div>

      {/* Data Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Todos */}
        <div className="bg-white rounded-lg border p-4">
          <h3 className="text-lg font-semibold mb-3">Recent Todos ({todos.length})</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {todos.map((todo) => (
              <div key={todo.id} className="text-sm p-2 bg-gray-50 rounded">
                <div className="font-medium">{todo.title}</div>
                <div className="text-gray-500">
                  {todo.completed ? '✅ Completed' : '⏳ Pending'} • {new Date(todo.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Asset Categories */}
        <div className="bg-white rounded-lg border p-4">
          <h3 className="text-lg font-semibold mb-3">Asset Categories ({categories.length})</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {categories.map((category) => (
              <div key={category.id} className="text-sm p-2 bg-gray-50 rounded">
                <div className="font-medium">{category.name}</div>
                <div className="text-gray-500">
                  Max: ${category.max_funding_amount?.toLocaleString() || 'N/A'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Asset Applications */}
        <div className="bg-white rounded-lg border p-4">
          <h3 className="text-lg font-semibold mb-3">Recent Applications ({applications.length})</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {applications.map((app) => (
              <div key={app.id} className="text-sm p-2 bg-gray-50 rounded">
                <div className="font-medium">{app.first_name} {app.last_name}</div>
                <div className="text-gray-500">
                  {app.asset_type} • ${app.requested_amount?.toLocaleString() || 'N/A'} • {app.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Messages */}
        <div className="bg-white rounded-lg border p-4">
          <h3 className="text-lg font-semibold mb-3">Recent Messages ({messages.length})</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className="text-sm p-2 bg-gray-50 rounded">
                <div className="font-medium">{message.name}</div>
                <div className="text-gray-500">
                  {message.subject} • {message.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SQL Setup Instructions */}
      {connectionStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Setup Required</h3>
          <p className="text-red-700 mb-3">
            It looks like your database tables haven't been created yet. Please run the SQL commands in your Supabase dashboard:
          </p>
          <ol className="text-red-700 text-sm space-y-1 list-decimal list-inside">
            <li>Go to your Supabase Dashboard</li>
            <li>Navigate to SQL Editor</li>
            <li>Run the SQL commands I provided earlier</li>
            <li>Come back and click "Run Tests Again"</li>
          </ol>
        </div>
      )}
    </div>
  )
} 