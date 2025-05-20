"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { submitQuoteRequest } from "@/app/actions/quote-form"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      const formData = new FormData(event.currentTarget)
      // Ensure the form has a request type
      if (!formData.get("requestType")) {
        formData.append("requestType", "Contact Form Submission")
      }

      const result = await submitQuoteRequest(formData)
      setSubmitResult(result)

      if (result.success) {
        // Reset form on success
        ;(event.target as HTMLFormElement).reset()
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-md">
      {submitResult && (
        <div
          className={`p-4 mb-6 rounded-md ${
            submitResult.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {submitResult.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              First Name*
              <input
                name="firstName"
                type="text"
                required
                className="mt-1 w-full px-3 py-2 border rounded focus:ring-red-500 focus:border-red-500"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Last Name
              <input
                name="lastName"
                type="text"
                className="mt-1 w-full px-3 py-2 border rounded focus:ring-red-500 focus:border-red-500"
              />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Email*
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full px-3 py-2 border rounded focus:ring-red-500 focus:border-red-500"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Mobile No*
            <input
              name="mobile"
              type="tel"
              required
              className="mt-1 w-full px-3 py-2 border rounded focus:ring-red-500 focus:border-red-500"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Organization Name
            <input
              name="organization"
              type="text"
              className="mt-1 w-full px-3 py-2 border rounded focus:ring-red-500 focus:border-red-500"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Request Type*
            <select
              name="requestType"
              required
              className="mt-1 w-full px-3 py-2 border rounded focus:ring-red-500 focus:border-red-500"
            >
              <option>Product Enquiry</option>
              <option>Request for Information</option>
              <option>Suggestions</option>
              <option>Other</option>
            </select>
          </label>
        </div>

        <input type="hidden" name="source" value="Website Contact Form" />

        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  )
}
