"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import FeatureCard from "@/components/feature-card"
import TestimonialCard from "@/components/testimonial-card"
import ProductCard from "@/components/product-card"
import { products, features, testimonials } from "@/lib/data"
import { useQuoteModal } from "@/context/quote-modal-context"

export default function Home() {
  const { openQuoteModal } = useQuoteModal()

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://elina.frappe.cloud/files/hero-kitchen.png"
            alt="Modern kitchen equipment"
            fill
            className="object-cover brightness-[0.85]"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Premium Kitchen Equipment Manufacturing</h1>
            <p className="text-lg md:text-xl mb-8">
              Crafting excellence for commercial and residential kitchens since 2018
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <Link href="/products">Explore Products</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-black border-white hover:bg-white/10"
                onClick={openQuoteModal}
              >
                Request a Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">About Syena Kitchenconceptz</h2>
              <p className="text-lg text-gray-700 mb-6">
                Founded in 2018, Syena Kitchenconceptz Manufacturing Private Limited has established itself as a leading
                manufacturer of premium kitchen equipment in India.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                We combine innovative design with superior craftsmanship to create kitchen solutions that enhance
                efficiency, durability, and aesthetics for both commercial and residential spaces.
              </p>
              <div className="flex items-center">
                <Link
                  href="/about"
                  className="text-red-600 font-medium flex items-center hover:text-red-700 transition-colors"
                >
                  Learn more about our journey
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://elina.frappe.cloud/files/factory.png"
                alt="Syena Kitchenconceptz Manufacturing Facility"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our Premium Products</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our range of high-quality kitchen equipment designed for performance and durability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Syena Kitchenconceptz</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to quality and innovation sets us apart
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">What Our Clients Say</h2>
            <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
              Trusted by restaurants, hotels, and homeowners across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Get In Touch</h2>
              <p className="text-lg text-gray-700 mb-8">
                Have questions about our products or services? Contact us today and our team will be happy to assist
                you.
              </p>

              <ContactInfo />
            </div>

            <div className="lg:w-1/2">
              <div className="bg-gray-50 p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Request a Quote</h3>
                <p className="text-gray-700 mb-6">
                  Interested in our products? Fill out our quote request form and we'll get back to you with pricing and
                  more information.
                </p>
                <Button onClick={openQuoteModal} className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Request a Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="flex items-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-600 mr-4 mt-1"
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
          <h3 className="font-semibold text-gray-900">Phone</h3>
          <p className="text-gray-700">+91 98454 47744</p>
        </div>
      </div>

      <div className="flex items-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-600 mr-4 mt-1"
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
          <h3 className="font-semibold text-gray-900">Email</h3>
          <p className="text-gray-700">info@syenakitchenconceptz.com</p>
        </div>
      </div>

      <div className="flex items-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-600 mr-4 mt-1"
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <div>
          <h3 className="font-semibold text-gray-900">Address</h3>
          <p className="text-gray-700">Bangalore, Karnataka, India</p>
        </div>
      </div>

      <div className="flex items-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-600 mr-4 mt-1"
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
          <h3 className="font-semibold text-gray-900">Business Hours</h3>
          <p className="text-gray-700">
            Monday - Saturday: 9:30 AM - 6:30 PM
           
          </p>
        </div>
      </div>
    </div>
  )
}
