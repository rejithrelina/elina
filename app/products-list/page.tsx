"use client"
import { useState, useEffect, useCallback } from "react"
import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Package, ShoppingCart, Plus, Search, X } from "lucide-react"
import { useCart } from "@/context/cart-context"
import CartModal from "@/components/cart-modal"
import CartCheckoutModal from "@/components/cart-checkout-modal"
import BrandFilter from "@/components/brand-filter"

interface Product {
  item_code: string
  item_name: string
  item_group: string
  description: string
  stock_uom: string
  has_variants: number
  image: string | null
  variant_based_on: string
  brand: string
}

interface ApiResponse {
  data: Product[]
}

interface CountResponse {
  message: number
}

export default function ProductsListPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [totalItems, setTotalItems] = useState(0)
  const [showOnlyWithImages, setShowOnlyWithImages] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("")
  const [isBrandFilterOpen, setIsBrandFilterOpen] = useState(false)
  const { addToCart, getTotalItems } = useCart()
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)

  // Debounce search to avoid too many API calls
  const debounceSearch = useCallback((query: string) => {
    const timer = setTimeout(() => {
      setSearchQuery(query)
      setCurrentPage(1) // Reset to first page when searching
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const cleanup = debounceSearch(searchInput)
    return cleanup
  }, [searchInput, debounceSearch])

  // Fetch total count of items

  // Build filters array for API

  const fetchProducts = async (page: number, limit: number, withImagesOnly = false, search = "", brand = "") => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        withImages: withImagesOnly.toString(),
        search,
        brand,
      })

      const response = await fetch(`/api/products?${params}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setProducts(data.data || [])
      setTotalItems(data.totalItems || 0)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products")
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts(currentPage, itemsPerPage, showOnlyWithImages, searchQuery, selectedBrand)
  }, [currentPage, itemsPerPage, showOnlyWithImages, searchQuery, selectedBrand])

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

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowOnlyWithImages(e.target.checked)
    setCurrentPage(1) // Reset to first page when changing filter
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const clearSearch = () => {
    setSearchInput("")
    setSearchQuery("")
  }

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand)
    setCurrentPage(1) // Reset to first page when changing brand
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      item_code: product.item_code,
      item_name: product.item_name,
      item_group: product.item_group,
      description: product.description,
      stock_uom: product.stock_uom,
      standard_rate: 0, // Main variant items don't have rates
      image: product.image,
    })
  }

  const handleCheckout = () => {
    setIsCartModalOpen(false)
    setIsCheckoutModalOpen(true)
  }

  const hasActiveFilters = showOnlyWithImages || searchQuery || selectedBrand

  if (loading && currentPage === 1 && !searchQuery && !selectedBrand) {
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
            <Button
              onClick={() => fetchProducts(currentPage, itemsPerPage, showOnlyWithImages, searchQuery, selectedBrand)}
              className="bg-red-600 hover:bg-red-700"
            >
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

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              <BrandFilter
                onBrandChange={handleBrandChange}
                selectedBrand={selectedBrand}
                isOpen={isBrandFilterOpen}
                onToggle={() => setIsBrandFilterOpen(!isBrandFilterOpen)}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products by name, code, or description..."
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-lg"
                />
                {searchInput && (
                  <button onClick={clearSearch} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
              {searchQuery && (
                <p className="mt-2 text-sm text-gray-600">
                  Searching for: "<span className="font-medium">{searchQuery}</span>"
                </p>
              )}
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">
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

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="showWithImages"
                    checked={showOnlyWithImages}
                    onChange={handleFilterChange}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor="showWithImages" className="text-sm font-medium text-gray-700">
                    Show only products with images
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  onClick={() => setIsCartModalOpen(true)}
                  className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Cart ({getTotalItems()})
                </Button>
                <div className="text-sm text-gray-600">
                  Showing {products.length} of {totalItems} products (Page {currentPage} of {totalPages || 1})
                </div>
              </div>
            </div>

            {/* Active Filters Summary */}
            {hasActiveFilters && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Active filters: {(showOnlyWithImages ? 1 : 0) + (searchQuery ? 1 : 0) + (selectedBrand ? 1 : 0)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowOnlyWithImages(false)
                      clearSearch()
                      setSelectedBrand("")
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            )}

            {/* Loading overlay for page changes */}
            {loading && (currentPage > 1 || searchQuery || selectedBrand) && (
              <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div className="bg-white p-4 rounded-lg shadow-lg flex items-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
                  <span>Loading...</span>
                </div>
              </div>
            )}

            {/* Products Grid */}
            {products.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {hasActiveFilters ? "No products found" : "No products available"}
                </h3>
                <p className="text-gray-600">
                  {hasActiveFilters
                    ? "No products match your current filters. Try adjusting your search or filters."
                    : "Try adjusting your filters or check back later."}
                </p>
                {hasActiveFilters && (
                  <Button
                    onClick={() => {
                      setShowOnlyWithImages(false)
                      clearSearch()
                      setSelectedBrand("")
                    }}
                    variant="outline"
                    className="mt-4"
                  >
                    Clear All Filters
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {products.map((product) => (
                  <div
                    key={product.item_code}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1"
                  >
                    <Link href={`/product/${product.item_code}`}>
                      <div className="relative h-48 w-full bg-gray-100 cursor-pointer">
                        {product.image ? (
                          <Image
                            src={"https://elina.frappe.cloud" + product.image || "/placeholder.svg"}
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
                    </Link>
                    <div className="p-4">
                      <Link href={`/product/${product.item_code}`}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-red-600 cursor-pointer">
                          {product.item_name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600 mb-2">Code: {product.item_code}</p>
                      <p className="text-sm text-gray-600 mb-2">Brand: {product.brand}</p>
                      <p className="text-sm text-gray-600 mb-2">Group: {product.item_group}</p>
                      {product.description && (
                        <p className="text-sm text-gray-700 mb-3 line-clamp-3">{product.description}</p>
                      )}
                      <div className="flex justify-between items-center mb-3">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">UOM:</span> {product.stock_uom}
                        </div>
                        <div className="text-sm text-blue-600 font-medium">Has Variants</div>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/product/${product.item_code}`} className="flex-1">
                          <Button variant="outline" className="w-full text-red-600 border-red-600 hover:bg-red-50">
                            View Details
                          </Button>
                        </Link>
                        <Button
                          className="bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2"
                          onClick={() => handleAddToCart(product)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
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
                      // Calculate page numbers to show around current page
                      let startPage = Math.max(1, currentPage - 2)
                      if (currentPage > totalPages - 2) {
                        startPage = Math.max(1, totalPages - 4)
                      }
                      const pageNum = startPage + i
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
                    disabled={currentPage >= totalPages}
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
        </div>
      </div>

      {/* Cart Modal */}
      <CartModal isOpen={isCartModalOpen} onClose={() => setIsCartModalOpen(false)} onCheckout={handleCheckout} />

      {/* Checkout Modal */}
      <CartCheckoutModal isOpen={isCheckoutModalOpen} onClose={() => setIsCheckoutModalOpen(false)} />
    </main>
  )
}
