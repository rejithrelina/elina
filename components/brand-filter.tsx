"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, Filter } from "lucide-react"

interface BrandFilterProps {
  onBrandChange: (brand: string) => void
  selectedBrand: string
  isOpen: boolean
  onToggle: () => void
}

const BrandFilter: React.FC<BrandFilterProps> = ({ onBrandChange, selectedBrand, isOpen, onToggle }) => {
  const [brands, setBrands] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/brands")
      .then((res) => res.json())
      .then((data) => {
        setBrands(data.data || [])
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching brands:", err)
        setLoading(false)
      })
  }, [])

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const brand = event.target.value
    onBrandChange(brand)
  }

  return (
    <div className="glass-card">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <h3 className="font-medium text-gray-900 dark:text-gray-100">Brand Filter</h3>
            {selectedBrand && (
              <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 text-xs px-2 py-1 rounded-full">
                1
              </span>
            )}
          </div>
          <button onClick={onToggle} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="p-4">
          {loading ? (
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Brand</label>
              <select value={selectedBrand} onChange={handleBrandChange} className="modern-input w-full">
                <option value="">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              {selectedBrand && (
                <button
                  onClick={() => onBrandChange("")}
                  className="mt-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                >
                  Clear Brand Filter
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default BrandFilter
