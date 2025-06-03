"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GalleryLightbox from "@/components/gallery-lightbox"

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Updated gallery items with placeholder images
  const galleryItems = [
    {
      id: 1,
      title: "Commercial Kitchen Setup",
      description: "Complete kitchen setup for a 5-star hotel in Bangalore",
      category: "commercial",
      image: "https://placehold.co/600x400.png",
    },
    {
      id: 2,
      title: "Restaurant Kitchen Installation",
      description: "Modern kitchen installation for a fine dining restaurant",
      category: "commercial",
      image: "https://placehold.co/600x400.png",
    },
    {
      id: 3,
      title: "Luxury Home Kitchen",
      description: "Custom kitchen design for a luxury residence",
      category: "renovation",
      image: "https://placehold.co/600x400.png",
    },
    {
      id: 4,
      title: "Apartment Kitchen Renovation",
      description: "Complete renovation of an apartment kitchen",
      category: "renovation",
      image: "https://placehold.co/600x400.png",
    },
    {
      id: 5,
      title: "Commercial Range Cookers",
      description: "High-performance range cookers for commercial use",
      category: "equipment",
      image: "https://elina.frappe.cloud/files/product-1.png",
    },
    {
      id: 6,
      title: "Stainless Steel Work Tables",
      description: "Custom stainless steel work tables for professional kitchens",
      category: "equipment",
      image: "https://elina.frappe.cloud/files/product-2.png",
    },
    {
      id: 7,
      title: "Hotel Buffet Setup",
      description: "Complete buffet line setup for a hotel restaurant",
      category: "commercial",
      image: "https://placehold.co/600x400.png",
    },
    {
      id: 8,
      title: "Modern Home Kitchen",
      description: "Contemporary kitchen design for a modern home",
      category: "renovation",
      image: "https://placehold.co/600x400.png",
    },
    {
      id: 9,
      title: "Ventilation Systems",
      description: "Advanced kitchen ventilation systems for commercial use",
      category: "equipment",
      image: "https://elina.frappe.cloud/files/product-3.png",
    },
  ]

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  // Convert gallery items to lightbox format
  const lightboxImages = galleryItems.map((item) => ({
    id: item.id,
    src: item.image,
    alt: item.title,
  }))

  return (
    <main className="min-h-screen py-20 page-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Our Gallery</h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore our portfolio of premium kitchen equipment and installations
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="grid grid-cols-4 w-full max-w-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <TabsTrigger value="all" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                All Projects
              </TabsTrigger>
              <TabsTrigger value="commercial" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                Commercial
              </TabsTrigger>
              <TabsTrigger value="renovation" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                Renovation
              </TabsTrigger>
              <TabsTrigger value="equipment" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                Equipment
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item, index) => (
                <GalleryItem key={item.id} item={item} onClick={() => openLightbox(index)} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="commercial" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems
                .filter((item) => item.category === "commercial")
                .map((item) => {
                  const index = galleryItems.findIndex((i) => i.id === item.id)
                  return <GalleryItem key={item.id} item={item} onClick={() => openLightbox(index)} />
                })}
            </div>
          </TabsContent>

          <TabsContent value="renovation" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems
                .filter((item) => item.category === "renovation")
                .map((item) => {
                  const index = galleryItems.findIndex((i) => i.id === item.id)
                  return <GalleryItem key={item.id} item={item} onClick={() => openLightbox(index)} />
                })}
            </div>
          </TabsContent>

          <TabsContent value="equipment" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems
                .filter((item) => item.category === "equipment")
                .map((item) => {
                  const index = galleryItems.findIndex((i) => i.id === item.id)
                  return <GalleryItem key={item.id} item={item} onClick={() => openLightbox(index)} />
                })}
            </div>
          </TabsContent>
        </Tabs>

        <GalleryLightbox
          images={lightboxImages}
          initialIndex={currentImageIndex}
          isOpen={lightboxOpen}
          onClose={closeLightbox}
        />
      </div>
    </main>
  )
}

// Gallery Item Component
function GalleryItem({ item, onClick }) {
  return (
    <div
      className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl cursor-pointer modern-card"
      onClick={onClick}
    >
      <div className="relative h-72 w-full overflow-hidden">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
        <p className="text-white/90 text-sm">{item.description}</p>
        <div className="mt-3">
          <span className="inline-block bg-red-600 text-white text-xs px-3 py-1 rounded-full">
            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
          </span>
        </div>
      </div>
    </div>
  )
}
