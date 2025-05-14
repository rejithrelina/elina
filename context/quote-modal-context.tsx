"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface QuoteModalContextType {
  isQuoteModalOpen: boolean
  openQuoteModal: () => void
  closeQuoteModal: () => void
}

const QuoteModalContext = createContext<QuoteModalContextType | undefined>(undefined)

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)

  const openQuoteModal = () => setIsQuoteModalOpen(true)
  const closeQuoteModal = () => setIsQuoteModalOpen(false)

  return (
    <QuoteModalContext.Provider value={{ isQuoteModalOpen, openQuoteModal, closeQuoteModal }}>
      {children}
    </QuoteModalContext.Provider>
  )
}

export function useQuoteModal() {
  const context = useContext(QuoteModalContext)
  if (context === undefined) {
    throw new Error("useQuoteModal must be used within a QuoteModalProvider")
  }
  return context
}
