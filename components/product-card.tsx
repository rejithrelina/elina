import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1">
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
  )
}
