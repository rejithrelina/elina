"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface CartItem {
  item_code: string
  item_name: string
  item_group: string
  description: string
  stock_uom: string
  standard_rate: number
  image: string | null
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: Omit<CartItem, "quantity">) => void
  removeFromCart: (itemCode: string) => void
  updateQuantity: (itemCode: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalValue: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("syena-cart")
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("syena-cart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.item_code === product.item_code)
      if (existingItem) {
        return prev.map((item) =>
          item.item_code === product.item_code ? { ...item, quantity: item.quantity + 1 } : item,
        )
      } else {
        return [...prev, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (itemCode: string) => {
    setCartItems((prev) => prev.filter((item) => item.item_code !== itemCode))
  }

  const updateQuantity = (itemCode: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemCode)
      return
    }
    setCartItems((prev) => prev.map((item) => (item.item_code === itemCode ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalValue = () => {
    return cartItems.reduce((total, item) => total + item.standard_rate * item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalValue,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
