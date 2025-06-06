"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/components/wishlist-provider"
import { useCart } from "@/context/cart-context"
import { X, Heart, Package, Plus, ShoppingCart, Eye } from "lucide-react"

interface WishlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WishlistModal({ isOpen, onClose }: WishlistModalProps) {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleAddToCart = (item: any) => {
    addToCart({
      item_code: item.item_code,
      item_name: item.item_name,
      item_group: item.item_group,
      description: item.description,
      stock_uom: item.stock_uom,
      standard_rate: item.standard_rate,
      image: item.image,
    })
  }

  const handleAddAllToCart = () => {
    wishlistItems.forEach((item) => {
      handleAddToCart(item)
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-card max-w-6xl w-full max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Heart className="h-7 w-7 text-red-600 fill-current" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistItems.length}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Wishlist</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {wishlistItems.length > 0 && (
              <>
                <Button onClick={handleAddAllToCart} className="btn-modern-primary flex items-center gap-2" size="sm">
                  <ShoppingCart className="h-4 w-4" />
                  Add All to Cart
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearWishlist}
                  className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Clear All
                </Button>
              </>
            )}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="relative mx-auto w-24 h-24 mb-6">
                <Heart className="h-24 w-24 text-gray-300 dark:text-gray-600" />
                <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 rounded-full -z-10"></div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Your wishlist is empty</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                Start adding products you love to your wishlist. You can save items for later and easily find them here.
              </p>
              <Button onClick={onClose} className="btn-modern-primary">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item, index) => (
                <div
                  key={item.item_code}
                  className="group relative border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800 fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(item.item_code)}
                    className="absolute top-3 right-3 z-10 p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors opacity-0 group-hover:opacity-100"
                    aria-label="Remove from wishlist"
                  >
                    <X className="h-4 w-4 text-red-600" />
                  </button>

                  {/* Product Image */}
                  <div className="relative h-40 w-full bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden">
                    {item.image ? (
                      <Image
                        src={"https://elina.frappe.cloud" + item.image}
                        alt={item.item_name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Package className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                      </div>
                    )}

                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link href={`/product/${item.item_code}`}>
                        <Button size="sm" className="bg-white/90 text-gray-900 hover:bg-white" onClick={onClose}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 text-sm leading-tight">
                      {item.item_name}
                    </h3>

                    <div className="space-y-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        <span className="font-medium">Code:</span> {item.item_code}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        <span className="font-medium">Brand:</span> {item.brand}
                      </p>
                    </div>

                    {/* Price */}
                    {item.standard_rate > 0 && (
                      <div className="text-lg font-bold text-red-600 dark:text-red-400">
                        ₹{item.standard_rate.toLocaleString()}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button className="btn-modern-primary flex-1 text-sm py-2" onClick={() => handleAddToCart(item)}>
                        <Plus className="h-3 w-3 mr-1" />
                        Add to Cart
                      </Button>
                      <Link href={`/product/${item.item_code}`}>
                        <Button variant="outline" size="sm" className="btn-modern-outline px-3" onClick={onClose}>
                          <Eye className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistItems.length > 0 && (
          <div className="border-t border-gray-200/50 dark:border-gray-700/50 p-6 bg-gray-50/50 dark:bg-gray-800/50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total: {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={onClose} className="btn-modern-outline">
                  Continue Shopping
                </Button>
                <Button onClick={handleAddAllToCart} className="btn-modern-primary flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Add All to Cart ({wishlistItems.length})
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
