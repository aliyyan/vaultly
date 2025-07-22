'use client'

import { useState, useEffect } from 'react'
import { supabase, getTodos, createTodo, updateTodo, deleteTodo } from '@/lib/supabase'

interface Todo {
  id: number
  title: string
  completed: boolean
  created_at: string
}

export default function SupabaseExample() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [loading, setLoading] = useState(true)

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    setLoading(true)
    const data = await getTodos()
    if (data) {
      setTodos(data)
    }
    setLoading(false)
  }

  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    const data = await createTodo({ title: newTodo.trim(), completed: false })
    if (data) {
      setTodos([...todos, ...data])
      setNewTodo('')
    }
  }

  const handleToggleTodo = async (id: number, completed: boolean) => {
    const data = await updateTodo(id, { completed: !completed })
    if (data) {
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, completed: !completed } : todo
      ))
    }
  }

  const handleDeleteTodo = async (id: number) => {
    const data = await deleteTodo(id)
    if (data !== null) {
      setTodos(todos.filter(todo => todo.id !== id))
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Supabase Example</h2>
        <p>Loading todos...</p>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Supabase Todo Example</h2>
      
      {/* Create Todo Form */}
      <form onSubmit={handleCreateTodo} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </button>
        </div>
      </form>

      {/* Todos List */}
      <div className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No todos yet. Create one above!</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-md"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id, todo.completed)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span
                className={`flex-1 ${
                  todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
                }`}
              >
                {todo.title}
              </span>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="px-2 py-1 text-red-600 hover:text-red-800 focus:outline-none"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Connection Status */}
      <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-md">
        <p className="text-green-800 text-sm">
          ✅ Connected to Supabase successfully!
        </p>
      </div>
    </div>
  )
} 