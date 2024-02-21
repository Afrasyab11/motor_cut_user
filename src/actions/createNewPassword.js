import { NewPasswordSchema } from "@/schemas";

export const createNewPassword = async (values) => {
  // let validatedFields = false;
  // if (values.password === values.confirmPassword) {
  //   validatedFields = true;
  // }
  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields) {
    return {
      error: "Password Do not match!",
    };
  }

  return { success: "Fields Validated Success" };
};
 