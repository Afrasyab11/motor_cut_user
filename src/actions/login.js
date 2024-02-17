'use server';
// import * as z from "zod";
import { LoginSchema } from "@/schemas";

export const login = async (values) => {
    const validatedFields = LoginSchema.safeParse(values);
    if(!validatedFields.success)
    {
        return {
            error:"Invalid Fields!"
        };
    }
    
    return {success: "Email Sent"}
}