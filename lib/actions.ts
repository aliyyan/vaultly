"use server"

type FormData = {
  category: string
  brand: string
  model: string
  condition: string
  value: string
  name: string
  email: string
  phone: string
}

export async function submitApplication(formData: FormData) {
  // In a real application, you would validate the data and save it to a database.
  // For this demo, we'll just log it and simulate a success response.
  console.log("New application received:", formData)

  if (!formData.email || !formData.name) {
    return { success: false, message: "Please fill out all required fields." }
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return { success: true }
}
