import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CommercialProductsPage() {
  const commercialProducts = [
    {
      id: 1,
      name: "Commercial Range Cookers",
      description: "High-performance gas and electric range cookers for professional kitchens",
      image: "https://elina.frappe.cloud/files/product-1.png",
      features: ["Heavy-duty construction", "Multiple burner configurations", "Easy maintenance"],
    },
    {
      id: 2,
      name: "Stainless Steel Work Tables",
      description: "Durable work surfaces with storage options for commercial food preparation",
      image: "https://elina.frappe.cloud/files/product-2.png",
      features: ["Food-grade stainless steel", "Adjustable shelving", "Easy to clean"],
    },
    {
      id: 3,
      name: "Commercial Dishwashers",
      description: "High-capacity dishwashing systems for restaurants and hotels",
      image: "https://elina.frappe.cloud/files/R.jpg",
      features: ["Fast wash cycles", "Energy efficient", "Multiple rack configurations"],
    },
    {
      id: 4,
      name: "Ventilation Systems",
      description: "Complete kitchen ventilation solutions including hoods and exhaust systems",
      image: "https://elina.frappe.cloud/files/product-3.png",
      features: ["Powerful extraction", "Fire suppression ready", "Custom sizing available"],
    },
    {
      id: 5,
      name: "Refrigeration Units",
      description: "Commercial refrigerators and freezers for food storage and display",
      image: "https://elina.frappe.cloud/files/OIP.jpg",
      features: ["Temperature control", "Energy efficient", "Various sizes available"],
    },
    {
      id: 6,
      name: "Food Preparation Equipment",
      description: "Mixers, slicers, and other food preparation machinery",
      image: "https://elina.frappe.cloud/files/Catering-PrepEqu-FoodSlicers2.jpg",
      features: ["Heavy-duty motors", "Safety features", "Easy operation"],
    },
  ]

  return (
    <main className="min-h-screen py-20 page-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16 fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Commercial Kitchen Equipment
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Professional-grade kitchen equipment designed for restaurants, hotels, catering facilities, and commercial
            food service operations
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {commercialProducts.map((product, index) => (
            <div
              key={product.id}
              className="modern-card overflow-hidden fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-64 w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <svg
                        className="h-4 w-4 text-red-600 dark:text-red-400 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full btn-modern-primary">
                  <Link href="/products-list">View Details</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="glass-card p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Why Choose Our Commercial Equipment?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-red-600 dark:text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Quality Assured</h3>
              <p className="text-gray-600 dark:text-gray-400">All products meet international quality standards</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-red-600 dark:text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">High Performance</h3>
              <p className="text-gray-600 dark:text-gray-400">Built for demanding commercial environments</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-red-600 dark:text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Emergency Support</h3>
              <p className="text-gray-600 dark:text-gray-400">
              Urgent technical support available during business hours.
              </p>

            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-red-600 dark:text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Cost Effective</h3>
              <p className="text-gray-600 dark:text-gray-400">Competitive pricing with excellent value</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="glass-card p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Ready to Upgrade Your Commercial Kitchen?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Contact our experts to discuss your commercial kitchen equipment needs and get a customized solution.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="btn-modern-primary">
                <Link href="/contact">Get Quote</Link>
              </Button>
              <Button size="lg" className="btn-modern-outline">
                <Link href="/products-list">Browse Catalog</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
