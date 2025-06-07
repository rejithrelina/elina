"use client"
import { useState, useEffect, useCallback } from "react"
import type React from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Package, Search, X, Filter, Grid, List, ChevronDown, ChevronUp } from "lucide-react"
import { useCart } from "@/context/cart-context"
import CartModal from "@/components/cart-modal"
import CartCheckoutModal from "@/components/cart-checkout-modal"
import { ProductGridSkeleton } from "@/components/loading-skeleton"
import { useSearchParams, useRouter } from "next/navigation"
import ModernProductCard from "@/components/modern-product-card"

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
  const [brands, setBrands] = useState<string[]>([])
  const [brandsLoading, setBrandsLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()

  // Update the initial search state
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "")
  const [selectedBrand, setSelectedBrand] = useState("")
  const [expandedFilters, setExpandedFilters] = useState<Set<string>>(new Set(["brand", "options"]))
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const { getTotalItems } = useCart()
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)

  // Fetch brands
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("/api/brands")
        if (response.ok) {
          const data = await response.json()
          setBrands(data.data || [])
        }
      } catch (error) {
        console.error("Error fetching brands:", error)
      } finally {
        setBrandsLoading(false)
      }
    }

    fetchBrands()
  }, [])

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

  const toggleFilter = (filterName: string) => {
    const newExpanded = new Set(expandedFilters)
    if (newExpanded.has(filterName)) {
      newExpanded.delete(filterName)
    } else {
      newExpanded.add(filterName)
    }
    setExpandedFilters(newExpanded)
  }

  const clearAllFilters = () => {
    setShowOnlyWithImages(false)
    clearSearch()
    setSelectedBrand("")
  }

  const removeFilter = (filterType: string) => {
    if (filterType === "brand") {
      setSelectedBrand("")
    } else if (filterType === "images") {
      setShowOnlyWithImages(false)
    } else if (filterType === "search") {
      clearSearch()
    }
  }

  const hasActiveFilters = showOnlyWithImages || searchQuery || selectedBrand
  const activeFilterCount = (showOnlyWithImages ? 1 : 0) + (searchQuery ? 1 : 0) + (selectedBrand ? 1 : 0)

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
          {/* Filters Sidebar - Single Card */}
          <div className="lg:w-1/4 slide-in-left">
            <div className="sticky top-24">
              <div className="glass-card">
                {/* Filter Header with View Controls */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">Filters</h3>
                      {hasActiveFilters && (
                        <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 text-xs px-2 py-1 rounded-full">
                          {activeFilterCount}
                        </span>
                      )}
                    </div>
                    {hasActiveFilters && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                      >
                        Clear All
                      </Button>
                    )}
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">View:</span>
                    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className={`px-3 py-2 ${viewMode === "grid" ? "btn-modern-primary" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className={`px-3 py-2 ${viewMode === "list" ? "btn-modern-primary" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Active Filters */}
                  {hasActiveFilters && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedBrand && (
                        <div className="flex items-center gap-1 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-1 rounded text-sm">
                          <span>Brand: {selectedBrand}</span>
                          <button
                            onClick={() => removeFilter("brand")}
                            className="hover:text-red-900 dark:hover:text-red-300"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                      {showOnlyWithImages && (
                        <div className="flex items-center gap-1 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-1 rounded text-sm">
                          <span>With Images</span>
                          <button
                            onClick={() => removeFilter("images")}
                            className="hover:text-red-900 dark:hover:text-red-300"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                      {searchQuery && (
                        <div className="flex items-center gap-1 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-1 rounded text-sm">
                          <span>Search: {searchQuery}</span>
                          <button
                            onClick={() => removeFilter("search")}
                            className="hover:text-red-900 dark:hover:text-red-300"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Filter Content */}
                <div className="max-h-screen overflow-y-auto">
                  <div className="space-y-0">
                    {/* Brand Filter */}
                    <div className="border-b border-gray-100 dark:border-gray-800 last:border-b-0">
                      <button
                        onClick={() => toggleFilter("brand")}
                        className="flex items-center justify-between w-full text-left py-4 px-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <span className="font-medium text-sm text-gray-900 dark:text-gray-100">Brand</span>
                        {expandedFilters.has("brand") ? (
                          <ChevronUp className="h-4 w-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        )}
                      </button>

                      {expandedFilters.has("brand") && (
                        <div className="px-4 pb-4">
                          {brandsLoading ? (
                            <div className="animate-pulse">
                              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            </div>
                          ) : (
                            <select
                              value={selectedBrand}
                              onChange={(e) => handleBrandChange(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            >
                              <option value="">All Brands</option>
                              {brands.map((brand) => (
                                <option key={brand} value={brand}>
                                  {brand}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Additional Options */}
                    <div className="border-b border-gray-100 dark:border-gray-800 last:border-b-0">
                      <button
                        onClick={() => toggleFilter("options")}
                        className="flex items-center justify-between w-full text-left py-4 px-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <span className="font-medium text-sm text-gray-900 dark:text-gray-100">Display Options</span>
                        {expandedFilters.has("options") ? (
                          <ChevronUp className="h-4 w-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        )}
                      </button>

                      {expandedFilters.has("options") && (
                        <div className="px-4 pb-4">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={showOnlyWithImages}
                              onChange={handleFilterChange}
                              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 dark:border-gray-600 rounded"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              Show only products with images
                            </span>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 slide-in-right">
            {/* Controls Bar */}
            <div className="glass-card p-6 mb-8">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                {/* Left Side - Results Info */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium text-gray-900 dark:text-gray-100">{products.length}</span> of{" "}
                    <span className="font-medium text-gray-900 dark:text-gray-100">{totalItems}</span> products
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Show:</label>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                      className="modern-input px-3 py-2 text-sm min-w-[80px]"
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </div>
                </div>

                {/* Right Side - Search */}
                <div className="flex items-center gap-4 w-full lg:w-auto">
                  <div className="relative flex-1 lg:w-80">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchInput}
                      onChange={handleSearchInputChange}
                      className="modern-input block w-full pl-10 pr-10 py-2 text-sm"
                    />
                    {searchInput && (
                      <button onClick={clearSearch} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <X className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Search Query Display */}
              {searchQuery && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Searching for: "<span className="font-medium text-red-600 dark:text-red-400">{searchQuery}</span>"
                  </p>
                </div>
              )}

              {/* Page Info */}
              {totalPages > 1 && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    Page <span className="font-medium text-gray-900 dark:text-gray-100">{currentPage}</span> of{" "}
                    <span className="font-medium text-gray-900 dark:text-gray-100">{totalPages}</span>
                  </div>
                </div>
              )}
            </div>

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
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  {hasActiveFilters
                    ? "No products match your current filters. Try adjusting your search or filters."
                    : "Try adjusting your filters or check back later."}
                </p>
                {hasActiveFilters && (
                  <Button onClick={clearAllFilters} className="btn-modern-outline">
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
