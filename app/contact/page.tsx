"use client"
import { Button } from "@/components/ui/button"
import { useQuoteModal } from "@/context/quote-modal-context"
import { companyInfo } from "@/lib/data"

export default function ContactPage() {
  const { openQuoteModal } = useQuoteModal()

  return (
    <main className="min-h-screen py-20 page-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Contact Us</h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Have questions or need more information? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="slide-in-left">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Request a Quote or Information</h2>
            <div className="glass-card p-8">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Please fill out the form below to request a quote or more information about our products and services.
                Our team will get back to you as soon as possible.
              </p>
              <Button onClick={openQuoteModal} className="w-full btn-modern-primary">
                Request a Quote
              </Button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="slide-in-right">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Contact Information</h2>

            <div className="glass-card p-8 mb-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600 dark:text-red-400 mr-4 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Address</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {companyInfo.name}
                      <br />
                      {companyInfo.address.line1}
                      <br />
                      {companyInfo.address.line2}
                      <br />
                      {companyInfo.address.city}, {companyInfo.address.state} {companyInfo.address.zip}
                      <br />
                      {companyInfo.address.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600 dark:text-red-400 mr-4 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Phone</h3>
                    <p className="text-gray-700 dark:text-gray-300">{companyInfo.phone.main}</p>
                    <p className="text-gray-700 dark:text-gray-300">{companyInfo.phone.sales} (Sales)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600 dark:text-red-400 mr-4 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Email</h3>
                    <p className="text-gray-700 dark:text-gray-300">{companyInfo.email.info}</p>
                    <p className="text-gray-700 dark:text-gray-300">{companyInfo.email.sales}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600 dark:text-red-400 mr-4 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Business Hours</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {companyInfo.hours.weekdays}
                      <br />
                      {companyInfo.hours.weekend}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-lg overflow-hidden h-[300px] shadow-md">
              <iframe
                src="https://maps.google.com/maps?q=Syena+Kitchenconceptz+Manufacturing+pvt+ltd&amp;output=embed"
                width="100%"
                height="100%"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
