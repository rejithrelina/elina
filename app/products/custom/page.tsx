import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function CustomProjectsPage() {
  return (
    <main className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://placehold.co/1920x1080.png"
            alt="Custom Kitchen Projects"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Custom Kitchen Projects</h1>
            <p className="text-lg md:text-xl">
              Tailored kitchen solutions designed specifically for your unique requirements
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Customized Kitchen Solutions</h2>
              <p className="text-lg text-gray-700 mb-6">
                At Syena Kitchenconceptz, we understand that every kitchen has unique requirements. Our custom kitchen
                projects are designed to address your specific needs, space constraints, and operational demands.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Whether you're setting up a restaurant kitchen, hotel catering facility, or a specialized food
                production area, our team of experts will work closely with you to create a kitchen that maximizes
                efficiency, productivity, and workflow.
              </p>
              <p className="text-lg text-gray-700">
                From initial concept to final installation, we handle every aspect of your custom kitchen project with
                meticulous attention to detail and commitment to excellence.
              </p>
            </div>
            <div className="lg:w-1/2 relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://placehold.co/800x600.png"
                alt="Custom Kitchen Project"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our Custom Project Process</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach to creating your perfect kitchen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <div key={step.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-red-600">{step.id}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Featured Custom Projects</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Explore some of our recent custom kitchen installations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative h-64 w-full">
                  <Image src={project.image || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.name}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">View Project Details</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Why Choose Us for Your Custom Project</h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                      <p className="text-gray-700">{benefit.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2 relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
              <Image src="https://placehold.co/800x600.png" alt="Custom Kitchen Design" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Custom Kitchen Project?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact us today to schedule a consultation with our design team and take the first step towards your
            perfect kitchen.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
              <Link href="/contact">Schedule a Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              <Link href="/gallery">View Our Gallery</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

// Process Steps Data
const processSteps = [
  {
    id: 1,
    title: "Consultation",
    description:
      "We begin with a detailed consultation to understand your requirements, space constraints, and operational needs.",
  },
  {
    id: 2,
    title: "Design",
    description:
      "Our design team creates custom layouts and 3D renderings to visualize your kitchen before production begins.",
  },
  {
    id: 3,
    title: "Manufacturing",
    description:
      "We manufacture all components in our state-of-the-art facility, ensuring the highest quality standards.",
  },
  {
    id: 4,
    title: "Installation",
    description:
      "Our experienced team handles the complete installation, ensuring everything works perfectly from day one.",
  },
]

// Featured Projects Data
const featuredProjects = [
  {
    id: 1,
    name: "5-Star Hotel Kitchen",
    description:
      "Complete kitchen setup for a luxury hotel in Bangalore, designed to handle multiple dining outlets simultaneously.",
    image: "https://placehold.co/600x400.png",
  },
  {
    id: 2,
    name: "Cloud Kitchen Facility",
    description:
      "Optimized kitchen layout for a multi-brand cloud kitchen operation, maximizing efficiency in a compact space.",
    image: "https://placehold.co/600x400.png",
  },
  {
    id: 3,
    name: "Restaurant Chain Standardization",
    description: "Standardized kitchen design implemented across multiple locations for a growing restaurant chain.",
    image: "https://placehold.co/600x400.png",
  },
]

// Benefits Data
const benefits = [
  {
    title: "Expertise & Experience",
    description:
      "Our team brings years of experience in designing and implementing custom kitchen projects across various industries.",
  },
  {
    title: "End-to-End Solution",
    description:
      "From initial concept to final installation, we handle every aspect of your project with meticulous attention to detail.",
  },
  {
    title: "Quality Craftsmanship",
    description:
      "All our custom projects feature the same premium materials and craftsmanship that define our standard product line.",
  },
  {
    title: "Compliance & Safety",
    description:
      "We ensure all custom installations meet or exceed industry standards for safety, hygiene, and operational efficiency.",
  },
  {
    title: "Ongoing Support",
    description:
      "Our relationship doesn't end with installation. We provide comprehensive after-sales support for all custom projects.",
  },
]
