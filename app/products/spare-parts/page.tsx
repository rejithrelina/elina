import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SparePartsPage() {
  return (
    <main className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://placehold.co/1920x1080.png"
            alt="Kitchen Equipment Spare Parts"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Genuine Spare Parts</h1>
            <p className="text-lg md:text-xl">
              Maintain and extend the life of your kitchen equipment with our genuine spare parts
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Why Choose Genuine Spare Parts</h2>
              <p className="text-lg text-gray-700 mb-6">
                At Syena Kitchenconceptz, we understand the importance of maintaining your kitchen equipment in optimal
                condition. Our genuine spare parts are designed to perfectly match your equipment, ensuring seamless
                compatibility and performance.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Using genuine spare parts not only extends the life of your equipment but also maintains warranty
                coverage and ensures safety standards are met. Our comprehensive range covers all our product lines,
                making it easy to find exactly what you need.
              </p>
            </div>
            <div className="lg:w-1/2 relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://placehold.co/800x600.png"
                alt="Genuine Spare Parts Collection"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Browse Parts by Equipment Category</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Find the right spare parts for your specific equipment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {equipmentCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative h-64 w-full">
                  <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <Link href="/products-list">View Parts</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Order */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How to Order Spare Parts</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to get the parts you need quickly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {orderSteps.map((step) => (
              <div key={step.id} className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-red-600">{step.id}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              <Link href="/contact">Contact Our Parts Department</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Common questions about our spare parts and ordering process
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help Finding the Right Part?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Our technical support team is ready to assist you in identifying and ordering the correct spare parts for
            your equipment.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
              <Link href="/contact">Contact Technical Support</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-black border-white hover:bg-white/10">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

// Equipment Categories Data
const equipmentCategories = [
  {
    id: 1,
    name: "Cooking Equipment",
    slug: "cooking-equipment",
    description: "Spare parts for ranges, ovens, grills, and fryers.",
    image: "https://placehold.co/600x400.png",
  },
  {
    id: 2,
    name: "Refrigeration Units",
    slug: "refrigeration-units",
    description: "Components for commercial refrigerators and freezers.",
    image: "https://placehold.co/600x400.png",
  },
  {
    id: 3,
    name: "Ventilation Systems",
    slug: "ventilation-systems",
    description: "Replacement parts for kitchen ventilation and exhaust systems.",
    image: "https://placehold.co/600x400.png",
  },
  {
    id: 4,
    name: "Food Preparation Equipment",
    slug: "food-preparation-equipment",
    description: "Parts for mixers, slicers, processors, and other prep equipment.",
    image: "https://placehold.co/600x400.png",
  },
  {
    id: 5,
    name: "Dishwashing Systems",
    slug: "dishwashing-systems",
    description: "Components for commercial dishwashers and glasswashers.",
    image: "https://placehold.co/600x400.png",
  },
  {
    id: 6,
    name: "Storage Solutions",
    slug: "storage-solutions",
    description: "Replacement parts for shelving, cabinets, and storage systems.",
    image: "https://placehold.co/600x400.png",
  },
]

// Order Steps Data
const orderSteps = [
  {
    id: 1,
    title: "Identify Your Part",
    description:
      "Locate the model number and serial number of your equipment, and identify the specific part you need.",
  },
  {
    id: 2,
    title: "Contact Us",
    description:
      "Reach out to our parts department via phone, email, or the contact form with your equipment and part details.",
  },
  {
    id: 3,
    title: "Confirm & Pay",
    description: "We'll confirm availability and provide a quote. Once payment is processed, your order is confirmed.",
  },
  {
    id: 4,
    title: "Receive Your Part",
    description:
      "Your part will be shipped promptly. We also offer installation services if you need professional assistance.",
  },
]

// FAQs Data
const faqs = [
  {
    id: 1,
    question: "How do I find the right part for my equipment?",
    answer:
      "You can identify the correct part by checking your equipment's model number and serial number, usually found on a label or plate on the equipment. Contact our parts department with these details, and we'll help you find the exact part you need.",
  },
  {
    id: 2,
    question: "Do you stock parts for all your equipment models?",
    answer:
      "We maintain an extensive inventory of spare parts for current models and many older models. If we don't have a specific part in stock, we can usually order it directly from the manufacturer.",
  },
  {
    id: 3,
    question: "What is your warranty policy on spare parts?",
    answer:
      "All our genuine spare parts come with a standard 90-day warranty against manufacturing defects. Extended warranties are available for certain components.",
  },
  {
    id: 4,
    question: "Do you offer installation services for spare parts?",
    answer:
      "Yes, our trained technicians can install spare parts for you, ensuring proper fitting and function. Installation services can be arranged when ordering your parts.",
  },
  {
    id: 5,
    question: "What payment methods do you accept for spare parts orders?",
    answer:
      "We accept all major credit cards, bank transfers, and purchase orders from approved business accounts. Payment must be confirmed before parts are shipped.",
  },
]
