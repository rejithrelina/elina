import { type NextRequest, NextResponse } from "next/server"

const API_URL = process.env.API_URL!
const API_KEY = process.env.API_KEY!
const API_SECRET = process.env.API_SECRET!

const AUTH_HEADER = {
  Authorization: `token ${API_KEY}:${API_SECRET}`,
  "Content-Type": "application/json",
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const withImages = searchParams.get("withImages") === "true"
    const search = searchParams.get("search") || ""
    const brand = searchParams.get("brand") || ""

    // Build filters
    const filters: any[] = [["has_variants", "!=", "0"]]

    if (withImages) {
      filters.push(["image", "!=", ""])
    }

    if (search.trim()) {
      filters.push(["item_name", "like", `%${search.trim()}%`])
    }

    if (brand) {
      filters.push(["brand", "=", brand])
    }

    // Get total count
    let countUrl = `${API_URL}/method/frappe.client.get_count?doctype=Item`
    if (filters.length > 0) {
      countUrl += `&filters=${encodeURIComponent(JSON.stringify(filters))}`
    }

    const countResponse = await fetch(countUrl, {
      method: "GET",
      headers: AUTH_HEADER,
    })

    const countData = await countResponse.json()
    const totalItems = countData.message || 0

    // Get products
    const limitStart = (page - 1) * limit
    let productsUrl = `${API_URL}/resource/Item?fields=["item_code","item_name","item_group","description","stock_uom","has_variants","image","variant_based_on","brand"]&limit_start=${limitStart}&limit_page_length=${limit}`

    if (filters.length > 0) {
      productsUrl += `&filters=${encodeURIComponent(JSON.stringify(filters))}`
    }

    const productsResponse = await fetch(productsUrl, {
      method: "GET",
      headers: AUTH_HEADER,
    })

    if (!productsResponse.ok) {
      throw new Error(`HTTP error! status: ${productsResponse.status}`)
    }

    const productsData = await productsResponse.json()

    return NextResponse.json({
      data: productsData.data || [],
      totalItems,
      page,
      limit,
      totalPages: Math.ceil(totalItems / limit),
    })
  } catch (error: any) {
    return NextResponse.json({ error: `Failed to fetch products: ${error.message}` }, { status: 500 })
  }
}
