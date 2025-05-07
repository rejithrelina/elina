"use client"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from "next/image"
import { useEffect, useState } from "react"
interface GalleryLightboxProps {
  images: {
    id: number
    src: string
    alt: string
  }[]
  initialIndex: number
  isOpen: boolean
  onClose: () => void
}
export default function GalleryLightbox({ images, initialIndex, isOpen, onClose }: GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowLeft") {
        navigatePrev()
      } else if (e.key === "ArrowRight") {
        navigateNext()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentIndex])
  if (!isOpen) return null
  const navigatePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }
  const navigateNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white hover:bg-white/10 z-10"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 text-white hover:bg-white/10 z-10"
          onClick={navigatePrev}
        >
          <ChevronLeft className="h-8 w-8" />
          <span className="sr-only">Previous</span>
        </Button>
        <div className="relative h-[80vh] w-[80vw] max-w-6xl">
          <Image
            src={images[currentIndex].src || "/placeholder.svg"}
            alt={images[currentIndex].alt}
            fill
            className="object-contain"
            sizes="80vw"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 text-white hover:bg-white/10 z-10"
          onClick={navigateNext}
        >
          <ChevronRight className="h-8 w-8" />
          <span className="sr-only">Next</span>
        </Button>
        <div className="absolute bottom-4 left-0 right-0 text-center text-white">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  )
}
