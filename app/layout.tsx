import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { QuoteModalProvider } from "@/context/quote-modal-context"
import FloatingQuoteButton from "@/components/floating-quote-button"
import QuoteModalWrapper from "@/components/quote-modal-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Syena Kitchenconceptz - Premium Kitchen Equipment Manufacturer",
  description: "Leading manufacturer of high-quality commercial and residential kitchen equipment in India.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <QuoteModalProvider>
            <Header />
            {children}
            <Footer />
            <FloatingQuoteButton />
            <QuoteModalWrapper />
          </QuoteModalProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
