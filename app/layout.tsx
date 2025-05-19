import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { QuoteModalProvider } from "@/context/quote-modal-context"
import FloatingQuoteButton from "@/components/floating-quote-button"
import QuoteModalWrapper from "@/components/quote-modal-wrapper"
import { Suspense } from "react"

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
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-NSL8D1BTBG" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NSL8D1BTBG');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <QuoteModalProvider>
            <Suspense>
              <Header />
              {children}
              <Footer />
              <FloatingQuoteButton />
              <QuoteModalWrapper />
            </Suspense>
            <Analytics />
            <SpeedInsights />
          </QuoteModalProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
