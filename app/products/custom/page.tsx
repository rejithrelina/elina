import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CustomProductsPage() {
  const customSolutions = [
  {
    id: 1,
    title: "Restaurant Kitchens",
    description: "End-to-end design and equipment for efficient, high-volume restaurant operations.",
    image: "https://elina.frappe.cloud/files/Research-Developme.png",
    process: ["Site Survey", "Menu Analysis", "Layout Planning", "Installation & Handover"],
  },
  {
    id: 2,
    title: "Café & Bakery Kitchens",
    description: "Specialized layouts and baking equipment for cafes, bakeries, and patisseries.",
    image: "https://elina.frappe.cloud/files/Indian-themed-bakery.png",
    process: ["Space Assessment", "Equipment Selection", "Utility Mapping", "Commissioning"],
  },
  {
    id: 3,
    title: "Catering Kitchens",
    description: "Mobile and high-capacity setups designed for off-site catering services.",
    image: "https://elina.frappe.cloud/files/bulk-cooking-kitchen.png",
    process: ["Requirement Analysis", "Custom Fabrication", "Mobility Planning", "Deployment"],
  },
  {
    id: 4,
    title: "Cloud Kitchens / Ghost Kitchens",
    description: "Compact, delivery-optimized kitchens for virtual brands and multi-brand setups.",
    image: "https://elina.frappe.cloud/files/cloud.png",
    process: ["Workflow Optimization", "Multi-brand Integration", "Ventilation & Safety", "Setup & Launch"],
  },
  {
    id: 5,
    title: "Institutional Kitchens",
    description: "Mass-meal production kitchens for schools, colleges, hospitals, and hostels.",
    image: "https://elina.frappe.cloud/files/inst.png",
    process: ["Capacity Planning", "Industrial Equipment Setup", "Hygiene Compliance", "Staff Training"],
  },
  {
    id: 6,
    title: "Central Commissary Kitchens",
    description: "Large-scale centralized kitchens for multi-outlet food production and distribution.",
    image: "https://elina.frappe.cloud/files/centralcommissaryk.png",
    process: ["Production Flow Design", "Bulk Equipment Installation", "Cold Storage Integration", "Automation"],
  },
  /*
  {
    id: 7,
    title: "R&D Kitchens",
    description: "Custom-built kitchens for testing, food innovation, and product development.",
    image: "https://elina.frappe.cloud/600x400.png",
    process: ["Requirement Gathering", "Specialized Equipment", "Prototype Setup", "Iteration Support"],
  },*/
]


  const customizationOptions = [
    {
      title: "Size & Dimensions",
      description: "Equipment sized to fit your exact space requirements",
      icon: "📏",
    },
    {
      title: "Material Selection",
      description: "Choose from various grades of stainless steel and finishes",
      icon: "🔧",
    },
    {
      title: "Feature Integration",
      description: "Add specific features and functionalities as needed",
      icon: "⚙️",
    },
    {
      title: "Smart Technology Integration",
      description: "Incorporate IoT, automation, and energy-efficient systems",
      icon: "📡",
    },
  ]

  return (
    <main className="min-h-screen py-20 page-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16 fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Custom Kitchen Solutions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Tailored kitchen equipment and complete solutions designed specifically for your unique requirements and
            space constraints
          </p>
        </div>

        {/* Custom Solutions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {customSolutions.map((solution, index) => (
            <div
              key={solution.id}
              className="modern-card overflow-hidden fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative h-48 w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                <Image src={solution.image || "/placeholder.svg"} alt={solution.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">{solution.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{solution.description}</p>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Our Process:</h4>
                  {solution.process.map((step, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <span className="w-6 h-6 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                        {idx + 1}
                      </span>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Customization Options */}
        <div className="glass-card p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Customization Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {customizationOptions.map((option, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{option.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{option.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{option.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="section-background rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Our Custom Design Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Consultation</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We discuss your needs, space, and requirements in detail
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Design</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our engineers create detailed designs and 3D renderings
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Manufacturing</h3>
              <p className="text-gray-600 dark:text-gray-400">Precision manufacturing using high-quality materials</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Installation</h3>
              <p className="text-gray-600 dark:text-gray-400">Professional installation and testing at your location</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="glass-card p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Ready to Create Your Custom Solution?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's discuss your unique requirements and create the perfect kitchen solution for your business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="btn-modern-primary">
                <Link href="/contact">Start Your Project</Link>
              </Button>
              <Button size="lg" className="btn-modern-outline">
                <Link href="/gallery">View Our Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
