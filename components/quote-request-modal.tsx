"use client"
import { Button } from "@/components/ui/button"
import type React from "react"

import { X } from "lucide-react"
import { useState } from "react"
interface QuoteRequestModalProps {
  isOpen: boolean
  onClose: () => void
}
export default function QuoteRequestModal({ isOpen, onClose }: QuoteRequestModalProps) {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    source: "Website",
    requestType: "Product Enquiry",
    email: "",
    mobile: "",
    organization: "",
    status: "Open",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitResult(null)

    const payload = {
      first_name: formState.firstName,
      last_name: formState.lastName,
      source: formState.source,
      request_type: formState.requestType,
      email_id: formState.email,
      mobile_no: formState.mobile,
      company_name: formState.organization,
      status: formState.status,
    }

    try {
      const resp = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await resp.json()

      if (!resp.ok) throw new Error(data.message || resp.statusText)

      setSubmitResult({
        success: data.success,
        message: data.message,
      })

      if (data.success) {
        setFormState({
          firstName: "",
          lastName: "",
          source: "Website",
          requestType: "Product Enquiry",
          email: "",
          mobile: "",
          organization: "",
          status: "Open",
        })

        setTimeout(() => {
          onClose()
          setSubmitResult(null)
        }, 3000)
      }
    } catch (err: any) {
      setSubmitResult({
        success: false,
        message: `Submission failed: ${err.message}`,
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
                    value={formState.firstName}
                    onChange={handleChange}
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
                    value={formState.lastName}
                    onChange={handleChange}
                    className="mt-1 w-full px-3 py-2 border rounded focus:ring-red-500 focus:border-red-500"
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Request Type*
                <select
                  name="requestType"
                  value={formState.requestType}
                  onChange={handleChange}
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
                  value={formState.email}
                  onChange={handleChange}
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
                  value={formState.mobile}
                  onChange={handleChange}
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
                  value={formState.organization}
                  onChange={handleChange}
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
