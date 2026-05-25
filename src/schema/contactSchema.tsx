import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .regex(/^[A-Za-z\s.'-]+$/, "Name must contain letters only"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  contactNumber: z
    .string()
    .trim()
    .min(1, "Contact number is required")
    .regex(
      /^\+63\s9\d{2}-\d{3}-\d{4}$/,
      "Contact number must be in this format: +63 923-359-3143"
    ),

  message: z
    .string()
    .trim()
    .min(1, "Message is required"),
});

export type ContactFormData = z.infer<typeof contactSchema>;