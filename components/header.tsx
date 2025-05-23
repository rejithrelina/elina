"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useQuoteModal } from "@/context/quote-modal-context"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { openQuoteModal } = useQuoteModal()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
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
            <Link href="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Home
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-red-600 font-medium transition-colors">
                Products
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
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/products/commercial" className="w-full">
                    Commercial Equipment
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link href="/products/custom" className="w-full">
                    Custom Projects
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              About Us
            </Link>
            <Link href="/gallery" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Gallery
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Contact
            </Link>
            <Link href="/products-list" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Products List
            </Link>
            <Link href="/contact/form" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Contact Form
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={openQuoteModal}>
              Request Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-red-600 font-medium transition-colors py-2"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <div className="border-t border-gray-100 pt-2">
                <p className="text-gray-700 font-medium mb-2">Products</p>
                <div className="pl-4 space-y-2">
                  <Link
                    href="/products/commercial"
                    className="text-gray-600 hover:text-red-600 transition-colors block py-1"
                    onClick={toggleMenu}
                  >
                    Commercial Equipment
                  </Link>

                  <Link
                    href="/products/custom"
                    className="text-gray-600 hover:text-red-600 transition-colors block py-1"
                    onClick={toggleMenu}
                  >
                    Custom Projects
                  </Link>
                </div>
              </div>
              <Link
                href="/about"
                className="text-gray-700 hover:text-red-600 font-medium transition-colors py-2 border-t border-gray-100 pt-4"
                onClick={toggleMenu}
              >
                About Us
              </Link>
              <Link
                href="/gallery"
                className="text-gray-700 hover:text-red-600 font-medium transition-colors py-2"
                onClick={toggleMenu}
              >
                Gallery
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-red-600 font-medium transition-colors py-2"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <Link
                href="/products-list"
                className="text-gray-700 hover:text-red-600 font-medium transition-colors py-2"
                onClick={toggleMenu}
              >
                Products List
              </Link>
              <Link
                href="/contact/form"
                className="text-gray-700 hover:text-red-600 font-medium transition-colors py-2"
                onClick={toggleMenu}
              >
                Contact Form
              </Link>
              <div className="pt-4 border-t border-gray-100">
                <Button
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
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
  )
}
