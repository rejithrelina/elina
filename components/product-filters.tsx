"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, X, Filter } from "lucide-react"

const API_URL = "https://elina.frappe.cloud/api"
const AUTH_HEADER = {
  Authorization: `token 9403214475f834f:df3e2e8bfee05db`,
  "Content-Type": "application/json",
}

interface ItemAttribute {
  attribute_name: string
  from_range: number
  to_range: number
  increment: number
}

interface AttributeValue {
  attribute_value: string
  abbr: string
}

interface AttributeDetail {
  name: string
  attribute_name: string
  numeric_values: number
  from_range: number
  to_range: number
  increment: number
  item_attribute_values: AttributeValue[]
}

interface FilterValue {
  attribute: string
  value: string | number
  operator: string
}

interface ProductFiltersProps {
  onFiltersChange: (filters: FilterValue[]) => void
  isOpen: boolean
  onToggle: () => void
}

export default function ProductFilters({ onFiltersChange, isOpen, onToggle }: ProductFiltersProps) {
  const [attributes, setAttributes] = useState<ItemAttribute[]>([])
  const [attributeDetails, setAttributeDetails] = useState<Record<string, AttributeDetail>>({})
  const [loading, setLoading] = useState(true)
  const [selectedFilters, setSelectedFilters] = useState<FilterValue[]>([])
  const [expandedAttributes, setExpandedAttributes] = useState<Set<string>>(new Set())

  // Fetch all item attributes
  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const response = await fetch(
          `${API_URL}/resource/Item%20Attribute?fields=["attribute_name","from_range","to_range","increment"]&limit_page_length=100`,
          {
            method: "GET",
            headers: AUTH_HEADER,
          },
        )

        if (response.ok) {
          const data = await response.json()
          setAttributes(data.data || [])
        }
      } catch (error) {
        console.error("Error fetching attributes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAttributes()
  }, [])

  // Fetch attribute details when expanded
  const fetchAttributeDetails = async (attributeName: string) => {
    if (attributeDetails[attributeName]) return

    try {
      const response = await fetch(
        `${API_URL}/resource/Item%20Attribute/${encodeURIComponent(attributeName)}?fields=["attribute_name","numeric_values","from_range","to_range","increment","item_attribute_values"]`,
        {
          method: "GET",
          headers: AUTH_HEADER,
        },
      )

      if (response.ok) {
        const data = await response.json()
        setAttributeDetails((prev) => ({
          ...prev,
          [attributeName]: data.data,
        }))
      }
    } catch (error) {
      console.error(`Error fetching details for ${attributeName}:`, error)
    }
  }

  const toggleAttribute = (attributeName: string) => {
    const newExpanded = new Set(expandedAttributes)
    if (newExpanded.has(attributeName)) {
      newExpanded.delete(attributeName)
    } else {
      newExpanded.add(attributeName)
      fetchAttributeDetails(attributeName)
    }
    setExpandedAttributes(newExpanded)
  }

  const addFilter = (attribute: string, value: string | number, operator = "=") => {
    const newFilter: FilterValue = { attribute, value, operator }
    const updatedFilters = [...selectedFilters.filter((f) => f.attribute !== attribute), newFilter]
    setSelectedFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const removeFilter = (attribute: string) => {
    const updatedFilters = selectedFilters.filter((f) => f.attribute !== attribute)
    setSelectedFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const clearAllFilters = () => {
    setSelectedFilters([])
    onFiltersChange([])
  }

  const renderNumericFilter = (attribute: ItemAttribute, details: AttributeDetail) => {
    const currentFilter = selectedFilters.find((f) => f.attribute === attribute.attribute_name)

    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            min={details.from_range}
            max={details.to_range}
            step={details.increment || 1}
            className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
            onChange={(e) => {
              if (e.target.value) {
                addFilter(attribute.attribute_name, Number(e.target.value), ">=")
              } else {
                removeFilter(attribute.attribute_name)
              }
            }}
          />
          <span className="text-gray-500">to</span>
          <input
            type="number"
            placeholder="Max"
            min={details.from_range}
            max={details.to_range}
            step={details.increment || 1}
            className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
            onChange={(e) => {
              if (e.target.value) {
                addFilter(attribute.attribute_name, Number(e.target.value), "<=")
              }
            }}
          />
        </div>
        {details.from_range !== details.to_range && (
          <div className="text-xs text-gray-500">
            Range: {details.from_range} - {details.to_range}
            {details.increment > 0 && ` (step: ${details.increment})`}
          </div>
        )}
      </div>
    )
  }

  const renderSelectFilter = (attribute: ItemAttribute, details: AttributeDetail) => {
    const currentFilter = selectedFilters.find((f) => f.attribute === attribute.attribute_name)

    return (
      <div className="space-y-2">
        <select
          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
          value={currentFilter?.value || ""}
          onChange={(e) => {
            if (e.target.value) {
              addFilter(attribute.attribute_name, e.target.value)
            } else {
              removeFilter(attribute.attribute_name)
            }
          }}
        >
          <option value="">Select {attribute.attribute_name}</option>
          {details.item_attribute_values?.map((value) => (
            <option key={value.attribute_value} value={value.attribute_value}>
              {value.attribute_value}
            </option>
          ))}
        </select>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      {/* Filter Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <h3 className="font-medium text-gray-900">Filters</h3>
            {selectedFilters.length > 0 && (
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">{selectedFilters.length}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {selectedFilters.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-red-600 hover:text-red-700">
                Clear All
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onToggle}>
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {selectedFilters.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedFilters.map((filter) => (
              <div
                key={filter.attribute}
                className="flex items-center gap-1 bg-red-50 text-red-700 px-2 py-1 rounded text-sm"
              >
                <span>
                  {filter.attribute}: {filter.operator} {filter.value}
                </span>
                <button onClick={() => removeFilter(filter.attribute)} className="hover:text-red-900">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filter Content */}
      {isOpen && (
        <div className="p-4 max-h-96 overflow-y-auto">
          <div className="space-y-4">
            {attributes.map((attribute) => (
              <div key={attribute.attribute_name} className="border-b border-gray-100 pb-4 last:border-b-0">
                <button
                  onClick={() => toggleAttribute(attribute.attribute_name)}
                  className="flex items-center justify-between w-full text-left py-2 hover:text-red-600 transition-colors"
                >
                  <span className="font-medium text-sm">{attribute.attribute_name}</span>
                  {expandedAttributes.has(attribute.attribute_name) ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>

                {expandedAttributes.has(attribute.attribute_name) && (
                  <div className="mt-2 pl-2">
                    {attributeDetails[attribute.attribute_name] ? (
                      <div>
                        {attributeDetails[attribute.attribute_name].numeric_values
                          ? renderNumericFilter(attribute, attributeDetails[attribute.attribute_name])
                          : renderSelectFilter(attribute, attributeDetails[attribute.attribute_name])}
                      </div>
                    ) : (
                      <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded"></div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
