"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Package, Plus, ArrowLeft, X } from "lucide-react"
import { useCart } from "@/context/cart-context"
import SocialShare from "@/components/social-share"

interface ItemAttribute {
  idx: number
  attribute: string
  numeric_values: number
  disabled: number
  from_range: number
  increment: number
  to_range: number
}

interface ProductDetail {
  item_code: string
  item_name: string
  item_group: string
  description: string
  stock_uom: string
  has_variants: number
  image: string | null
  brand: string
  attributes: ItemAttribute[]
}

interface Variant {
  item_code: string
  item_name: string
  item_group: string
  description: string
  stock_uom: string
  standard_rate: number
  image: string | null
  brand: string
}

interface FilterState {
  [key: string]: number
}

export default function ProductDetailPage() {
  const params = useParams()
  const itemCode = params.item_code as string
  const { addToCart } = useCart()

  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [variants, setVariants] = useState<Variant[]>([])
  const [filteredVariants, setFilteredVariants] = useState<Variant[]>([])
  const [loading, setLoading] = useState(true)
  const [variantsLoading, setVariantsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<FilterState>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [variantsPerPage] = useState(20)
  const [totalVariants, setTotalVariants] = useState(0)

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/products/${itemCode}`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        setProduct(data.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch product details")
      } finally {
        setLoading(false)
      }
    }

    if (itemCode) {
      fetchProductDetails()
    }
  }, [itemCode])

  // Fetch variants
  useEffect(() => {
    const fetchVariants = async () => {
      if (!product) return

      try {
        setVariantsLoading(true)

        const response = await fetch(`/api/products/${itemCode}/variants`)

        if (response.ok) {
          const data = await response.json()

          if (data.error) {
            throw new Error(data.error)
          }

          setTotalVariants(data.totalVariants || 0)
          setVariants(data.data || [])
          setFilteredVariants(data.data || [])
        }
      } catch (err) {
        console.error("Error fetching variants:", err)
      } finally {
        setVariantsLoading(false)
      }
    }

    fetchVariants()
  }, [product, itemCode])

  // Apply client-side filtering
  useEffect(() => {
    if (!variants.length) return

    let filtered = [...variants]

    // Apply attribute filters
    Object.entries(filters).forEach(([attribute, value]) => {
      if (value !== undefined && value !== null) {
        // This is a simplified filter - in a real implementation,
        // you'd need to fetch variant attributes and filter based on them
        // For now, we'll filter by item name containing the filter value
        filtered = filtered.filter((variant) =>
          variant.item_name.toLowerCase().includes(value.toString().toLowerCase()),
        )
      }
    })

    setFilteredVariants(filtered)
    setCurrentPage(1)
  }, [filters, variants])

  const handleFilterChange = (attribute: string, value: number) => {
    setFilters((prev) => ({
      ...prev,
      [attribute]: value,
    }))
  }

  const clearFilter = (attribute: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev }
      delete newFilters[attribute]
      return newFilters
    })
  }

  const clearAllFilters = () => {
    setFilters({})
  }

  const handleAddToCart = (variant: Variant) => {
    addToCart({
      item_code: variant.item_code,
      item_name: variant.item_name,
      item_group: variant.item_group,
      description: variant.description,
      stock_uom: variant.stock_uom,
      standard_rate: variant.standard_rate,
      image: variant.image,
    })
  }

  // Pagination for variants
  const totalPages = Math.ceil(filteredVariants.length / variantsPerPage)
  const startIndex = (currentPage - 1) * variantsPerPage
  const endIndex = startIndex + variantsPerPage
  const currentVariants = filteredVariants.slice(startIndex, endIndex)

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

  if (error || !product) {
    return (
      <main className="min-h-screen py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-red-600 mb-4">{error || "Product not found"}</p>
            <Link href="/products-list">
              <Button className="bg-red-600 hover:bg-red-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/products-list" className="text-red-600 hover:text-red-700 flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </div>

        {/* Product Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="flex flex-col lg:flex-row">
            {/* Product Image */}
            <div className="lg:w-1/2">
              <div className="relative h-96 w-full bg-gray-100">
                {product.image ? (
                  <Image
                    src={"https://elina.frappe.cloud" + product.image}
                    alt={product.item_name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Package className="h-24 w-24 text-gray-400" />
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.item_name}</h1>
              <div className="space-y-3 mb-6">
                <p className="text-gray-600">
                  <span className="font-medium">Code:</span> {product.item_code}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Brand:</span> {product.brand}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Group:</span> {product.item_group}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">UOM:</span> {product.stock_uom}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Total Variants:</span> {totalVariants}
                </p>
              </div>

              {/* Social Share */}
              <SocialShare
                url={`/product/${product.item_code}`}
                title={product.item_name}
                description={product.description?.replace(/<[^>]*>/g, "").substring(0, 160)}
              />

              {product.description && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                  <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: product.description }} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content with Sidebar Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters */}
          {product.attributes && product.attributes.length > 0 && (
            <div className="lg:w-1/4">
              <div className="sticky top-24">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Filter Variants</h2>
                    {Object.keys(filters).length > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearAllFilters}
                        className="text-red-600 border-red-600"
                      >
                        Clear All
                      </Button>
                    )}
                  </div>

                  {/* Active Filters */}
                  {Object.keys(filters).length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Active Filters:</h3>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(filters).map(([attribute, value]) => (
                          <div
                            key={attribute}
                            className="flex items-center gap-1 bg-red-50 text-red-700 px-2 py-1 rounded text-sm"
                          >
                            <span>
                              {attribute}: {value}
                            </span>
                            <button onClick={() => clearFilter(attribute)} className="hover:text-red-900">
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-6">
                    {product.attributes.map((attr) => (
                      <div key={attr.attribute} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">{attr.attribute}</label>
                        {attr.numeric_values ? (
                          <div className="space-y-2">
                            <input
                              type="number"
                              min={attr.from_range}
                              max={attr.to_range}
                              step={attr.increment || 1}
                              value={filters[attr.attribute] || ""}
                              onChange={(e) =>
                                handleFilterChange(attr.attribute, e.target.value ? Number(e.target.value) : 0)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-red-500 focus:border-red-500"
                              placeholder={`${attr.from_range} - ${attr.to_range}`}
                            />
                            <div className="text-xs text-gray-500">
                              Range: {attr.from_range} - {attr.to_range}
                              {attr.increment > 0 && ` (step: ${attr.increment})`}
                            </div>
                          </div>
                        ) : (
                          <select
                            value={filters[attr.attribute] || ""}
                            onChange={(e) => handleFilterChange(attr.attribute, Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-red-500 focus:border-red-500"
                          >
                            <option value="">All {attr.attribute}</option>
                            {/* In a real implementation, you'd fetch attribute values */}
                          </select>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right Content - Variants */}
          <div className={product.attributes && product.attributes.length > 0 ? "lg:w-3/4" : "w-full"}>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Available Variants ({filteredVariants.length})</h2>
                <div className="text-sm text-gray-600">
                  Showing {currentVariants.length} of {filteredVariants.length} variants
                </div>
              </div>

              {variantsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                </div>
              ) : currentVariants.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No variants found</h3>
                  <p className="text-gray-600">
                    {Object.keys(filters).length > 0
                      ? "No variants match your current filters. Try adjusting the filters."
                      : "No variants available for this product."}
                  </p>
                </div>
              ) : (
                <>
                  {/* Variants Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {currentVariants.map((variant) => (
                      <div
                        key={variant.item_code}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="relative h-32 w-full bg-gray-100 rounded mb-4">
                          {variant.image ? (
                            <Image
                              src={"https://elina.frappe.cloud" + variant.image}
                              alt={variant.item_name}
                              fill
                              className="object-cover rounded"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <Package className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{variant.item_name}</h3>
                        <p className="text-sm text-gray-600 mb-2">Code: {variant.item_code}</p>
                        <div className="flex justify-between items-center mb-3">
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">UOM:</span> {variant.stock_uom}
                          </div>
                          {variant.standard_rate > 0 && (
                            <div className="text-lg font-bold text-red-600">
                              ₹{variant.standard_rate.toLocaleString()}
                            </div>
                          )}
                        </div>
                        <Button
                          className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2"
                          onClick={() => handleAddToCart(variant)}
                        >
                          <Plus className="h-4 w-4" />
                          Add to Cart
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center gap-1"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                              onClick={() => setCurrentPage(pageNum)}
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
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                        className="flex items-center gap-1"
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
