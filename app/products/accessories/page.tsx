import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AccessoriesPage() {
  return (
    <main className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://placehold.co/1920x1080.png"
            alt="Kitchen Accessories"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Kitchen Accessories</h1>
            <p className="text-lg md:text-xl">Essential accessories to complement and enhance your kitchen equipment</p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Complete Your Kitchen Setup</h2>
              <p className="text-lg text-gray-700 mb-6">
                At Syena Kitchenconceptz, we understand that the right accessories can significantly enhance the
                functionality and efficiency of your kitchen. Our range of high-quality accessories is designed to
                complement our kitchen equipment and help you get the most out of your culinary space.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                From specialized utensils to storage solutions, our accessories are crafted with the same attention to
                detail and commitment to quality that defines all our products.
              </p>
            </div>
            <div className="lg:w-1/2 relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://placehold.co/800x600.png"
                alt="Kitchen Accessories Collection"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Accessories Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Accessories Categories</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our comprehensive range of kitchen accessories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {accessoriesCategories.map((category) => (
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
                    <Link href={`/products/accessories/${category.slug}`}>View Products</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Accessories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Featured Accessories</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">Our most popular kitchen accessories</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredAccessories.map((accessory) => (
              <div
                key={accessory.id}
                className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={accessory.image || "/placeholder.svg"}
                    alt={accessory.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{accessory.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{accessory.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-red-600 font-semibold">{accessory.price}</span>
                    <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                      Details
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

      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help Finding the Right Accessories?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Our team of experts is ready to assist you in selecting the perfect accessories for your kitchen setup.
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

// Accessories Categories Data
const accessoriesCategories = [
  {
    id: 1,
    name: "Cooking Utensils",
    slug: "cooking-utensils",
    description: "Professional-grade utensils designed for commercial kitchens and heavy use.",
    image: "https://placehold.co/600x400.png",
  },
  {
    id: 2,
    name: "Storage Solutions",
    slug: "storage-solutions",
    description: "Efficient storage accessories to maximize space and organization in your kitchen.",
    image: "https://placehold.co/600x400.png",
  },
  {
    id: 3,
    name: "Kitchen Tools",
    slug: "kitchen-tools",
    description: "Specialized tools to enhance precision and efficiency in food preparation.",
    image: "https://placehold.co/600x400.png",
  },
  {
    id: 4,
    name: "Safety Equipment",
    slug: "safety-equipment",
    description: "Essential safety accessories for commercial kitchen environments.",
    image: "https://placehold.co/600x400.png",
  },
  {
    id: 5,
    name: "Cleaning Supplies",
    slug: "cleaning-supplies",
    description: "Professional cleaning products designed for kitchen equipment and surfaces.",
    image: "https://placehold.co/600x400.png",
  },
  {
    id: 6,
    name: "Presentation Accessories",
    slug: "presentation-accessories",
    description: "Elegant serving and presentation accessories for restaurants and catering.",
    image: "https://placehold.co/600x400.png",
  },
]

// Featured Accessories Data
const featuredAccessories = [
  {
    id: 1,
    name: "Professional Chef Knife Set",
    description: "Premium 5-piece stainless steel knife set for professional chefs",
    price: "Contact for Price",
    image: "https://placehold.co/400x300.png",
  },
  {
    id: 2,
    name: "Commercial Cutting Boards",
    description: "Heavy-duty cutting boards with anti-slip base",
    price: "Contact for Price",
    image: "https://placehold.co/400x300.png",
  },
  {
    id: 3,
    name: "Stainless Steel Mixing Bowls",
    description: "Set of 5 professional mixing bowls in various sizes",
    price: "Contact for Price",
    image: "https://placehold.co/400x300.png",
  },
  {
    id: 4,
    name: "Kitchen Utensil Organizer",
    description: "Wall-mounted organizer for efficient storage",
    price: "Contact for Price",
    image: "https://placehold.co/400x300.png",
  },
]
