"use client"
import { Button } from "@/components/ui/button"
import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { useState } from "react"
// point to your ERPNext site
const ERP_SITE = "https://elina.frappe.cloud"
export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<{ success: boolean|null; message: string }>({ success: null, message: "" })
  const [loading, setLoading] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ success: null, message: "" })
    try {
      const payload = {
        lead_name: `${form.firstName} ${form.lastName}`,
        email_id: form.email,
        phone: form.phone,
        source: "Website",
        notes: [
          { note: `Subject: ${form.subject}\n\nMessage: ${form.message}`, note_type: "Comment" }
        ],
      }
      const res = await fetch(
        `${ERP_SITE}/api/method/webhook_contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )
      const data = await res.json()
      if (res.ok && data.message === "success") {
        setStatus({ success: true, message: "Your message has been sent!" })
        setForm({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" })
      } else {
        setStatus({ success: false, message: data.exc || "Something went wrong." })
      }
    } catch (err: any) {
      setStatus({ success: false, message: err.message })
    } finally {
      setLoading(false)
    }
  }
  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions or need more information? We're here to help.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
        {status.message && (
          <div className={`p-4 mb-6 rounded-md ${
              status.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}>
            {status.message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="firstName" value={form.firstName} onChange={handleChange}
              placeholder="First Name *" required
              className="w-full px-4 py-2 border rounded-md focus:ring-red-500"
            />
            <input
              name="lastName" value={form.lastName} onChange={handleChange}
              placeholder="Last Name *" required
              className="w-full px-4 py-2 border rounded-md focus:ring-red-500"
            />
          </div>
          <input
            name="email" type="email" value={form.email} onChange={handleChange}
            placeholder="Email *" required
            className="w-full px-4 py-2 border rounded-md focus:ring-red-500"
          />
          <input
            name="phone" type="tel" value={form.phone} onChange={handleChange}
            placeholder="Phone"
            className="w-full px-4 py-2 border rounded-md focus:ring-red-500"
          />
          <input
            name="subject" value={form.subject} onChange={handleChange}
            placeholder="Subject *" required
            className="w-full px-4 py-2 border rounded-md focus:ring-red-500"
          />
          <textarea
            name="message" rows={5} value={form.message} onChange={handleChange}
            placeholder="Message *" required
            className="w-full px-4 py-2 border rounded-md focus:ring-red-500"
          />
          <Button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white">
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
        </div>
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <div className="bg-gray-50 p-8 rounded-lg mb-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-red-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Address</h3>
                    <p className="text-gray-700">
                      Syena Kitchenconceptz Manufacturing Pvt. Ltd.
                      <br />
                      Ground Floor, 108, 7th Mile Hosur Rd, Chikka Begur,
                      <br />
                      Industrial Layout, Garvebhavi Palya,
                      <br />
                      Bengaluru, Karnataka 560068
                      <br />
                      India
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-red-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-700">+91 80 1234 5678</p>
                    <p className="text-gray-700">+91 98765 43210 (Sales)</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-red-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-700">info@elina.so</p>
                    <p className="text-gray-700">sales@elina.so</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-red-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Business Hours</h3>
                    <p className="text-gray-700">
                      Monday - Saturday: 9:30 AM - 6:30 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Map */}
            <div className="rounded-lg overflow-hidden h-[300px] shadow-md">
              <iframe
                src="https://maps.google.com/maps?q=Syena+Kitchenconceptz+Manufacturing+pvt+ltd&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
