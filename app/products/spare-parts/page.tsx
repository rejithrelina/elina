import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SparePartsPage() {
  const partCategories = [
    {
      id: 1,
      name: "Heating Elements",
      description: "Replacement heating elements for ovens, ranges, and warming equipment",
      image: "https://placehold.co/600x400.png",
      compatibility: ["Commercial Ovens", "Range Cookers", "Warming Cabinets"],
    },
    {
      id: 2,
      name: "Control Components",
      description: "Thermostats, timers, and control panels for precise operation",
      image: "https://placehold.co/600x400.png",
      compatibility: ["All Equipment Types", "Digital Controls", "Analog Systems"],
    },
    {
      id: 3,
      name: "Filters & Gaskets",
      description: "Sealing components and filtration systems for optimal performance",
      image: "https://placehold.co/600x400.png",
      compatibility: ["Ventilation Systems", "Refrigeration", "Dishwashers"],
    },
    {
      id: 4,
      name: "Motors & Pumps",
      description: "Replacement motors and pumps for various kitchen equipment",
      image: "https://placehold.co/600x400.png",
      compatibility: ["Mixers", "Dishwashers", "Ventilation Fans"],
    },
    {
      id: 5,
      name: "Burner Components",
      description: "Gas burner parts, igniters, and flame control components",
      image: "https://placehold.co/600x400.png",
      compatibility: ["Gas Ranges", "Wok Burners", "Griddles"],
    },
    {
      id: 6,
      name: "Refrigeration Parts",
      description: "Compressors, condensers, and cooling system components",
      image: "https://placehold.co/600x400.png",
      compatibility: ["Walk-in Coolers", "Reach-in Refrigerators", "Freezers"],
    },
  ]

  const services = [
    {
      title: "Part Identification",
      description: "Help identifying the correct replacement part for your equipment",
      icon: "🔍",
    },
    {
      title: "Installation Support",
      description: "Technical guidance for proper installation and setup",
      icon: "🔧",
    },
    {
      title: "Warranty Coverage",
      description: "Comprehensive warranty on all genuine replacement parts",
      icon: "🛡️",
    },
    {
      title: "Express Shipping",
      description: "Fast delivery to minimize equipment downtime",
      icon: "🚚",
    },
  ]

  return (
    <main className="min-h-screen py-20 page-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16 fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">Genuine Spare Parts</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Keep your kitchen equipment running at peak performance with our comprehensive range of genuine replacement
            parts and components
          </p>
        </div>

        {/* Parts Categories
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {partCategories.map((category, index) => (
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
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Compatible with:</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.compatibility.map((item, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-xs px-2 py-1 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <Button className="w-full btn-modern-primary">
                  <Link href="/products-list">Find Parts</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>  */}

        {/* Services Section */}
        <div className="glass-card p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How to Order Section */}
        <div className="section-background rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">How to Order Parts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Identify Your Part</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Use your equipment model number or part number to find the correct replacement
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Place Your Order</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Contact us with your part requirements and we'll provide a quote
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Fast Delivery</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Receive your genuine parts with express shipping and installation support
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Service */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 mb-16">
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Emergency Parts Service</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              📅 Regular Hours: Monday – Saturday, 9:30 AM – 6:30 PM
            </p>
            <Button size="lg" className="btn-modern-primary">
              <Link href="/contact">Emergency Support</Link>
            </Button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="glass-card p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Need Help Finding Parts?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Our technical experts can help you identify and source the right replacement parts for your equipment.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="btn-modern-primary">
                <Link href="/contact">Contact Parts Department</Link>
              </Button>
              <Button size="lg" className="btn-modern-outline">
                <Link href="/products-list">Browse Parts Catalog</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
