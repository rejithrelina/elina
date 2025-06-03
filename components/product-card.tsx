import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProductCard({ product }) {
  return (
    <div className="modern-card overflow-hidden">
      <div className="relative h-64 w-full">
        <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{product.name}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
        <Button variant="outline" className="w-full btn-modern-outline">
          <Link href="/products-list">View Details</Link>
        </Button>
      </div>
    </div>
  )
}
