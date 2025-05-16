import type { Feature } from "@/lib/data"

interface FeatureCardProps {
  feature: Feature
}

export default function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = feature.icon

  return (
    <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-red-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
      <p className="text-gray-600">{feature.description}</p>
    </div>
  )
}
