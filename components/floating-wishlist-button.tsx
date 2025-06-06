"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { useWishlist } from "@/components/wishlist-provider"
import WishlistModal from "@/components/wishlist-modal"

export default function FloatingWishlistButton() {
  const { wishlistItems } = useWishlist()
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (wishlistItems.length === 0) return null

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
        aria-label={`View wishlist (${wishlistItems.length} items)`}
      >
        <div className="relative">
          <Heart className="h-6 w-6 fill-current" />
          {wishlistItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
              {wishlistItems.length > 99 ? "99+" : wishlistItems.length}
            </span>
          )}
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          View Wishlist ({wishlistItems.length})
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </button>

      <WishlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
