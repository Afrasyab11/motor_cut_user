"use client";
// import * as z from "zod";
import { CreatePasswordSchema } from "@/schemas";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
 import { FormError } from "@/components/auth/form-error";
import { CardWrapper } from "@/components/auth/card-wrapper";
 import { CreatePasswordAction } from "@/actions/createPassword";

import "react-international-phone/style.css";
import { FormSuccess } from "../form-success";

export const CreateNewPassword = ({ nextStep, prevStep }) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(CreatePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      CreatePasswordAction(values).then((data) => {
        setError(data ? data.error : "");
        setSuccess(data ? data.success : "");
        if(data.success)
        {
          nextStep();
        }
      });
    });
  };

  const inputStyles = {
    border: "none",
    borderBottom: "1px solid #814adf",
    width: "100%",
  };

  return (
  
    <CardWrapper
      headerText="Set New Password"
      headerLabel="Please enter a memorable password"
      backButtonLabel="Don't Have an account?"
      backButtonHref="/auth/register"
      btnText="Sign Up with Google"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Your New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      type="password"
                      disabled={isPending}
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      type="password"
                      disabled={isPending}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <FormError message={error} /> */}
          <FormSuccess message={success} />
          <div className="flex items-center justify-center gap-7 pt-16">
            <Button
              variant="outline"
              // type="button"
              className="rounded-full w-40"
              disabled={isPending}
              onClick={prevStep}
            >
              Back
            </Button>
            <Button
              type="submit"
              className="rounded-full w-40 text-white"
              disabled={isPending}
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
