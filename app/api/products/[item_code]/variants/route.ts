import { type NextRequest, NextResponse } from "next/server"

const API_URL = process.env.API_URL!
const API_KEY = process.env.API_KEY!
const API_SECRET = process.env.API_SECRET!

const AUTH_HEADER = {
  Authorization: `token ${API_KEY}:${API_SECRET}`,
  "Content-Type": "application/json",
}

export async function GET(request: NextRequest, { params }: { params: { item_code: string } }) {
  try {
    const { item_code } = params

    // Get total count of variants
    const countResponse = await fetch(
      `${API_URL}/method/frappe.client.get_count?doctype=Item&filters=${encodeURIComponent(
        JSON.stringify([["variant_of", "=", item_code]]),
      )}`,
      {
        method: "GET",
        headers: AUTH_HEADER,
      },
    )

    let totalVariants = 0
    if (countResponse.ok) {
      const countData = await countResponse.json()
      totalVariants = countData.message || 0
    }

    // Fetch all variants
    const response = await fetch(
      `${API_URL}/resource/Item?fields=["item_code","item_name","item_group","description","stock_uom","standard_rate","image","brand"]&filters=${encodeURIComponent(
        JSON.stringify([["variant_of", "=", item_code]]),
      )}&limit_page_length=1000`,
      {
        method: "GET",
        headers: AUTH_HEADER,
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json({
      data: data.data || [],
      totalVariants,
    })
  } catch (error: any) {
    return NextResponse.json({ error: `Failed to fetch variants: ${error.message}` }, { status: 500 })
  }
}
