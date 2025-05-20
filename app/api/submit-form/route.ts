import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Define the form schema for validation
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(1, "Mobile number is required"),
  organization: z.string().optional(),
  requestType: z.string().min(1, "Request type is required"),
  source: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()

    // Validate the data
    const validatedData = formSchema.parse(body)

    // Prepare data for ERPNext API
    const payload = {
      first_name: validatedData.firstName,
      last_name: validatedData.lastName || "",
      source: validatedData.source || "Website",
      request_type: validatedData.requestType,
      email_id: validatedData.email,
      mobile_no: validatedData.mobile,
      company_name: validatedData.organization || "",
    }

    // Send data to ERPNext API - credentials are now secure on the server
    const response = await fetch(`${process.env.API_URL}/resource/Lead`, {
      method: "POST",
      headers: {
        Authorization: `token ${process.env.API_KEY}:${process.env.API_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { success: false, message: errorData?.message || "Failed to submit form" },
        { status: response.status },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Your request has been submitted! We'll get back to you soon.",
    })
  } catch (error) {
    console.error("Form submission error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Validation error. Please check your inputs.", errors: error.errors },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { success: false, message: "There was an error submitting your form. Please try again later." },
      { status: 500 },
    )
  }
}
