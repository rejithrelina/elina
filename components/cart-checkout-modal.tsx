"use client"

import { useState } from "react"
import type React from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { X } from "lucide-react"

const API_URL = "https://elina.frappe.cloud/api"
const AUTH_HEADER = {
  Authorization: `token 9403214475f834f:df3e2e8bfee05db`,
  "Content-Type": "application/json",
}

interface CartCheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartCheckoutModal({ isOpen, onClose }: CartCheckoutModalProps) {
  const { cartItems, clearCart } = useCart()
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    source: "Website - Cart",
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

  const generateCartNote = () => {
    const cartSummary = cartItems
      .map(
        (item) =>
          `${item.item_name} (Code: ${item.item_code}) - Qty: ${item.quantity}${item.standard_rate > 0 ? ` - ₹${item.standard_rate.toLocaleString()}` : ""}`,
      )
      .join("\n")

    return `<div class='ql-editor read-mode'><p><strong>Cart Items:</strong></p><p>${cartSummary.replace(/\n/g, "<br>")}</p></div>`
  }

  const addNoteToLead = async (leadId: string) => {
    try {
      const now = new Date().toISOString().slice(0, 19).replace("T", " ")
      const note = {
        name: 1,
        owner: "system@elina.so",
        creation: now,
        modified: now,
        modified_by: "system@elina.so",
        docstatus: 0,
        idx: 1,
        note: generateCartNote(),
        added_by: "system@elina.so",
        added_on: now,
        parent: leadId,
        parentfield: "notes",
        parenttype: "Lead",
        doctype: "CRM Note",
      }

      const updateResp = await fetch(`${API_URL}/resource/Lead/${leadId}`, {
        method: "PUT",
        headers: AUTH_HEADER,
        body: JSON.stringify({ notes: [note] }),
      })

      if (!updateResp.ok) {
        throw new Error("Failed to add cart items to lead")
      }

      return true
    } catch (error) {
      console.error("Error adding note to lead:", error)
      return false
    }
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
      // First create the lead
      const resp = await fetch(`${API_URL}/resource/Lead`, {
        method: "POST",
        headers: AUTH_HEADER,
        body: JSON.stringify(payload),
      })

      const data = await resp.json()

      const duplicate =
        resp.status === 409 ||
        data?.exc_type === "DuplicateEntryError" ||
        String(data?._server_messages).includes("DuplicateEntryError")

      if (duplicate) {
        setSubmitResult({
          success: true,
          message:
            "Looks like you've already submitted a request with this e-mail address. We'll get back to you shortly!",
        })
        return
      }

      if (!resp.ok) throw new Error(data?.message || resp.statusText)

      // If lead creation successful, add cart items as note
      const leadId = data.data.name
      const noteAdded = await addNoteToLead(leadId)

      if (noteAdded) {
        setSubmitResult({
          success: true,
          message: `Your quote request has been submitted with Lead ID: ${leadId}. We'll get back to you soon with pricing for your selected items!`,
        })

        // Clear the cart and form
        clearCart()
        setFormState({
          firstName: "",
          lastName: "",
          source: "Website - Cart",
          requestType: "Product Enquiry",
          email: "",
          mobile: "",
          organization: "",
          status: "Open",
        })

        setTimeout(() => {
          onClose()
          setSubmitResult(null)
        }, 5000)
      } else {
        setSubmitResult({
          success: false,
          message: "Quote request created but failed to attach cart items. Please contact us with your cart details.",
        })
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
          <h2 className="text-2xl font-bold">Checkout - Request Quote</h2>
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

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Cart Summary ({cartItems.length} items)</h3>
            <div className="space-y-1 text-sm text-gray-600 max-h-32 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.item_code} className="flex justify-between">
                  <span className="truncate">{item.item_name}</span>
                  <span>Qty: {item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

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

            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || cartItems.length === 0}>
                {isSubmitting ? "Submitting..." : "Submit Quote Request"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
