import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Zap, CheckCircle, LifeBuoy } from "lucide-react"

export default function CommercialEquipmentPage() {
  return (
    <main className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://elina.frappe.cloud/files/hero-kitchen.png"
            alt="Commercial Kitchen Equipment"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Commercial Equipment</h1>
            <p className="text-lg md:text-xl">
              Professional-grade kitchen equipment designed for durability, efficiency, and performance
            </p>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our Commercial Equipment Categories</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive range of commercial kitchen equipment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {commercialCategories.map((category) => (
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
                    <Link href={`/products/commercial/${category.slug}`}>View Products</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Featured Commercial Equipment</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our most popular commercial kitchen equipment solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative h-64 w-full">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-red-600 font-semibold">{product.price}</span>
                    <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                      <Link href="/products-list">Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              <Link href="/contact">Request a Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Benefits of Our Commercial Equipment</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Why professional kitchens across India choose Syena Kitchenconceptz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.id} className="p-6 border border-gray-200 rounded-lg bg-gray-50">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Equip Your Commercial Kitchen?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact us today to discuss your commercial kitchen equipment needs and get a customized quote.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
              <Link href="/contact">Contact Us</Link>
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

// Commercial Categories Data
const commercialCategories = [
  {
    id: 1,
    name: "Cooking Equipment",
    slug: "cooking-equipment",
    description: "Professional ranges, ovens, grills, and fryers designed for high-volume commercial kitchens.",
    image: "https://elina.frappe.cloud/files/product-1.png",
  },
  {
    id: 2,
    name: "Food Preparation",
    slug: "food-preparation",
    description: "Efficient food prep solutions including work tables, cutting equipment, and mixers.",
    image: "https://elina.frappe.cloud/files/product-2.png",
  },
  {
    id: 3,
    name: "Ventilation Systems",
    slug: "ventilation-systems",
    description: "Advanced kitchen ventilation systems that ensure a clean and safe working environment.",
    image: "https://elina.frappe.cloud/files/product-3.png",
  },
  {
    id: 4,
    name: "Refrigeration",
    slug: "refrigeration",
    description: "Commercial refrigerators, freezers, and cold storage solutions for food preservation.",
    image: "https://elina.frappe.cloud/files/product-6.png",
  },
  {
    id: 5,
    name: "Dishwashing",
    slug: "dishwashing",
    description: "High-capacity dishwashers and cleaning systems for busy commercial kitchens.",
    image: "https://elina.frappe.cloud/files/product-5.png",
  },
  {
    id: 6,
    name: "Storage Solutions",
    slug: "storage-solutions",
    description: "Shelving, racks, and storage systems designed for commercial kitchen environments.",
    image: "https://elina.frappe.cloud/files/product-4.png",
  },
]

// Featured Products Data
const featuredProducts = [
  {
    id: 1,
    name: "Commercial Range Cooker - Pro Series",
    slug: "commercial-range-cooker-pro",
    description: "High-performance 6-burner range with oven, designed for heavy-duty commercial use.",
    price: "Contact for Price",
    image: "https://elina.frappe.cloud/files/product-1.png",
  },
  {
    id: 2,
    name: "Stainless Steel Work Table - Premium",
    slug: "stainless-steel-work-table-premium",
    description: "Heavy-duty stainless steel work table with adjustable undershelf and backsplash.",
    price: "Contact for Price",
    image: "https://elina.frappe.cloud/files/product-2.png",
  },
  {
    id: 3,
    name: "Commercial Hood Ventilation System",
    slug: "commercial-hood-ventilation",
    description: "Advanced ventilation system with efficient filters and powerful extraction capabilities.",
    price: "Contact for Price",
    image: "https://elina.frappe.cloud/files/product-3.png",
  },
]

// Benefits Data
const benefits = [
  {
    id: 1,
    title: "Durability",
    description: "Built to withstand the demands of busy commercial kitchens with premium materials.",
    icon: Shield,
  },
  {
    id: 2,
    title: "Efficiency",
    description: "Designed to optimize workflow and reduce energy consumption in commercial kitchens.",
    icon: Zap,
  },
  {
    id: 3,
    title: "Compliance",
    description: "All equipment meets or exceeds industry safety and hygiene standards.",
    icon: CheckCircle,
  },
  {
    id: 4,
    title: "Support",
    description: "Comprehensive warranty and after-sales service for all commercial equipment.",
    icon: LifeBuoy,
  },
]
