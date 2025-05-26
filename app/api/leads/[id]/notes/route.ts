import { type NextRequest, NextResponse } from "next/server"

const API_URL = process.env.API_URL!
const API_KEY = process.env.API_KEY!
const API_SECRET = process.env.API_SECRET!

const AUTH_HEADER = {
  Authorization: `token ${API_KEY}:${API_SECRET}`,
  "Content-Type": "application/json",
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()

    const response = await fetch(`${API_URL}/resource/Lead/${id}`, {
      method: "PUT",
      headers: AUTH_HEADER,
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData?.message || response.statusText)
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      data: data.data,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: `Failed to update lead: ${error.message}`,
      },
      { status: 500 },
    )
  }
}
