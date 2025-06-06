import { type NextRequest, NextResponse } from "next/server"

const API_URL = process.env.API_URL!
const API_KEY = process.env.API_KEY!
const API_SECRET = process.env.API_SECRET!

const AUTH_HEADER = {
  Authorization: `token ${API_KEY}:${API_SECRET}`,
  "Content-Type": "application/json",
}

export async function GET(request: NextRequest, { params }: { params: { name: string } }) {
  try {
    const attributeName = decodeURIComponent(params.name)

    const response = await fetch(
      `${API_URL}/resource/Item%20Attribute/${encodeURIComponent(attributeName)}?fields=["attribute_name","numeric_values","from_range","to_range","increment","item_attribute_values"]`,
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
      data: data.data || null,
    })
  } catch (error: any) {
    return NextResponse.json({ error: `Failed to fetch attribute details: ${error.message}` }, { status: 500 })
  }
}
