// Import necessary modules and libraries
import { FillProfilePageSchema } from "@/schemas";

export const FillProfilePageAction = async (values) => {

  try {
    const validatedFields = FillProfilePageSchema.parse(values);


    return { success: "Fields Validated Successfully" };
  } catch (error) {
    console.error(error.errors); 
    return {
      error: "Invalid Fields!",
    };
  }
};
