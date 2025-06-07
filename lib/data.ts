import { CheckCircle, Settings, Zap, Globe, Shield, Lightbulb, type LucideIcon } from "lucide-react"

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

// Features data with Lucide icons
export interface Feature {
  id: number
  title: string
  description: string
  icon: LucideIcon
}

export const features: Feature[] = [
  {
    id: 1,
    title: "Premium Quality Materials",
    description: "We use only the highest quality materials to ensure durability and longevity of all our products.",
    icon: CheckCircle,
  },
  {
    id: 2,
    title: "Customized Solutions",
    description: "We offer tailored kitchen equipment solutions to meet the specific needs of your business or home.",
    icon: Settings,
  },
  {
    id: 3,
    title: "Energy Efficient",
    description: "Our equipment is designed to minimize energy consumption while maximizing performance.",
    icon: Zap,
  },
  {
    id: 4,
    title: "Nationwide Service",
    description:
      "We provide installation and maintenance services across India to ensure your equipment performs optimally.",
    icon: Globe,
  },
  {
    id: 5,
    title: "Warranty & Support",
    description: "All our products come with comprehensive warranty and dedicated customer support.",
    icon: Shield,
  },
  {
    id: 6,
    title: "Innovative Design",
    description: "We continuously innovate to bring you the latest advancements in kitchen equipment technology.",
    icon: Lightbulb,
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
    name: "P Jagadeesh Kumar",
    position: "Chief Executive Officer",
    bio: "P Jagadeesh Kumar is a seasoned executive with a strong background in glass and crockery trading industry. He leads Syena's vision for growth, focusing on innovation and market expansion.",
    image: "https://elina.frappe.cloud/files/Jagadeesh-Kumar.png",
  },
  {
    id: 2,
    name: "Sneha Jagadeesh",
    position: "Director",
    bio: "Sneha Jagadeesh brings extensive expertise in corporate strategy and stakeholder engagement. As Director, she focuses on driving business development and fostering key partnerships.",
    image: "https://elina.frappe.cloud/files/Sneha-Jagadeesh.png",
  },
    {
    id: 3,
    name: "Jyothish Antony",
    position: "Director",
    bio: "Jyothish brings over 15 years of leadership experience in manufacturing and corporate governance. As Director, he drives strategic direction and ensures compliance across all operations.",
    image: "https://elina.frappe.cloud/files/Jyothish-Antony.png",
  },
  {
    id: 4,
    name: "Sunit Jagadeesh",
    position: "Chief Operating Officer",
    bio: "Sunit oversees daily operations at Syena, optimizing processes and coordinating cross-functional teams to ensure timely delivery and top-quality products.",
    image: "https://elina.frappe.cloud/files/Sunit-Jagadeesh.png",
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
    main: "+91 80 4178 4630",
    sales: "+91 98454 47744",
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
    facebook: "https://www.facebook.com/elina.so.official/",
    twitter: "https://twitter.com",
    instagram: "https://www.instagram.com/elina.soblr/",
    linkedin: "https://www.linkedin.com/company/elina-so/",
    youtube: "",
  },
}
