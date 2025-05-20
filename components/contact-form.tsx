"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      const formData = new FormData(event.currentTarget)

      // Extract form data
      const data = {
        firstName: formData.get("firstName") as string,
        lastName: (formData.get("lastName") as string) || "",
        email: formData.get("email") as string,
        mobile: formData.get("mobile") as string,
        organization: (formData.get("organization") as string) || "",
        requestType: formData.get("requestType") as string,
        source: (formData.get("source") as string) || "Website Contact Form",
      }

      // Send data to our secure API route
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      setSubmitResult({
        success: result.success,
        message: result.message,
      })

      if (result.success) {
        // Reset form on success
        ;(event.target as HTMLFormElement).reset()
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitResult({
        success: false,
        message: "There was an error submitting your form. Please try again later.",
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
