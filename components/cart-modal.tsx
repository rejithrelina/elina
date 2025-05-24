"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { X, Plus, Minus, Package, ShoppingCart } from "lucide-react"

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
  onCheckout: () => void
}

export default function CartModal({ isOpen, onClose, onCheckout }: CartModalProps) {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalItems, getTotalValue } = useCart()

  if (!isOpen) return null

  const handleCheckout = () => {
    onCheckout()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl max-h-[90vh] overflow-hidden">
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-red-600" />
            <h2 className="text-2xl font-bold">Shopping Cart ({getTotalItems()} items)</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600">Add some products to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.item_code} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="relative h-16 w-16 bg-gray-100 rounded">
                    {item.image ? (
                      <Image
                        src={"https://elina.frappe.cloud" + item.image}
                        alt={item.item_name}
                        fill
                        className="object-cover rounded"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{item.item_name}</h3>
                    <p className="text-sm text-gray-600">Code: {item.item_code}</p>
                    <p className="text-sm text-gray-600">Group: {item.item_group}</p>
                    {item.standard_rate > 0 && (
                      <p className="text-sm font-medium text-red-600">₹{item.standard_rate.toLocaleString()}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.item_code, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.item_code, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => removeFromCart(item.item_code)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="sticky bottom-0 bg-white border-t p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium">Total Items: {getTotalItems()}</span>
              {getTotalValue() > 0 && (
                <span className="text-xl font-bold text-red-600">Total: ₹{getTotalValue().toLocaleString()}</span>
              )}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={clearCart} className="flex-1">
                Clear Cart
              </Button>
              <Button onClick={handleCheckout} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                Checkout & Request Quote
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
