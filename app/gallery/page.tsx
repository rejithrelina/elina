"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GalleryLightbox from "@/components/gallery-lightbox"
import { galleryItems } from "@/lib/data"

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900">Our Gallery</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our portfolio of premium kitchen equipment and installations
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="grid grid-cols-4 w-full max-w-2xl">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="commercial">Commercial</TabsTrigger>
              <TabsTrigger value="residential">Residential</TabsTrigger>
              <TabsTrigger value="equipment">Equipment</TabsTrigger>
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

          <TabsContent value="residential" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems
                .filter((item) => item.category === "residential")
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
      className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl cursor-pointer"
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
