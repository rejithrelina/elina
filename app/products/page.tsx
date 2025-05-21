import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/data"

export default function ProductsPage() {
  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900">Our Products</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive range of high-quality kitchen equipment
          </p>
        </div>

        {/* Product Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <CategoryCard
            title="Commercial Equipment"
            description="Professional-grade kitchen equipment for restaurants, hotels, and catering facilities"
            image="https://placehold.co/600x400.png"
            link="/products/commercial"
          />
          <CategoryCard
            title="Residential Solutions"
            description="Premium kitchen solutions for modern homes and apartments"
            image="https://placehold.co/600x400.png"
            link="/products/residential"
          />
          <CategoryCard
            title="Custom Projects"
            description="Tailored kitchen solutions designed specifically for your unique requirements"
            image="https://placehold.co/600x400.png"
            link="/products/custom"
          />
          <CategoryCard
            title="Accessories"
            description="Essential kitchen accessories to complement your equipment"
            image="https://placehold.co/600x400.png"
            link="/products/accessories"
          />
          <CategoryCard
            title="Spare Parts"
            description="Genuine spare parts for all our kitchen equipment"
            image="https://placehold.co/600x400.png"
            link="/products/spare-parts"
          />
        </div>

        {/* Featured Products */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 6).map((product) => (
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
                  <Button variant="outline" className="w-full text-red-600 border-red-600 hover:bg-red-50">
                    <Link href={`/products/${product.slug}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-red-600 text-white p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help Choosing the Right Equipment?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Our team of experts is ready to assist you in finding the perfect kitchen solutions for your needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              <Link href="/products/custom">Custom Solutions</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

function CategoryCard({ title, description, image, link }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48 w-full">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
          <Link href={link}>Explore {title}</Link>
        </Button>
      </div>
    </div>
  )
}
