"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { submitContactForm } from "@/lib/actions"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formState, setFormState] = useState({
    success: null,
    message: "",
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(event.target)
      const response = await submitContactForm(formData)

      setFormState({
        success: response.success,
        message: response.message,
      })

      if (response.success) {
        event.target.reset()
      }
    } catch (error) {
      setFormState({
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-lg shadow-md">
      {formState.message && (
        <div
          className={`p-4 mb-6 rounded-md ${
            formState.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {formState.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name*
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name*
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email*
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
          Subject*
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message*
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
        ></textarea>
      </div>

      <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
