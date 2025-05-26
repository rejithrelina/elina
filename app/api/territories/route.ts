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
    const response = await fetch(
      `${API_URL}/resource/Territory?fields=["territory_name","parent_territory"]&limit=100`,
      {
        method: "GET",
        headers: AUTH_HEADER,
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Filter territories
    const filtered = (data.data || [])
      .map((t: any) => t.territory_name)
      .filter((name: string) => name !== "All Territories" && !name.includes("Zone"))

    return NextResponse.json({
      data: filtered,
    })
  } catch (error: any) {
    return NextResponse.json({ error: `Failed to fetch territories: ${error.message}` }, { status: 500 })
  }
}
