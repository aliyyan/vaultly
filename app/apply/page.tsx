"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { submitApplication } from "@/lib/actions"
import { CheckCircle } from "lucide-react"

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

export default function ApplyPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    category: "",
    brand: "",
    model: "",
    condition: "",
    value: "",
    name: "",
    email: "",
    phone: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await submitApplication(formData)
    if (result.success) {
      setIsSubmitted(true)
    } else {
      toast({
        title: "Submission Failed",
        description: result.message || "Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isSubmitted) {
    return (
      <div className="container mx-auto py-24 text-center">
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <CardTitle className="font-serif text-3xl">Application Received!</CardTitle>
            <CardDescription>Thank you, {formData.name}.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Your application has been submitted successfully. Our team will review the details and a personal
              concierge will contact you at <strong>{formData.email}</strong> or <strong>{formData.phone}</strong>{" "}
              within the next business day.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-16 md:py-24">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-serif text-4xl">Get Your Cash Offer</CardTitle>
          <CardDescription>Complete the steps below. It's fast, free, and won't affect your credit.</CardDescription>
          <div className="flex items-center gap-4 pt-4">
            <div className={`w-1/2 h-2 rounded-full ${step >= 1 ? "bg-primary" : "bg-gray-200"}`}></div>
            <div className={`w-1/2 h-2 rounded-full ${step >= 2 ? "bg-primary" : "bg-gray-200"}`}></div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="font-bold text-xl">Step 1: Tell us about your item</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      onValueChange={(value) => handleSelectChange("category", value)}
                      defaultValue={formData.category}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="watch">Watch</SelectItem>
                        <SelectItem value="jewelry">Jewelry</SelectItem>
                        <SelectItem value="handbag">Handbag</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      placeholder="e.g., Apple, Tudor"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="model">Model / Description</Label>
                  <Textarea
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="e.g., MacBook Pro 14-inch M3, Black Bay 58"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="condition">Condition</Label>
                    <Select
                      onValueChange={(value) => handleSelectChange("condition", value)}
                      defaultValue={formData.condition}
                    >
                      <SelectTrigger id="condition">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New / Like New</SelectItem>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="value">Estimated Resale Value</Label>
                    <Input
                      id="value"
                      name="value"
                      type="number"
                      value={formData.value}
                      onChange={handleChange}
                      placeholder="e.g., 1500"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="button" onClick={nextStep}>
                    Next: Contact Info
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="font-bold text-xl">Step 2: Your Contact Information</h3>
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                  <Button type="submit">Submit Application</Button>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
