"use client";
// import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { FormError } from "../form-error";
import { CardWrapper } from "../card-wrapper";
import { BackButton } from "../back-button";
import { CheckboxWithText } from "../checkbox-text";
import { login } from "@/actions/login";
import { FormSuccess } from "../form-success";
import { loginUser } from "@/store/user/userThunk";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner8 } from "react-icons/im";
import { toggleRememberMe } from "@/store/user/userSlice";

export const LoginForm = () => {
  const { isLoading, rememberMe } = useSelector((state) => state?.user);
  const router = useRouter();
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  let loader = isLoading || isPending;
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values).then((data) => {
        let loginPayload = {
          Email: values.email,
          Password: values.password,
          isAdmin: false,
        };
        dispatch(
          loginUser({
            loginPayload,
            onSuccess: () => {
              console.log("Login successful, proceeding to fetch first-time status...");
              router.push("/main/dashboard"); // Redirect to dashboard
            },
            onError: (msg) => {
              setError(msg);
              console.error("Login error message:", msg);
            },
          })
        );
      });
    });
  };
  
  

  return (
    <CardWrapper
      headerText="Log-In"
      headerPadding="p-7 pl-0 pt-3 pb-4 p-0"
      backButtonLabel="Don't Have an account?"
      backButtonHref="/auth/forgotpassword"
      btnText="Sign In with Google"
      currentPage="login"
      headerLogo
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-mutedFields">
                    Enter Your Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className=""
                      {...field}
                      placeholder="john.doe@example.com"
                      type="email"
                      disabled={loader}
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-mutedFields">
                    Enter Your Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      type="password"
                      disabled={loader}
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <BackButton
            className=""
            label="Forgot Password?"
            href="/auth/forgotpassword"
          />
          <div
            className="flex items-center gap-x-6"
            onClick={() => {
              dispatch(toggleRememberMe());
            }}
          >
            {" "}
            {/* Handle click event to toggle Remember Me */}
            <input
              type="checkbox"
              className="cursor-pointer"
              checked={rememberMe}
            />
            <p>Remember Me</p>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            className="w-full text-whitee rounded-full "
            disabled={loader}
          >
            {loader ? <ImSpinner8 className="spinning-icon" /> : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
