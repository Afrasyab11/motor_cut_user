import { VerifyNumberSchema } from "@/schemas";

export const VerifyNumberAction = async (values) => {
  try {
    const validatedFields = VerifyNumberSchema.parse(values);

    return { success: "Verification Successful" };
  } catch (error) {
    console.error(error.errors);
    return {
      error: "Invalid Verification Code!",
    };
  }
};
