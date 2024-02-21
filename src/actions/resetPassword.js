"use server";
// import * as z from "zod";
import { ForgotPasswordSchema } from "@/schemas";

export const resetPassword = async (values) => {
  const validatedFields = ForgotPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid Fields!",
    };
  }
  return { success: "OTP sent to your register email" };
};
