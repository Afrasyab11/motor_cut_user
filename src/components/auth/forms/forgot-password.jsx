"use client";
// import * as z from "zod";
import { ForgotPasswordSchema } from '@/schemas';
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
import { CardWrapper } from "../card-wrapper";
import { BackButton } from "../back-button";
import { forgotUserPassword } from '@/store/user/userThunk';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useTransition } from 'react';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { forgotPassword } from '@/actions/forgotPassword';

export const ForgotPassword = () => {

  const { isLoading } = useSelector((state) => state?.user);

  const router = useRouter();
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [payloadSuccess, setPayloadSuccess] = useState(false)
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values) => {

    setError("");
    setSuccess("");
    startTransition(() => {
      forgotPassword(values).then((data) => {
        let payload = {
          Email: values.email,
        }
        console.log("Payload from  forgot password component", payload)
        dispatch(forgotUserPassword(
          {
            payload,
            onSuccess: () => {
              setPayloadSuccess(true); 
              setShowOTPInput(true);
              // router.push('/main/dashboard')
            },

            onError: (msg) => {
              setError(msg);
            }
          }))

      });
    });
  };

  return (
    <CardWrapper
      headerText="Forgot-Password"
      headerPadding="p-7 pl-0 pt-3 pb-4 p-0"
      backButtonLabel="Don't Have an account?"
      // backButtonHref="/auth/register"
      headerLogo
      className="space-y-20"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
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
                      {...field}
                      placeholder="john.doe@example.com"
                      type="email"
                      disabled={isPending}
                      required
                    />
                  </FormControl>
                </FormItem>

              )}
            />
            {showOTPInput && (
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-mutedFields">
                      Enter the OTP
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="otp"
                        type="password"
                        disabled={isPending}
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            className="w-full text-whitee rounded-full"
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

