import { CreatePasswordSchema } from "@/schemas";

export const CreatePasswordAction = async (values) => {
  let validatedFields = false;
  if (values.password === values.confirmPassword) {
    validatedFields = true;
  }

  if (!validatedFields) {
    return {
      error: "Password Do not match!",
    };
  }

  return { success: "Fields Validated Success" };
};
 