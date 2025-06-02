"use client"

import { useState } from "react"
import { Share2, Facebook, Twitter, Linkedin, Link2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SocialShareProps {
  url: string
  title: string
  description?: string
}

export default function SocialShare({ url, title, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== "undefined" ? window.location.origin + url : url
  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description || "")

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const openShareWindow = (url: string) => {
    window.open(url, "_blank", "width=600,height=400,scrollbars=yes,resizable=yes")
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Share2 className="h-4 w-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-900">Share this product</span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => openShareWindow(shareLinks.facebook)}
          className="p-2 border-gray-300 hover:bg-blue-50"
          title="Share on Facebook"
        >
          <Facebook className="h-4 w-4 text-blue-600" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => openShareWindow(shareLinks.twitter)}
          className="p-2 border-gray-300 hover:bg-sky-50"
          title="Share on Twitter"
        >
          <Twitter className="h-4 w-4 text-sky-500" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => openShareWindow(shareLinks.linkedin)}
          className="p-2 border-gray-300 hover:bg-blue-50"
          title="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4 text-blue-700" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          className="p-2 border-gray-300 hover:bg-gray-50"
          title="Copy link"
        >
          {copied ? <Check className="h-4 w-4 text-green-600" /> : <Link2 className="h-4 w-4 text-gray-600" />}
        </Button>
      </div>

      {copied && <p className="text-xs text-green-600 mt-2">Link copied to clipboard!</p>}
    </div>
  )
}
