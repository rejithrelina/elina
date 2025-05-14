"use client"

import { useQuoteModal } from "@/context/quote-modal-context"
import QuoteRequestModal from "@/components/quote-request-modal"

export default function QuoteModalWrapper() {
  const { isQuoteModalOpen, closeQuoteModal } = useQuoteModal()

  return <QuoteRequestModal isOpen={isQuoteModalOpen} onClose={closeQuoteModal} />
}
