"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, X, Filter } from "lucide-react"

const API_URL = "https://elina.frappe.cloud/api"
const AUTH_HEADER = {
  Authorization: `token 9403214475f834f:df3e2e8bfee05db`,
  "Content-Type": "application/json",
}

interface Brand {
  brand: string
  description: string
  image: string | null
}

interface BrandFilterProps {
  onBrandChange: (brand: string) => void
  selectedBrand: string
  isOpen: boolean
  onToggle: () => void
}

export default function BrandFilter({ onBrandChange, selectedBrand, isOpen, onToggle }: BrandFilterProps) {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalBrands, setTotalBrands] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const BRANDS_PER_PAGE = 20

  // Fetch brands with pagination
  const fetchBrands = async (page = 1, append = false) => {
    try {
      setLoading(true)

      // Get total count first
      if (page === 1) {
        const countResponse = await fetch(`${API_URL}/method/frappe.client.get_count?doctype=Brand`, {
          method: "GET",
          headers: AUTH_HEADER,
        })

        if (countResponse.ok) {
          const countData = await countResponse.json()
          setTotalBrands(countData.message)
        }
      }

      // Fetch brands
      const limitStart = (page - 1) * BRANDS_PER_PAGE
      const response = await fetch(
        `${API_URL}/resource/Brand?fields=["brand","description","image"]&limit_start=${limitStart}&limit_page_length=${BRANDS_PER_PAGE}`,
        {
          method: "GET",
          headers: AUTH_HEADER,
        },
      )

      if (response.ok) {
        const data = await response.json()
        const newBrands = data.data || []

        if (append) {
          setBrands((prev) => [...prev, ...newBrands])
        } else {
          setBrands(newBrands)
        }

        setHasMore(newBrands.length === BRANDS_PER_PAGE)
      }
    } catch (error) {
      console.error("Error fetching brands:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen && brands.length === 0) {
      fetchBrands(1)
    }
  }, [isOpen])

  const loadMoreBrands = () => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    fetchBrands(nextPage, true)
  }

  const clearBrand = () => {
    onBrandChange("")
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      {/* Filter Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <h3 className="font-medium text-gray-900">Brand Filter</h3>
            {selectedBrand && <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">1</span>}
          </div>
          <div className="flex items-center gap-2">
            {selectedBrand && (
              <Button variant="ghost" size="sm" onClick={clearBrand} className="text-red-600 hover:text-red-700">
                Clear
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onToggle}>
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Active Brand Filter */}
        {selectedBrand && (
          <div className="mt-3 flex flex-wrap gap-2">
            <div className="flex items-center gap-1 bg-red-50 text-red-700 px-2 py-1 rounded text-sm">
              <span>Brand: {selectedBrand}</span>
              <button onClick={clearBrand} className="hover:text-red-900">
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Filter Content */}
      {isOpen && (
        <div className="p-4 max-h-96 overflow-y-auto">
          {loading && brands.length === 0 ? (
            <div className="animate-pulse space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 rounded"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              <div className="mb-4">
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-red-500 focus:border-red-500"
                  value={selectedBrand}
                  onChange={(e) => onBrandChange(e.target.value)}
                >
                  <option value="">All Brands</option>
                  {brands.map((brand) => (
                    <option key={brand.brand} value={brand.brand}>
                      {brand.brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand List */}
              <div className="space-y-1">
                {brands.map((brand) => (
                  <button
                    key={brand.brand}
                    onClick={() => onBrandChange(brand.brand)}
                    className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                      selectedBrand === brand.brand
                        ? "bg-red-50 text-red-700 font-medium"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{brand.brand}</span>
                      {selectedBrand === brand.brand && <span className="text-red-600">✓</span>}
                    </div>
                    {brand.description && <div className="text-xs text-gray-500 mt-1">{brand.description}</div>}
                  </button>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="pt-3 border-t border-gray-100">
                  <Button variant="outline" size="sm" onClick={loadMoreBrands} disabled={loading} className="w-full">
                    {loading ? "Loading..." : `Load More (${brands.length}/${totalBrands})`}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
