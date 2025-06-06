"use client"
import { useState, useEffect, useCallback } from "react"
import type React from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Package, ShoppingCart, Search, X, Filter, Grid, List } from "lucide-react"
import { useCart } from "@/context/cart-context"
import CartModal from "@/components/cart-modal"
import CartCheckoutModal from "@/components/cart-checkout-modal"
import BrandFilter from "@/components/brand-filter"
import ModernProductCard from "@/components/modern-product-card"
import { ProductGridSkeleton } from "@/components/loading-skeleton"
import { useSearchParams, useRouter } from "next/navigation"

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

export default function ProductsListPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [totalItems, setTotalItems] = useState(0)
  const [showOnlyWithImages, setShowOnlyWithImages] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  // Update the initial search state
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "")
  const [selectedBrand, setSelectedBrand] = useState("")
  const [isBrandFilterOpen, setIsBrandFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const { getTotalItems } = useCart()
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)

  // Debounce search to avoid too many API calls
  const debounceSearch = useCallback(
    (query: string) => {
      const timer = setTimeout(() => {
        setSearchQuery(query)
        setCurrentPage(1) // Reset to first page when searching

        // Update URL without triggering a page reload
        const newUrl = new URL(window.location.href)
        if (query.trim()) {
          newUrl.searchParams.set("search", query.trim())
        } else {
          newUrl.searchParams.delete("search")
        }
        router.replace(newUrl.pathname + newUrl.search, { scroll: false })
      }, 500)
      return () => clearTimeout(timer)
    },
    [router],
  )

  useEffect(() => {
    const cleanup = debounceSearch(searchInput)
    return cleanup
  }, [searchInput, debounceSearch])

  useEffect(() => {
    const urlSearch = searchParams.get("search")
    if (urlSearch && urlSearch !== searchQuery) {
      setSearchInput(urlSearch)
      setSearchQuery(urlSearch)
    }
  }, [searchParams])

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
      window.scrollTo({ top: 0, behavior: "smooth" })
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
    // Clear URL search parameter
    const newUrl = new URL(window.location.href)
    newUrl.searchParams.delete("search")
    router.replace(newUrl.pathname + newUrl.search, { scroll: false })
  }

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand)
    setCurrentPage(1) // Reset to first page when changing brand
  }

  const handleCheckout = () => {
    setIsCartModalOpen(false)
    setIsCheckoutModalOpen(true)
  }

  const hasActiveFilters = showOnlyWithImages || searchQuery || selectedBrand

  if (loading && currentPage === 1 && !searchQuery && !selectedBrand) {
    return (
      <main className="min-h-screen py-20 page-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-12 w-64 skeleton rounded-xl mx-auto mb-4" />
            <div className="h-6 w-96 skeleton rounded-lg mx-auto" />
          </div>
          <ProductGridSkeleton count={6} />
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen py-20 page-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Error Loading Products</h1>
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <Button
              onClick={() => fetchProducts(currentPage, itemsPerPage, showOnlyWithImages, searchQuery, selectedBrand)}
              className="btn-modern-primary"
            >
              Try Again
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-20 page-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <h1 className="text-responsive-xl font-bold gradient-text mb-4">Products Catalog</h1>
          <p className="text-responsive-md text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Browse our complete catalog of premium kitchen equipment and products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4 slide-in-left">
            <div className="sticky top-24 space-y-6">
              <BrandFilter
                onBrandChange={handleBrandChange}
                selectedBrand={selectedBrand}
                isOpen={isBrandFilterOpen}
                onToggle={() => setIsBrandFilterOpen(!isBrandFilterOpen)}
              />

              {/* Additional Filters */}
              <div className="glass-card p-6">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Additional Filters
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="showWithImages"
                      checked={showOnlyWithImages}
                      onChange={handleFilterChange}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 dark:border-gray-600 rounded"
                    />
                    <label htmlFor="showWithImages" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Show only products with images
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 slide-in-right">
            {/* Search Bar */}
            <div className="glass-card p-6 mb-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products by name, code, or description..."
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  className="modern-input block w-full pl-10 pr-12 py-4 text-lg"
                />
                {searchInput && (
                  <button onClick={clearSearch} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <X className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  </button>
                )}
              </div>
              {searchQuery && (
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  Searching for: "<span className="font-medium text-red-600 dark:text-red-400">{searchQuery}</span>"
                </p>
              )}
            </div>

            {/* Controls */}
            <div className="glass-card p-6 mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Items per page:</label>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                      className="modern-input px-3 py-2"
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className={viewMode === "grid" ? "btn-modern-primary" : ""}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className={viewMode === "list" ? "btn-modern-primary" : ""}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    onClick={() => setIsCartModalOpen(true)}
                    className="btn-modern-primary flex items-center gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Cart ({getTotalItems()})
                  </Button>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Showing {products.length} of {totalItems} products (Page {currentPage} of {totalPages || 1})
              </div>
            </div>

            {/* Active Filters Summary */}
            {hasActiveFilters && (
              <div className="glass-card p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
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
                    className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            )}

            {/* Loading overlay for page changes */}
            {loading && (currentPage > 1 || searchQuery || selectedBrand) && (
              <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div className="glass-card p-6 flex items-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
                  <span className="font-medium">Loading...</span>
                </div>
              </div>
            )}

            {/* Products Grid/List */}
            {products.length === 0 ? (
              <div className="text-center py-20">
                <Package className="h-24 w-24 text-gray-400 dark:text-gray-500 mx-auto mb-6" />
                <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-4">
                  {hasActiveFilters ? "No products found" : "No products available"}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
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
                    className="btn-modern-outline"
                  >
                    Clear All Filters
                  </Button>
                )}
              </div>
            ) : (
              <div
                className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"} mb-12`}
              >
                {products.map((product, index) => (
                  <div key={product.item_code} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <ModernProductCard product={product} />
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {products.length > 0 && totalPages > 1 && (
              <div className="glass-card p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="btn-modern-outline flex items-center gap-1"
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
                            className={pageNum === currentPage ? "btn-modern-primary" : "btn-modern-outline"}
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
                      className="btn-modern-outline flex items-center gap-1"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Page {currentPage} of {totalPages || 1}
                  </div>
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
