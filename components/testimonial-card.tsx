export default function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-gray-800 dark:bg-gray-900 p-6 rounded-lg border border-gray-700">
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-gray-300 dark:text-gray-400 mb-4">"{testimonial.text}"</p>
      <div>
        <p className="font-semibold text-white">{testimonial.name}</p>
        <p className="text-gray-400 text-sm">{testimonial.position}</p>
      </div>
    </div>
  )
}
