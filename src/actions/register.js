"use server";
// import * as z from "zod";
import { RegisterSchema } from "@/schemas";

export const Register = async (values) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid Fields!",
    };
  }
  return { success: "Fields Validates Success" };
};
