"use client"
import { Button } from "@/components/ui/button"
import type React from "react"
import { useEffect, useState } from "react"

const API_URL = "https://elina.frappe.cloud/api"
const AUTH_HEADER = {
  Authorization: `token  9403214475f834f:df3e2e8bfee05db`,
  "Content-Type": "application/json",
}

export default function ContactFormPage() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    source: "Website",
    requestType: "Product Enquiry",
    email: "",
    mobile: "",
    organization: "",
    status: "Open",
    territory: "",
    country: "India", // default to India
  })
  const [territories, setTerritories] = useState<string[]>([])
  const [countries, setCountries] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)

  useEffect(() => {
    // Capture referer
    if (document.referrer) {
      setFormState((prev) => ({ ...prev, source: document.referrer }))
    }
    // Fetch territories
    fetch(`${API_URL}/resource/Territory?fields=["territory_name","parent_territory"]&limit=100`, {
      method: "GET",
      headers: AUTH_HEADER,
    })
      .then((res) => res.json())
      .then((data) => {
        const filtered = (data.data || [])
          .map((t: any) => t.territory_name)
          .filter((name: string) => name !== "All Territories" && !name.includes("Zone"))
        setTerritories(filtered)
      })
      .catch((err) => console.error("Error fetching territories:", err))
    // Fetch countries
    fetch(`${API_URL}/resource/Country?fields=["country_name"]&limit=500`, {
      method: "GET",
      headers: AUTH_HEADER,
    })
      .then((res) => res.json())
      .then((data) => {
        const allCountries = (data.data || []).map((c: any) => c.country_name)
        setCountries(allCountries)
      })
      .catch((err) => console.error("Error fetching countries:", err))
  }, [])

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
      territory: formState.territory,
      country: formState.country,
    }

    try {
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

      setSubmitResult({
        success: true,
        message: "Your request has been submitted! We'll get back to you soon.",
      })

      setFormState({
        firstName: "",
        lastName: "",
        source: "Website",
        requestType: "Product Enquiry",
        email: "",
        mobile: "",
        organization: "",
        status: "Open",
        territory: "",
        country: "India",
      })
    } catch (err: any) {
      setSubmitResult({ success: false, message: `Submission failed: ${err.message}` })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Request a Quote</h1>
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
        {/* Territory Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-1">
            State (Territory)*
            <select
              name="territory"
              value={formState.territory}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border rounded focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Select State</option>
              {territories.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
        </div>
        {/* Country Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Country*
            <select
              name="country"
              value={formState.country}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border rounded focus:ring-red-500 focus:border-red-500"
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </main>
  )
}
