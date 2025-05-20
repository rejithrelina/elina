"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { submitQuoteRequest } from "@/app/actions/quote-form"

interface QuoteRequestModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function QuoteRequestModal({ isOpen, onClose }: QuoteRequestModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      const formData = new FormData(event.currentTarget)
      const result = await submitQuoteRequest(formData)

      setSubmitResult(result)

      if (result.success) {
        // Reset form on success
        ;(event.target as HTMLFormElement).reset()

        // Close modal after a delay
        setTimeout(() => {
          onClose()
          setSubmitResult(null)
        }, 3000)
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Request a Quote</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
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
                Source
                <input
                  name="source"
                  type="text"
                  defaultValue="Website"
                  readOnly
                  className="mt-1 w-full px-3 py-2 border bg-gray-100 rounded"
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
            <div className="flex justify-end space-x-3 mt-4">
              <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
