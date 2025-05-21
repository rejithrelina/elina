import Link from "next/link"

export default function SitemapPage() {
  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Sitemap</h1>
          <p className="text-lg text-gray-600 mb-12">
            Navigate through our website with ease using this comprehensive sitemap.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Main Pages */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Main Pages</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-red-600 hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-red-600 hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-red-600 hover:underline">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="text-red-600 hover:underline">
                    Gallery
                  </Link>
                </li>
              </ul>
            </div>

            {/* Products */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Products</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/products" className="text-red-600 hover:underline">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/products/commercial" className="text-red-600 hover:underline">
                    Commercial Equipment
                  </Link>
                </li>

                <li>
                  <Link href="/products/custom" className="text-red-600 hover:underline">
                    Custom Projects
                  </Link>
                </li>
                <li>
                  <Link href="/products/accessories" className="text-red-600 hover:underline">
                    Accessories
                  </Link>
                </li>
                <li>
                  <Link href="/products/spare-parts" className="text-red-600 hover:underline">
                    Spare Parts
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal & Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Legal & Information</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy" className="text-red-600 hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="text-red-600 hover:underline">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap" className="text-red-600 hover:underline">
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>

            {/* Commercial Equipment */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Commercial Equipment</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/products/commercial/cooking-equipment" className="text-red-600 hover:underline">
                    Cooking Equipment
                  </Link>
                </li>
                <li>
                  <Link href="/products/commercial/food-preparation" className="text-red-600 hover:underline">
                    Food Preparation
                  </Link>
                </li>
                <li>
                  <Link href="/products/commercial/ventilation-systems" className="text-red-600 hover:underline">
                    Ventilation Systems
                  </Link>
                </li>
                <li>
                  <Link href="/products/commercial/refrigeration" className="text-red-600 hover:underline">
                    Refrigeration
                  </Link>
                </li>
                <li>
                  <Link href="/products/commercial/dishwashing" className="text-red-600 hover:underline">
                    Dishwashing
                  </Link>
                </li>
                <li>
                  <Link href="/products/commercial/storage-solutions" className="text-red-600 hover:underline">
                    Storage Solutions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Residential Solutions */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Residential Solutions</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/products/residential/modular-kitchens" className="text-red-600 hover:underline">
                    Modular Kitchens
                  </Link>
                </li>
                <li>
                  <Link href="/products/residential/kitchen-islands" className="text-red-600 hover:underline">
                    Kitchen Islands
                  </Link>
                </li>
                <li>
                  <Link href="/products/residential/appliances" className="text-red-600 hover:underline">
                    Appliances
                  </Link>
                </li>
                <li>
                  <Link href="/products/residential/storage" className="text-red-600 hover:underline">
                    Storage Solutions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Support</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/contact" className="text-red-600 hover:underline">
                    Contact Support
                  </Link>
                </li>
                <li>
                  <Link href="/products/spare-parts" className="text-red-600 hover:underline">
                    Order Spare Parts
                  </Link>
                </li>
                <li>
                  <Link href="/maintenance" className="text-red-600 hover:underline">
                    Maintenance Services
                  </Link>
                </li>
                <li>
                  <Link href="/installation" className="text-red-600 hover:underline">
                    Installation Services
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
