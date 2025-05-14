"use client"

import { Button } from "@/components/ui/button"
import { useQuoteModal } from "@/context/quote-modal-context"
import { MessageSquareQuote } from "lucide-react"

export default function FloatingQuoteButton() {
  const { openQuoteModal } = useQuoteModal()

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Button
        onClick={openQuoteModal}
        className="bg-red-600 hover:bg-red-700 text-white rounded-full h-16 w-16 shadow-lg flex items-center justify-center"
        aria-label="Request a Quote"
      >
        <MessageSquareQuote className="h-6 w-6" />
      </Button>
      <span className="absolute -top-10 right-0 bg-gray-800 text-white text-sm py-1 px-3 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Request a Quote
      </span>
    </div>
  )
}
