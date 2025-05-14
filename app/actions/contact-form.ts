"use server"

import { z } from "zod"

// Define the form schema for validation
const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
})

export async function submitContactForm(formData: FormData) {
  try {
    // Extract form data
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    // Validate form data
    const validatedData = contactFormSchema.parse(data)

    // Prepare data for ERPNext webhook
    const webhookData = {
      doctype: "Lead",
      lead_name: `${validatedData.firstName} ${validatedData.lastName}`,
      email_id: validatedData.email,
      phone: validatedData.phone || "",
      source: "Website",
      notes: [
        {
          note: `Subject: ${validatedData.subject}\n\nMessage: ${validatedData.message}`,
          note_type: "Customer",
        },
      ],
    }

    // Send data to ERPNext webhook
    const response = await fetch("https://elina.frappe.cloud/app/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(webhookData),
    })

    if (!response.ok) {
      throw new Error(`Error submitting form: ${response.statusText}`)
    }

    return { success: true, message: "Your message has been sent successfully!" }
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
