"use server"

import { z } from "zod"

// Define the form schema for validation
const quoteFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(1, "Mobile number is required"),
  organization: z.string().optional(),
  requestType: z.string().min(1, "Request type is required"),
  source: z.string().optional().default("Website"),
})

export async function submitQuoteRequest(formData: FormData) {
  try {
    // Extract form data
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: (formData.get("lastName") as string) || "",
      email: formData.get("email") as string,
      mobile: formData.get("mobile") as string,
      organization: (formData.get("organization") as string) || "",
      requestType: formData.get("requestType") as string,
      source: (formData.get("source") as string) || "Website",
    }

    // Validate form data
    const validatedData = quoteFormSchema.parse(data)

    // Prepare data for ERPNext webhook
    const payload = {
      first_name: validatedData.firstName,
      last_name: validatedData.lastName,
      source: validatedData.source,
      request_type: validatedData.requestType,
      email_id: validatedData.email,
      mobile_no: validatedData.mobile,
      company_name: validatedData.organization,
    }

    // Send data to ERPNext - Authorization is now handled server-side
    const response = await fetch("https://elina.frappe.cloud/api/resource/Lead", {
      method: "POST",
      headers: {
        Authorization: `token 9403214475f834f:df3e2e8bfee05db`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData?.message || response.statusText)
    }

    return {
      success: true,
      message: "Your request has been submitted! We'll get back to you soon.",
    }
  } catch (error) {
    console.error("Form submission error:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation error. Please check your inputs.",
        errors: error.errors,
      }
    }

    return {
      success: false,
      message: "There was an error submitting your form. Please try again later.",
    }
  }
}
