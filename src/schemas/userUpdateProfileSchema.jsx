import { z } from "zod";

export const userProfileSchema = z.object({
  fullName: z
    .string()
    .min(1, { message: "Full Name is required" })
    .regex(
      /^[a-zA-Z0-9 !@#$%^&*()_+{}\[\]:;<>,.?~\\/-]*[a-zA-Z][a-zA-Z0-9 !@#$%^&*()_+{}\[\]:;<>,.?~\\/-]*$/,
      {
        message:
          "Full Name must contain at least letter and can include alphanumeric characters",
      }
    ),
  companyName: z.string().min(1, { message: "Company Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" }),
  mobileNumber: z.string().min(4, { message: "Mobile number is required" }),
  // Address: z.string().min(1, { message: "Address is required" }),
  postalCode: z.string().min(1, { message: "Zip Code is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  billingEmail: z
    .string()
    .min(1, { message: "Billing Email is required" })
    .email({ message: "Invalid Billing email format" }),
  billingLine1: z.string().nullable(),
  billingLine2: z.string().nullable(),
});
