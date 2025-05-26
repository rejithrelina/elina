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
    const response = await fetch(`${API_URL}/resource/Country?fields=["country_name"]&limit=500`, {
      method: "GET",
      headers: AUTH_HEADER,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    const allCountries = (data.data || []).map((c: any) => c.country_name)

    return NextResponse.json({
      data: allCountries,
    })
  } catch (error: any) {
    return NextResponse.json({ error: `Failed to fetch countries: ${error.message}` }, { status: 500 })
  }
}
