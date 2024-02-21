"use client";
// import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { CardWrapper } from "../card-wrapper";
import { FormError } from "../form-error";

import { sendSignUpOTP } from "@/store/user/userThunk";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useDispatch, useSelector } from "react-redux";
import { FormSuccess } from "../form-success";

export const SignUpForm = ({ nextStep, setFormData }) => {
  const dispatch = useDispatch();
  const { isLoading, statusError } = useSelector((state) => state?.user);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      mobileNumber: "",
    },
  });

  const onSubmit = (values) => {
    setError("");
    setSuccess("");
    const payload = {
      Email: values.email,
    };
    dispatch(
      sendSignUpOTP({
        payload,
        onSuccess: () => {
          setFormData((prev) => ({ ...prev, ...values }));
          nextStep();
          setSuccess(data ? data.success : "");
        },
        onError: (e) => {
          setError(e);
        },
      })
    );

    // startTransition(() => {
    //   Register(values).then((data) => {
    //     setError(data ? data.error : "");
    //     if (data.success) {
    //     }
    //   }
    //   );
    // });
  };

  const inputStyles = {
    border: "none",
    borderBottom: "1px solid #814adf",
    width: "100%",
  };

  return (
    <CardWrapper
      headerText="Sign Up"
      headerLabel="Please enter your details"
      backButtonLabel="Don't Have an account?"
      backButtonHref="/auth/register"
      showSocial
      btnText="Sign Up with Google"
      showProgressBar
      progressBarCount="1"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Your Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="john.doe@example.com"
                      type="email"
                      disabled={isLoading}
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Your Mobile Number</FormLabel>
                  <FormControl>
                    <PhoneInput
                      {...field}
                      disabled={isLoading}
                      defaultCountry="us"
                      value={phone}
                      onChange={(phone) => {
                        setPhone(phone);
                        form.setValue("mobileNumber", phone);
                      }}
                      forceDialCode
                      inputStyle={inputStyles}
                      className="react-international-phone-input"
                      countrySelectorStyleProps={{
                        buttonStyle: { border: "none" },
                        dropdownStyleProps: {
                          style: { borderRadius: "15px" },
                        },
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            className="w-full rounded-full text-white "
            disabled={isLoading}
            // onClick = {handleOnClick}
          >
            {isLoading ? "sending mail..." : "Next"}
            {/* <Link href="/auth/register/verify-number">Next</Link> */}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
