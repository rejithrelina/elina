import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://elina.frappe.cloud/files/about-hero.png"
            alt="About Syena Kitchenconceptz"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
            <p className="text-lg md:text-xl">
              Learn about our journey, mission, and commitment to excellence in kitchen equipment manufacturing
            </p>
          </div>
        </div>
      </section>
      {/* Company Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/3">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
              <p className="text-lg text-gray-700 mb-6">
                Founded in 2018, Syena Kitchenconceptz Manufacturing Private Limited began with a vision to
                revolutionize the kitchen equipment industry in India. What started as a small workshop has now grown
                into a state-of-the-art manufacturing facility.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our journey has been marked by continuous innovation, unwavering commitment to quality, and a deep
                understanding of the evolving needs of commercial and residential kitchens.
              </p>
              <p className="text-lg text-gray-700">
                Today, we are proud to be recognized as one of the leading manufacturers of premium kitchen equipment,
                serving clients across India and beyond.
              </p>
            </div>
            <div className="lg:w-1/2 relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://bgc.in/media/cutout-legacy.png"
                alt="Syena Kitchenconceptz History"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our Mission & Vision</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Guided by our core values and commitment to excellence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 mb-6">
                To design and manufacture innovative, high-quality kitchen equipment that enhances efficiency, safety,
                and aesthetics in commercial and residential kitchens.
              </p>
              <p className="text-gray-700">
                We are committed to exceeding customer expectations through exceptional service, sustainable practices,
                and continuous improvement in all aspects of our business.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 mb-6">
                To be the most trusted and preferred kitchen equipment manufacturer in India, recognized for our
                innovation, quality, and customer-centric approach.
              </p>
              <p className="text-gray-700">
                We aspire to set new standards in the industry and contribute to the advancement of kitchen technology
                while maintaining our commitment to sustainability and social responsibility.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our Leadership Team</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">Meet the experts behind our success</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center">
                <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden mb-6">
                  <Image src={member.image || "https://elina.frappe.cloud/files/placeholder.png"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-red-600 mb-4">{member.position}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Manufacturing Facility */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">State-of-the-Art Manufacturing</h2>
              <p className="text-lg text-gray-700 mb-6">
                Our manufacturing facility is equipped with the latest technology and machinery to ensure precision,
                efficiency, and quality in every product we create.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                We follow stringent quality control measures at every stage of production, from raw material selection
                to final assembly and testing.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our facility is designed to be environmentally friendly, with systems in place to minimize waste, reduce
                energy consumption, and promote sustainable manufacturing practices.
              </p>
              <Button className="bg-red-600 hover:bg-red-700 text-white">Schedule a Factory Visit</Button>
            </div>
            <div className="lg:w-1/2 relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://elina.frappe.cloud/files/manufacturing.png"
                alt="Syena Kitchenconceptz Manufacturing Facility"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Kitchen?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact us today to discuss your kitchen equipment needs and discover how Syena Kitchenconceptz can help you
            create the perfect kitchen solution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
              Request a Quote
            </Button>
            <Button size="lg" variant="outline" className="text-black border-white hover:bg-white/10">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
// Sample data
const teamMembers = [
  {
    id: 1,
    name: "Jyothish Antony",
    position: "Director",
    bio: "Jyothish brings over 15 years of leadership experience in manufacturing and corporate governance. As Director, he drives strategic direction and ensures compliance across all operations.",
    image: "https://elina.frappe.cloud/files/placeholder.png",
  },
  {
    id: 2,
    name: "P Jagadeesh Kumar",
    position: "Chief Executive Officer",
    bio: "P Jagadeesh Kumar is a seasoned executive with a strong background in glass and crockery manufacturing. He leads Syena’s vision for growth, focusing on innovation and market expansion.",
    image: "https://elina.frappe.cloud/files/placeholder.png",
  },
  {
    id: 3,
    name: "Sunit Jagadeesh",
    position: "Chief Operating Officer",
    bio: "Sunit oversees daily operations at Syena, optimizing processes and coordinating cross-functional teams to ensure timely delivery and top-quality products.",
    image: "https://elina.frappe.cloud/files/placeholder.png",
  },
  {
    id: 4,
    name: "Sneha Jagadeesh",
    position: "Director",
    bio: "Sneha Jagadeesh brings extensive expertise in corporate strategy and stakeholder engagement. As Director, she focuses on driving business development and fostering key partnerships.",
    image: "https://elina.frappe.cloud/files/placeholder.png",
  },
];
