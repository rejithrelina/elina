"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Package } from "lucide-react"

const API_URL = "https://elina.frappe.cloud/api"
const AUTH_HEADER = {
  Authorization: `token  9403214475f834f:df3e2e8bfee05db`,
  "Content-Type": "application/json",
}

interface Product {
  item_code: string
  item_name: string
  item_group: string
  description: string
  stock_uom: string
  standard_rate: number
  image: string | null
}

interface ApiResponse {
  data: Product[]
}

export default function ProductsListPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [totalItems, setTotalItems] = useState(0)

  const fetchProducts = async (page: number, limit: number) => {
    setLoading(true)
    setError(null)

    try {
      const limitStart = (page - 1) * limit + 1
      const url = `${API_URL}/resource/Item?fields=["item_code","item_name","item_group","description","stock_uom","standard_rate","image"]&limit_start=${limitStart}&limit_page_length=${limit}`

      const response = await fetch(url, {
        method: "GET",
        headers: AUTH_HEADER,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: ApiResponse = await response.json()
      setProducts(data.data || [])

      // Note: You might need to make a separate API call to get total count
      // For now, we'll estimate based on the returned data
      if (data.data && data.data.length < limit && page === 1) {
        setTotalItems(data.data.length)
      } else {
        setTotalItems(page * limit) // This is an estimate
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products")
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts(currentPage, itemsPerPage)
  }, [currentPage, itemsPerPage])

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const handleItemsPerPageChange = (newLimit: number) => {
    setItemsPerPage(newLimit)
    setCurrentPage(1) // Reset to first page when changing items per page
  }

  if (loading) {
    return (
      <main className="min-h-screen py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Error Loading Products</h1>
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => fetchProducts(currentPage, itemsPerPage)} className="bg-red-600 hover:bg-red-700">
              Try Again
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Products Catalog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse our complete catalog of kitchen equipment and products
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Items per page:</label>
            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="px-3 py-1 border border-gray-300 rounded focus:ring-red-500 focus:border-red-500"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div className="text-sm text-gray-600">
            Showing {products.length} products (Page {currentPage})
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {products.map((product) => (
              <div
                key={product.item_code}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative h-48 w-full bg-gray-100">
                  {product.image ? (
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.item_name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=200&width=300"
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Package className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.item_name}</h3>
                  <p className="text-sm text-gray-600 mb-2">Code: {product.item_code}</p>
                  <p className="text-sm text-gray-600 mb-2">Group: {product.item_group}</p>
                  {product.description && (
                    <p className="text-sm text-gray-700 mb-3 line-clamp-3">{product.description}</p>
                  )}
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">UOM:</span> {product.stock_uom}
                    </div>
                    {product.standard_rate > 0 && (
                      <div className="text-lg font-bold text-red-600">₹{product.standard_rate.toLocaleString()}</div>
                    )}
                  </div>
                  <Button className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {products.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {/* Show page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = Math.max(1, currentPage - 2) + i
                  if (pageNum > totalPages) return null

                  return (
                    <Button
                      key={pageNum}
                      variant={pageNum === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                      className={pageNum === currentPage ? "bg-red-600 hover:bg-red-700" : ""}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={products.length < itemsPerPage}
                className="flex items-center gap-1"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages || 1}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
