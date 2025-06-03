import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { QuoteModalProvider } from "@/context/quote-modal-context"
import { CartProvider } from "@/context/cart-context"
import { WishlistProvider } from "@/components/wishlist-provider"
import { ToastProvider } from "@/components/toast-provider"
import QuoteModalWrapper from "@/components/quote-modal-wrapper"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Syena Kitchenconceptz - Premium Kitchen Equipment Manufacturer",
  description: "Leading manufacturer of high-quality commercial and residential kitchen equipment in India.",
  icons: {
    icon: "https://elina.frappe.cloud/files/favicon.ico",
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@YourTwitterHandle" />
        <meta name="twitter:title" content="Syena Kitchenconceptz - Premium Kitchen Equipment Manufacturer" />
        <meta
          name="twitter:description"
          content="Leading manufacturer of high-quality commercial and residential kitchen equipment in India."
        />
        <meta name="twitter:image" content="https://elina.frappe.cloud/files/elina-logo-w.jpg" />

        <Script src="https://www.googletagmanager.com/gtag/js?id=G-NSL8D1BTBG" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NSL8D1BTBG');
          `}
        </Script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Syena Kitchenconceptz Manufacturing Pvt. Ltd.",
            image: [
              "https://elina.frappe.cloud/files/product-1-1.png",
              "https://elina.frappe.cloud/files/product-16-9.png",
              "https://elina.frappe.cloud/files/product-4-3.png",
            ],
            address: {
              "@type": "PostalAddress",
              streetAddress: "Ground Floor, 108, 7th Mile Hosur Rd, Chikka Begur, Industrial Layout, Garvebhavi Palya,",
              addressLocality: "Bengaluru",
              addressRegion: "Karnataka",
              postalCode: "560068",
              addressCountry: "India",
            },
            review: {
              "@type": "Review",
              reviewRating: {
                "@type": "Rating",
                ratingValue: 4,
                bestRating: 5,
              },
              author: {
                "@type": "Person",
                name: "Priya Sharma",
              },
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 12.8882292,
              longitude: 77.638814,
            },
            url: "https://elina.so",
            telephone: "+919845447744",
            priceRange: "₹₹₹",
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "09:30",
                closes: "18:30",
              },
            ],
          })}
        </script>
      </head>
      <body className={inter.className}>
        <ToastProvider>
          <WishlistProvider>
            <CartProvider>
              <QuoteModalProvider>
                <Suspense>
                  <Header />
                  {children}
                  <Footer />
                  <QuoteModalWrapper />
                </Suspense>
                <Analytics />
                <SpeedInsights />
              </QuoteModalProvider>
            </CartProvider>
          </WishlistProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
