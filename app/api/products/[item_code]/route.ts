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

    const response = await fetch(`${API_URL}/resource/Item/${item_code}`, {
      method: "GET",
      headers: AUTH_HEADER,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json({
      data: data.data,
    })
  } catch (error: any) {
    return NextResponse.json({ error: `Failed to fetch product: ${error.message}` }, { status: 500 })
  }
}
