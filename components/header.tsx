"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useQuoteModal } from "@/context/quote-modal-context"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/components/wishlist-provider"
import CartModal from "@/components/cart-modal"
import CartCheckoutModal from "@/components/cart-checkout-modal"
import ThemeToggle from "@/components/theme-toggle"
import { ShoppingCart, Heart, Search, Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)

  const { openQuoteModal } = useQuoteModal()
  const { getTotalItems } = useCart()
  const { getTotalWishlistItems } = useWishlist()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleCartClick = () => {
    setIsCartModalOpen(true)
  }

  const handleCheckout = () => {
    setIsCartModalOpen(false)
    setIsCheckoutModalOpen(true)
  }

  return (
    <>
      <header className="glass sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="https://elina.frappe.cloud/files/with%20black%20png%20logo.png"
                alt="Elina Logo"
                width={180}
                height={50}
                className="h-10 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors"
              >
                Home
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors">
                  Services
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="glass-card border-gray-200/50 dark:border-gray-700/50">
                  
                  <DropdownMenuItem>
                    <Link href="/products/custom" className="w-full">
                      Custom Projects
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/products/commercial" className="w-full">
                      Commercial Equipment
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/products/accessories" className="w-full">
                      Accessories
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/products/spare-parts" className="w-full">
                      Spare Parts
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link
                href="/products-list"
                className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors"
              >
                Products Catalog
              </Link>
              
              <Link
                href="/gallery"
                className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors"
              >
                Gallery
              </Link>
              <Link
                href="/about"
                className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors"
              >
                Contact
              </Link>
              
            </nav>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Search Button */}
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:scale-110 transition-transform hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Search className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </Button>

              {/* Wishlist Icon */}
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:scale-110 transition-transform hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Heart className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                {getTotalWishlistItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse-glow">
                    {getTotalWishlistItems()}
                  </span>
                )}
              </Button>

              {/* Cart Icon */}
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:scale-110 transition-transform hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={handleCartClick}
              >
                <ShoppingCart className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse-glow">
                    {getTotalItems()}
                  </span>
                )}
              </Button>

              {/* Theme Toggle
              <ThemeToggle />
               */}

              <Button className="btn-modern-primary" onClick={openQuoteModal}>
                Request Quote
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Mobile Cart Icon */}
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={handleCartClick}
              >
                <ShoppingCart className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="hover:scale-110 transition-transform hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass-card border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors py-2"
                  onClick={toggleMenu}
                >
                  Home
                </Link>
                <div className="border-t border-gray-100 dark:border-gray-700 pt-2">
                  <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">Products</p>
                  <div className="pl-4 space-y-2">
                    <Link
                      href="/products/commercial"
                      className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors block py-1"
                      onClick={toggleMenu}
                    >
                      Commercial Equipment
                    </Link>
                    <Link
                      href="/products/custom"
                      className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors block py-1"
                      onClick={toggleMenu}
                    >
                      Custom Projects
                    </Link>
                    <Link
                      href="/products/accessories"
                      className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors block py-1"
                      onClick={toggleMenu}
                    >
                      Accessories
                    </Link>
                    <Link
                      href="/products/spare-parts"
                      className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors block py-1"
                      onClick={toggleMenu}
                    >
                      Spare Parts
                    </Link>
                  </div>
                </div>
                <Link
                  href="/about"
                  className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors py-2 border-t border-gray-100 dark:border-gray-700 pt-4"
                  onClick={toggleMenu}
                >
                  About Us
                </Link>
                <Link
                  href="/gallery"
                  className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors py-2"
                  onClick={toggleMenu}
                >
                  Gallery
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors py-2"
                  onClick={toggleMenu}
                >
                  Contact
                </Link>
                <Link
                  href="/products-list"
                  className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors py-2"
                  onClick={toggleMenu}
                >
                  Products Catalog
                </Link>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  {/*<ThemeToggle />*/}
                  <Button
                    className="btn-modern-primary"
                    onClick={() => {
                      openQuoteModal()
                      toggleMenu()
                    }}
                  >
                    Request Quote
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Cart Modal */}
      <CartModal isOpen={isCartModalOpen} onClose={() => setIsCartModalOpen(false)} onCheckout={handleCheckout} />

      {/* Checkout Modal */}
      <CartCheckoutModal isOpen={isCheckoutModalOpen} onClose={() => setIsCheckoutModalOpen(false)} />
    </>
  )
}
