"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface Brand {
  id: number
  name: string
}

interface BrandFilterProps {
  onBrandChange: (brand: string) => void
}

const BrandFilter: React.FC<BrandFilterProps> = ({ onBrandChange }) => {
  const [brands, setBrands] = useState<Brand[]>([])
  const [selectedBrand, setSelectedBrand] = useState<string>("")

  useEffect(() => {
    fetch("/api/brands")
      .then((res) => res.json())
      .then((data) => {
        setBrands(data.data || [])
      })
      .catch((err) => console.error("Error fetching brands:", err))
  }, [])

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const brand = event.target.value
    setSelectedBrand(brand)
    onBrandChange(brand)
  }

  return (
    <div>
      <label htmlFor="brand">Brand:</label>
      <select id="brand" value={selectedBrand} onChange={handleBrandChange}>
        <option value="">All Brands</option>
        {brands.map((brand) => (
          <option key={brand.id} value={brand.name}>
            {brand.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default BrandFilter
