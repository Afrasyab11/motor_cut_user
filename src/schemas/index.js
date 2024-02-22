// const z = require("zod");
import * as z from "zod";

const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Password is required",
  }),
});

const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  mobileNumber: z.string().min(10, {
    message: "Mobile Number is required",
  }),
});

const CreatePasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be atleast 6 chracters",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password must be atleast 6 chracters",
  }),
});

// This schema is for Forgot Password.
const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});


const VerifyNumberSchema = z.object({
  verifyCode: z.string().length(1, {
    message: "Verification code is required",
  }),
  verifyCode1: z.string().length(1, {
    message: "Verification code is required",
  }),
  verifyCode2: z.string().length(1, {
    message: "Verification code is required",
  }),
  verifyCode3: z.string().length(1, {
    message: "Verification code is required",
  }),
});


const FillProfilePageSchema = z.object({
  fullName: z.string()
  .min(1, { message: "Full Name is required" })
  .regex(/^[a-zA-Z0-9 ]*$/, { message: "Full Name must only contain alphanumeric characters and spaces" }),
  companyName: z.string().min(1, {
    message: "Company Name is required",
  }),
  address: z.string().min(1, {
    message: "Address is required",
  }),
  postalCode: z.string().min(1, {
    message: "Postal/Zip code is required",
  }),
  country: z.string().min(1, {
    message: "Country is required",
  }),
});

const VerifyPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  otp:z.string().min(0, {
    message:"OTP is required",
  }),
  password:z.string().min(0, {
    message:"Password is required",
  }),

});


const NewPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password:z.string().min(0, {
    message:"Password is required",
  }),
});

module.exports = {
  LoginSchema,
  RegisterSchema,
  CreatePasswordSchema,
  VerifyNumberSchema,
  FillProfilePageSchema,
  ForgotPasswordSchema,
  VerifyPasswordSchema,
  NewPasswordSchema,
  
};
