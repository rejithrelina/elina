"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface QuoteRequestModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function QuoteRequestModal({ isOpen, onClose }: QuoteRequestModalProps) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "commercial",
    budget: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Success response
      setSubmitResult({
        success: true,
        message: "Your quote request has been submitted successfully! We'll get back to you soon.",
      })

      // Reset form
      setFormState({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectType: "commercial",
        budget: "",
        message: "",
      })

      // Close modal after 3 seconds on success
      setTimeout(() => {
        onClose()
        setSubmitResult(null)
      }, 3000)
    } catch (error) {
      setSubmitResult({
        success: false,
        message: "There was an error submitting your request. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Request a Quote</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <div className="p-6">
          {submitResult && (
            <div
              className={`p-4 mb-6 rounded-md ${
                submitResult.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
              }`}
            >
              {submitResult.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company/Organization
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formState.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Type*
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formState.projectType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                >
                  <option value="commercial">Commercial Kitchen</option>
                  <option value="residential">Residential Kitchen</option>
                  <option value="custom">Custom Project</option>
                  <option value="equipment">Equipment Only</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                  Estimated Budget
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formState.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Select Budget Range</option>
                  <option value="below-5-lakh">Below ₹5 Lakh</option>
                  <option value="5-10-lakh">₹5 Lakh - ₹10 Lakh</option>
                  <option value="10-25-lakh">₹10 Lakh - ₹25 Lakh</option>
                  <option value="25-50-lakh">₹25 Lakh - ₹50 Lakh</option>
                  <option value="above-50-lakh">Above ₹50 Lakh</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Project Details*
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                rows={5}
                required
                placeholder="Please describe your project requirements, timeline, and any specific equipment needs."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <Button type="button" variant="outline" onClick={onClose} className="mr-4" disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Quote Request"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
