// Products data
export const products = [
  {
    id: 1,
    name: "Commercial Range Cookers",
    slug: "commercial-range-cookers",
    description:
      "High-performance range cookers designed for commercial kitchens with durability and efficiency in mind.",
    image: "https://elina.frappe.cloud/files/product-1.png",
    category: "commercial",
  },
  {
    id: 2,
    name: "Stainless Steel Work Tables",
    slug: "stainless-steel-work-tables",
    description: "Premium quality stainless steel work tables with customizable configurations for any kitchen layout.",
    image: "https://elina.frappe.cloud/files/product-2.png",
    category: "commercial",
  },
  {
    id: 3,
    name: "Ventilation Systems",
    slug: "ventilation-systems",
    description: "Advanced kitchen ventilation systems that ensure a clean, safe, and comfortable working environment.",
    image: "https://elina.frappe.cloud/files/product-3.png",
    category: "commercial",
  },
  {
    id: 4,
    name: "Refrigeration Units",
    slug: "refrigeration-units",
    description: "Energy-efficient refrigeration units designed for commercial kitchens with various capacity options.",
    image: "https://placehold.co/600x400.png",
    category: "commercial",
  },
  {
    id: 5,
    name: "Modular Kitchen Systems",
    slug: "modular-kitchen-systems",
    description: "Customizable modular kitchen systems for residential spaces with modern design and functionality.",
    image: "https://placehold.co/600x400.png",
    category: "residential",
  },
  {
    id: 6,
    name: "Kitchen Islands",
    slug: "kitchen-islands",
    description: "Versatile kitchen islands that provide additional workspace and storage for any kitchen layout.",
    image: "https://placehold.co/600x400.png",
    category: "residential",
  },
]

// Features data
export const features = [
  {
    id: 1,
    title: "Premium Quality Materials",
    description: "We use only the highest quality materials to ensure durability and longevity of all our products.",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-red-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Customized Solutions",
    description: "We offer tailored kitchen equipment solutions to meet the specific needs of your business or home.",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-red-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Energy Efficient",
    description: "Our equipment is designed to minimize energy consumption while maximizing performance.",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-red-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Nationwide Service",
    description:
      "We provide installation and maintenance services across India to ensure your equipment performs optimally.",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-red-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Warranty & Support",
    description: "All our products come with comprehensive warranty and dedicated customer support.",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-red-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Innovative Design",
    description: "We continuously innovate to bring you the latest advancements in kitchen equipment technology.",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-red-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
]

// Testimonials data
export const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    position: "Executive Chef, Grand Hotel Bangalore",
    text: "The commercial kitchen equipment from Syena has transformed our kitchen operations. The quality and durability are exceptional, and their after-sales service is prompt and reliable.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    position: "Owner, Spice Route Restaurant",
    text: "We've been using Syena's equipment for over two years now, and I'm impressed with how well they've held up despite our busy kitchen. Their customized solutions perfectly fit our space constraints.",
  },
  {
    id: 3,
    name: "Vikram Mehta",
    position: "Facility Manager, Corporate Cafeteria",
    text: "The energy efficiency of Syena's equipment has significantly reduced our operational costs. Their team was professional during installation and provided excellent training to our staff.",
  },
]

// Gallery items data
export const galleryItems = [
  {
    id: 1,
    title: "Commercial Kitchen Setup",
    description: "Complete kitchen setup for a 5-star hotel in Bangalore",
    category: "commercial",
    image: "/images/gallery/commercial-1.jpg",
  },
  {
    id: 2,
    title: "Restaurant Kitchen Installation",
    description: "Modern kitchen installation for a fine dining restaurant",
    category: "commercial",
    image: "/images/gallery/commercial-2.jpg",
  },
  {
    id: 3,
    title: "Luxury Home Kitchen",
    description: "Custom kitchen design for a luxury residence",
    category: "residential",
    image: "/images/gallery/residential-1.jpg",
  },
  {
    id: 4,
    title: "Apartment Kitchen Renovation",
    description: "Complete renovation of an apartment kitchen",
    category: "residential",
    image: "/images/gallery/residential-2.jpg",
  },
  {
    id: 5,
    title: "Commercial Range Cookers",
    description: "High-performance range cookers for commercial use",
    category: "equipment",
    image: "/images/gallery/equipment-1.jpg",
  },
  {
    id: 6,
    title: "Stainless Steel Work Tables",
    description: "Custom stainless steel work tables for professional kitchens",
    category: "equipment",
    image: "/images/gallery/equipment-2.jpg",
  },
  {
    id: 7,
    title: "Hotel Buffet Setup",
    description: "Complete buffet line setup for a hotel restaurant",
    category: "commercial",
    image: "/images/gallery/commercial-3.jpg",
  },
  {
    id: 8,
    title: "Modern Home Kitchen",
    description: "Contemporary kitchen design for a modern home",
    category: "residential",
    image: "/images/gallery/residential-3.jpg",
  },
  {
    id: 9,
    title: "Ventilation Systems",
    description: "Advanced kitchen ventilation systems for commercial use",
    category: "equipment",
    image: "/images/gallery/equipment-3.jpg",
  },
]

// Update the team members data
export const teamMembers = [
  {
    id: 1,
    name: "Jyothish Antony",
    position: "Director",
    bio: "Jyothish brings over 15 years of leadership experience in manufacturing and corporate governance. As Director, he drives strategic direction and ensures compliance across all operations.",
    image: "https://placehold.co/400x400.png",
  },
  {
    id: 2,
    name: "P Jagadeesh Kumar",
    position: "Chief Executive Officer",
    bio: "P Jagadeesh Kumar is a seasoned executive with a strong background in glass and crockery manufacturing. He leads Syena's vision for growth, focusing on innovation and market expansion.",
    image: "https://placehold.co/400x400.png",
  },
  {
    id: 3,
    name: "Sunit Jagadeesh",
    position: "Chief Operating Officer",
    bio: "Sunit oversees daily operations at Syena, optimizing processes and coordinating cross-functional teams to ensure timely delivery and top-quality products.",
    image: "https://placehold.co/400x400.png",
  },
  {
    id: 4,
    name: "Sneha Jagadeesh",
    position: "Director",
    bio: "Sneha Jagadeesh brings extensive expertise in corporate strategy and stakeholder engagement. As Director, she focuses on driving business development and fostering key partnerships.",
    image: "https://placehold.co/400x400.png",
  },
]

// Add company contact information
export const companyInfo = {
  name: "Syena Kitchenconceptz Manufacturing Pvt. Ltd.",
  address: {
    line1: "Ground Floor, 108, 7th Mile Hosur Rd, Chikka Begur,",
    line2: "Industrial Layout, Garvebhavi Palya,",
    city: "Bengaluru",
    state: "Karnataka",
    zip: "560068",
    country: "India",
  },
  phone: {
    main: "+91 80 1234 5678",
    sales: "+91 98765 43210",
  },
  email: {
    info: "info@elina.so",
    sales: "sales@elina.so",
  },
  hours: {
    weekdays: "Monday - Saturday: 9:30 AM - 6:30 PM",
    weekend: "Sunday: Closed",
  },
  social: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
}
