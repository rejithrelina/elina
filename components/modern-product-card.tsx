"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Eye, Package, Star, Zap } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/components/wishlist-provider"
import { useToast } from "@/components/toast-provider"

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
  standard_rate?: number
}

interface ModernProductCardProps {
  product: Product
}

export default function ModernProductCard({ product }: ModernProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { showSuccess } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      item_code: product.item_code,
      item_name: product.item_name,
      item_group: product.item_group,
      description: product.description,
      stock_uom: product.stock_uom,
      standard_rate: product.standard_rate || 0,
      image: product.image,
    })
    showSuccess("Added to Cart", `${product.item_name} has been added to your cart`)
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isInWishlist(product.item_code)) {
      removeFromWishlist(product.item_code)
      showSuccess("Removed from Wishlist", `${product.item_name} has been removed from your wishlist`)
    } else {
      addToWishlist({
        item_code: product.item_code,
        item_name: product.item_name,
        item_group: product.item_group,
        description: product.description,
        stock_uom: product.stock_uom,
        standard_rate: product.standard_rate || 0,
        image: product.image,
        brand: product.brand,
      })
      showSuccess("Added to Wishlist", `${product.item_name} has been added to your wishlist`)
    }
  }

  const inWishlist = isInWishlist(product.item_code)

  return (
    <div
      className="group relative modern-card overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Badge
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <Zap className="h-3 w-3" />
          Premium
        </div>
      </div> */}

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-300 ${
          inWishlist
            ? "bg-red-500 text-white shadow-lg"
            : "bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-red-500 hover:text-white"
        } backdrop-blur-sm`}
      >
        <Heart className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`} />
      </button>

      {/* Product Image */}
      <Link href={`/product/${product.item_code}`}>
        <div className="relative h-64 w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 overflow-hidden">
          {!imageLoaded && <div className="absolute inset-0 skeleton" />}
          {product.image ? (
            <Image
              src={"https://elina.frappe.cloud" + product.image}
              alt={product.item_name}
              fill
              className={`object-cover transition-all duration-700 ${
                isHovered ? "scale-110" : "scale-100"
              } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setImageLoaded(true)}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Package className="h-16 w-16 text-gray-400 dark:text-gray-500" />
            </div>
          )}

          {/* Overlay on hover */}
          <div
            className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Quick Actions */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button
              size="sm"
              className="bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-gray-100 hover:bg-white dark:hover:bg-gray-800 backdrop-blur-sm"
            >
              <Eye className="h-4 w-4 mr-2" />
              Quick View
            </Button>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-6">
        {/* Brand & Rating */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{product.brand}</span>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 dark:text-gray-400">4.8</span>
          </div>
        </div>

        {/* Product Name */}
        <Link href={`/product/${product.item_code}`}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 hover:text-red-600 dark:hover:text-red-400 transition-colors">
            {product.item_name}
          </h3>
        </Link>

        {/* Product Details */}
        <div className="space-y-1 mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Code: {product.item_code}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Group: {product.item_group}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">UOM: {product.stock_uom}</p>
        </div>

        {/* Description */}
        {product.description && (
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
            {product.description.replace(/<[^>]*>/g, "")}
          </p>
        )}

        {/* Price & Variants */}
        <div className="flex items-center justify-between mb-4">
          {product.standard_rate && product.standard_rate > 0 ? (
            <div className="text-xl font-bold text-red-600 dark:text-red-400">
              ₹{product.standard_rate.toLocaleString()}
            </div>
          ) : (
            <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              Has {product.has_variants || 0} Variants
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link href={`/product/${product.item_code}`} className="flex-1">
            <Button variant="outline" className="w-full btn-modern-outline">
              View Details
            </Button>
          </Link>
          <Button onClick={handleAddToCart} className="btn-modern-primary flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
