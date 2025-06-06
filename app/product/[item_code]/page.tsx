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
  [key: string]: string | number | null
}

interface AttributeDetail {
  attribute_name: string
  numeric_values: number
  from_range: number
  to_range: number
  increment: number
  item_attribute_values: Array<{
    attribute_value: string
    abbr: string
  }>
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
  const [attributeDetails, setAttributeDetails] = useState<{ [key: string]: AttributeDetail }>({})
  const [attributesLoading, setAttributesLoading] = useState<{ [key: string]: boolean }>({})
  const [attributePositions, setAttributePositions] = useState<{ [key: string]: number }>({})

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

        // Create a map of attribute positions
        if (data.data.attributes) {
          const positions: { [key: string]: number } = {}
          data.data.attributes.forEach((attr: ItemAttribute, index: number) => {
            positions[attr.attribute] = index + 1 // 1-based position
          })
          setAttributePositions(positions)
        }
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

  // Fetch attribute details
  useEffect(() => {
    if (product && product.attributes) {
      product.attributes.forEach((attr) => {
        fetchAttributeDetails(attr.attribute)
      })
    }
  }, [product])

  const fetchAttributeDetails = async (attributeName: string) => {
    if (attributeDetails[attributeName] || attributesLoading[attributeName]) return

    try {
      setAttributesLoading((prev) => ({ ...prev, [attributeName]: true }))

      const response = await fetch(`/api/attributes/${encodeURIComponent(attributeName)}`)

      if (response.ok) {
        const data = await response.json()
        if (data.data) {
          setAttributeDetails((prev) => ({
            ...prev,
            [attributeName]: data.data,
          }))
        }
      }
    } catch (error) {
      console.error(`Error fetching details for ${attributeName}:`, error)
    } finally {
      setAttributesLoading((prev) => ({ ...prev, [attributeName]: false }))
    }
  }

  // Extract attribute value from item code based on position
  const getAttributeValueFromItemCode = (itemCode: string, attributeName: string): string => {
    if (!product || !attributePositions[attributeName]) return ""

    // Split the item code by hyphens
    const parts = itemCode.split("-")

    // The base item code (e.g., P-SY-S-0001) takes the first 4 parts
    // Attribute values start from index 4
    const position = attributePositions[attributeName]
    const valueIndex = 4 + position - 1

    if (parts.length > valueIndex) {
      return parts[valueIndex]
    }

    return ""
  }

  // Apply attribute-based filtering
  useEffect(() => {
    if (!variants.length || !product || Object.keys(filters).length === 0) {
      setFilteredVariants(variants)
      return
    }

    const filtered = variants.filter((variant) => {
      // Check each filter against the variant
      return Object.entries(filters).every(([attribute, filterValue]) => {
        // Allow filtering by 0 - check for null/undefined instead of falsy
        if (filterValue === null || filterValue === undefined || filterValue === "") return true

        // Get the attribute value from the item code
        const attributeValue = getAttributeValueFromItemCode(variant.item_code, attribute)

        // For numeric attributes, compare as numbers
        const attrDetail = attributeDetails[attribute]
        if (attrDetail?.numeric_values) {
          const numericValue = Number.parseFloat(attributeValue)
          const numericFilterValue =
            typeof filterValue === "number" ? filterValue : Number.parseFloat(filterValue.toString())
          return numericValue === numericFilterValue
        }
        // For non-numeric attributes, compare the abbreviation or the value directly
        else {
          // Find the attribute value object that matches the filter value
          const matchingAttrValue = attrDetail?.item_attribute_values?.find((v) => v.attribute_value === filterValue)

          // If we found a matching attribute value with an abbreviation, compare with that
          if (matchingAttrValue) {
            return attributeValue === matchingAttrValue.abbr
          }

          // Otherwise, direct string comparison
          return attributeValue === filterValue.toString()
        }
      })
    })

    setFilteredVariants(filtered)
    setCurrentPage(1)
  }, [filters, variants, product, attributeDetails])

  const handleFilterChange = (attribute: string, value: string | number) => {
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
      <main className="min-h-screen py-20 page-background">
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
      <main className="min-h-screen py-20 page-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Product Not Found</h1>
            <p className="text-red-600 dark:text-red-400 mb-4">{error || "Product not found"}</p>
            <Link href="/products-list">
              <Button className="btn-modern-primary">
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
    <main className="min-h-screen py-20 page-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8 fade-in">
          <Link
            href="/products-list"
            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </div>

        {/* Product Header */}
        <div className="glass-card overflow-hidden mb-8 fade-in">
          <div className="flex flex-col lg:flex-row">
            {/* Product Image */}
            <div className="lg:w-1/2">
              <div className="relative h-96 w-full bg-gray-100 dark:bg-gray-800">
                {product.image ? (
                  <Image
                    src={"https://elina.frappe.cloud" + product.image}
                    alt={product.item_name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Package className="h-24 w-24 text-gray-400 dark:text-gray-500" />
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{product.item_name}</h1>
              <div className="space-y-3 mb-6">
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Code:</span> {product.item_code}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Brand:</span> {product.brand}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Group:</span> {product.item_group}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">UOM:</span> {product.stock_uom}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
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
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Description</h3>
                  <div
                    className="text-gray-700 dark:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content with Sidebar Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters */}
          {product.attributes && product.attributes.length > 0 && (
            <div className="lg:w-1/4 slide-in-left">
              <div className="sticky top-24">
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Filter Variants</h2>
                    {Object.keys(filters).length > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearAllFilters}
                        className="text-red-600 border-red-600 dark:text-red-400 dark:border-red-400"
                      >
                        Clear All
                      </Button>
                    )}
                  </div>

                  {/* Active Filters */}
                  {Object.keys(filters).length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Active Filters:</h3>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(filters).map(([attribute, value]) => (
                          <div
                            key={attribute}
                            className="flex items-center gap-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-2 py-1 rounded text-sm"
                          >
                            <span>
                              {attribute}: {value}
                            </span>
                            <button
                              onClick={() => clearFilter(attribute)}
                              className="hover:text-red-900 dark:hover:text-red-100"
                            >
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
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          {attr.attribute}
                        </label>
                        {attributesLoading[attr.attribute] ? (
                          <div className="animate-pulse">
                            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                          </div>
                        ) : attributeDetails[attr.attribute] ? (
                          attributeDetails[attr.attribute].numeric_values ||
                          attributeDetails[attr.attribute].from_range > 0 ||
                          attributeDetails[attr.attribute].to_range > 0 ? (
                            <div className="space-y-2">
                              <input
                                type="number"
                                min={attributeDetails[attr.attribute].from_range}
                                max={attributeDetails[attr.attribute].to_range}
                                step={attributeDetails[attr.attribute].increment || 1}
                                value={filters[attr.attribute] ?? ""}
                                onChange={(e) => {
                                  const value = e.target.value
                                  if (value === "") {
                                    clearFilter(attr.attribute)
                                  } else {
                                    handleFilterChange(attr.attribute, Number(value))
                                  }
                                }}
                                className="modern-input w-full"
                                placeholder={`${attributeDetails[attr.attribute].from_range} - ${attributeDetails[attr.attribute].to_range}`}
                              />
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                Range: {attributeDetails[attr.attribute].from_range} -{" "}
                                {attributeDetails[attr.attribute].to_range}
                                {attributeDetails[attr.attribute].increment > 0 &&
                                  ` (step: ${attributeDetails[attr.attribute].increment})`}
                              </div>
                            </div>
                          ) : (
                            <select
                              value={filters[attr.attribute] ?? ""}
                              onChange={(e) => {
                                if (e.target.value) {
                                  handleFilterChange(attr.attribute, e.target.value)
                                } else {
                                  clearFilter(attr.attribute)
                                }
                              }}
                              className="modern-input w-full"
                            >
                              <option value="">All {attr.attribute}</option>
                              {attributeDetails[attr.attribute].item_attribute_values?.map((value) => (
                                <option key={value.attribute_value} value={value.attribute_value}>
                                  {value.attribute_value}
                                </option>
                              ))}
                            </select>
                          )
                        ) : (
                          <div className="animate-pulse">
                            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                          </div>
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
            <div className="glass-card p-6 slide-in-right">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Available Variants ({filteredVariants.length})
                </h2>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {currentVariants.length} of {filteredVariants.length} variants
                </div>
              </div>

              {variantsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                </div>
              ) : currentVariants.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No variants found</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {Object.keys(filters).length > 0
                      ? "No variants match your current filters. Try adjusting the filters."
                      : "No variants available for this product."}
                  </p>
                </div>
              ) : (
                <>
                  {/* Variants Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {currentVariants.map((variant, index) => (
                      <div
                        key={variant.item_code}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md dark:hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="relative h-32 w-full bg-gray-100 dark:bg-gray-700 rounded mb-4">
                          {variant.image ? (
                            <Image
                              src={"https://elina.frappe.cloud" + variant.image}
                              alt={variant.item_name}
                              fill
                              className="object-cover rounded"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <Package className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                            </div>
                          )}
                        </div>
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                          {variant.item_name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Code: {variant.item_code}</p>
                        <div className="flex justify-between items-center mb-3">
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">UOM:</span> {variant.stock_uom}
                          </div>
                          {variant.standard_rate > 0 && (
                            <div className="text-lg font-bold text-red-600 dark:text-red-400">
                              ₹{variant.standard_rate.toLocaleString()}
                            </div>
                          )}
                        </div>
                        <Button
                          className="btn-modern-primary w-full flex items-center justify-center gap-2"
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
                        className="btn-modern-outline flex items-center gap-1"
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
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                        className="btn-modern-outline flex items-center gap-1"
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
