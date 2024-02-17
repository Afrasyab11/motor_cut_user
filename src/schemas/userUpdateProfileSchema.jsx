import { z } from "zod";

export const userProfileSchema = z.object({
  fullName: z
    .string()
    .min(1, { message: "Full Name is required" })
    .regex(/^[A-Za-z\s]+$/, "Full Name must only contain letters"),
  companyName: z.string().min(1, { message: "Company Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" }),
  mobileNumber: z
    .string()
    .min(1, { message: "Mobile number is required" })
    .regex(/^\d+$/, { message: "Mobile number must be numeric" })
    .min(10, { message: "Mobile number minimum should be 10 digits" }),
  // Address: z.string().min(1, { message: "Address is required" }),
  postalCode: z.string().min(1, { message: "Zip Code is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  billingEmail: z
    .string()
    .min(1, { message: "Billing Email is required" })
    .email({ message: "Invalid Billing email format" }),
  billingLine1: z.string().min(1, { message: "Billing Line1 is required" }),
  billingLine2: z.string().min(1, { message: "Billing Line2 is required" }),
});
