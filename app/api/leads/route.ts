import { type NextRequest, NextResponse } from "next/server"

const API_URL = process.env.API_URL!
const API_KEY = process.env.API_KEY!
const API_SECRET = process.env.API_SECRET!

const AUTH_HEADER = {
  Authorization: `token ${API_KEY}:${API_SECRET}`,
  "Content-Type": "application/json",
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const response = await fetch(`${API_URL}/resource/Lead`, {
      method: "POST",
      headers: AUTH_HEADER,
      body: JSON.stringify(body),
    })

    const data = await response.json()

    // Handle duplicate entries
    const duplicate =
      response.status === 409 ||
      data?.exc_type === "DuplicateEntryError" ||
      String(data?._server_messages).includes("DuplicateEntryError")

    if (duplicate) {
      return NextResponse.json({
        success: true,
        message:
          "Looks like you've already submitted a request with this e-mail address. We'll get back to you shortly!",
      })
    }

    if (!response.ok) {
      throw new Error(data?.message || response.statusText)
    }

    return NextResponse.json({
      success: true,
      message: "Your request has been submitted! We'll get back to you soon.",
      data: data.data,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: `Submission failed: ${error.message}`,
      },
      { status: 500 },
    )
  }
}
