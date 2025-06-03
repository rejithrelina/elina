"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface WishlistItem {
  item_code: string
  item_name: string
  item_group: string
  description: string
  stock_uom: string
  standard_rate: number
  image: string | null
  brand: string
}

interface WishlistContextType {
  wishlistItems: WishlistItem[]
  addToWishlist: (product: WishlistItem) => void
  removeFromWishlist: (itemCode: string) => void
  isInWishlist: (itemCode: string) => boolean
  clearWishlist: () => void
  getTotalWishlistItems: () => number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("syena-wishlist")
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist))
      } catch (error) {
        console.error("Error loading wishlist from localStorage:", error)
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("syena-wishlist", JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const addToWishlist = (product: WishlistItem) => {
    setWishlistItems((prev) => {
      const existingItem = prev.find((item) => item.item_code === product.item_code)
      if (!existingItem) {
        return [...prev, product]
      }
      return prev
    })
  }

  const removeFromWishlist = (itemCode: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.item_code !== itemCode))
  }

  const isInWishlist = (itemCode: string) => {
    return wishlistItems.some((item) => item.item_code === itemCode)
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  const getTotalWishlistItems = () => {
    return wishlistItems.length
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        getTotalWishlistItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
