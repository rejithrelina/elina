import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AccessoriesPage() {
  const accessoryCategories = [
    {
      id: 1,
      name: "Kitchen Tools & Utensils",
      description: "Professional-grade tools for food preparation and cooking",
      image: "https://elina.frappe.cloud/files/Kitchen%20Tools.png",
      items: ["Chef Knives", "Cutting Boards", "Mixing Bowls", "Measuring Tools"],
    },
    {
      id: 2,
      name: "Storage Solutions",
      description: "Organized storage systems for ingredients and equipment",
      image: "https://elina.frappe.cloud/files/Storage%20Solutions.png",
      items: ["Food Containers", "Shelving Units", "Spice Racks", "Ingredient Bins"],
    },
    {
      id: 3,
      name: "Cleaning Supplies",
      description: "Professional cleaning equipment and sanitization tools",
      image: "https://elina.frappe.cloud/files/Cleaning%20Supplies.png",
      items: ["Sanitizers", "Cleaning Cloths", "Brushes", "Detergents"],
    },
    {
      id: 4,
      name: "Safety Equipment",
      description: "Essential safety gear for kitchen operations",
      image: "https://elina.frappe.cloud/files/saftey.png",
      items: ["Fire Extinguishers", "First Aid Kits", "Safety Gloves", "Non-slip Mats"],
    },
    {
      id: 5,
      name: "Serving Accessories",
      description: "Professional serving and presentation equipment",
      image: "https://elina.frappe.cloud/files/serving.png",
      items: ["Serving Trays", "Chafing Dishes", "Serving Utensils", "Display Stands"],
    },
    {
      id: 6,
      name: "Maintenance Parts",
      description: "Replacement parts and maintenance supplies",
      image: "https://elina.frappe.cloud/files/Maintenancere.png",
      items: ["Filters", "Gaskets", "Heating Elements", "Control Knobs"],
    },
  ]

  return (
    <main className="min-h-screen py-20 page-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16 fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Kitchen Accessories & Supplies
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Complete your kitchen setup with our comprehensive range of professional accessories, tools, and supplies
          </p>
        </div>

        {/* Accessories Grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {accessoryCategories.map((category, index) => (
            <div
              key={category.id}
              className="modern-card overflow-hidden fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">{category.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{category.description}</p>
                <div className="space-y-2 mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Popular Items:</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 text-xs px-2 py-1 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <Button className="w-full btn-modern-primary">
                  <Link href="/products-list">Browse Items</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>  */}

        {/* Features Section */}
        <div className="glass-card p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Why Choose Our Accessories?
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
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Premium Quality</h3>
              <p className="text-gray-600 dark:text-gray-400">Professional-grade accessories built to last</p>
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Food Safe</h3>
              <p className="text-gray-600 dark:text-gray-400">All items meet food safety and hygiene standards</p>
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
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Competitive Pricing</h3>
              <p className="text-gray-600 dark:text-gray-400">Best value for professional kitchen accessories</p>
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
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Fast Delivery</h3>
              <p className="text-gray-600 dark:text-gray-400">Quick shipping and reliable delivery service</p>
            </div>
          </div>
        </div>

        {/* Popular Items Section */}
        <div className="section-background-alt rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Most Popular Items</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "Chef Knives",
              "Cutting Boards",
              "Mixing Bowls",
              "Food Containers",
              "Cleaning Supplies",
              "Safety Gloves",
              "Serving Trays",
              "Measuring Tools",
              "Spice Racks",
              "Non-slip Mats",
              "Fire Extinguishers",
              "Display Stands",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-red-600 dark:text-red-400 text-xl">🔧</span>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="glass-card p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Complete Your Kitchen Setup</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Browse our full catalog of kitchen accessories and supplies to find everything you need for your
              professional kitchen.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="btn-modern-primary">
                <Link href="/products-list">Browse All Accessories</Link>
              </Button>
              <Button size="lg" className="btn-modern-outline">
                <Link href="/contact">Request Catalog</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
