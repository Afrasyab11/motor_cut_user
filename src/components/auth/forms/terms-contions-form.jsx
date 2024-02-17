"use client";
// import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/auth/form-error";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { login } from "@/actions/login";

import "react-international-phone/style.css";
import { CheckboxWithText } from "../checkbox-text";
import Link from "next/link";

export const TermsAndConditionsForm = ({ nextStep, prevStep }) => {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isTermsChecked, setTermsChecked] = useState(false);
  const [isPrivacyChecked, setPrivacyChecked] = useState(false);
  const handleTermsChange = (event) => {
    setTermsChecked(event.target.checked);
  };

  const handlePrivacyChange = (event) => {
    setPrivacyChecked(event.target.checked);
  };
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    setError("");
    // setSuccess("");
    startTransition(() => {
      login(values).then((data) => {
        setError(data ? data.error : "");
        // setSuccess(data ? data.success : "");
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
      headerText="Terms & Conditions"
      headerLabel={
        <div>
      These terms and conditions outline the rules and regulations for the
      use of MotorCut&apos;s Website, located at www.motorcut.com.
      <br />
      <br />
      By accessing this website we assume you accept these terms and
      conditions. Do not continue to use Website Name if you do not agree to
      take all of the terms and conditions stated on this page.
    </div>
      }
      backButtonLabel="Don&apos;t Have an account?"
      backButtonHref="/auth/register"
      btnText="Sign Up with Google"
      showProgressBar
      progressBarCount="4"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormError message={error} />
          {/* <FormSuccess message=""/> */}

          {/* <CheckboxWithText mainText="I agree to Terms and Conditions" />
          <CheckboxWithText mainText="I agree to Privacy Policy" /> */}
          <CheckboxWithText
            mainText="I agree to Terms and Conditions"
            name="termsAndConditions"
            onChange={handleTermsChange}
            check={isTermsChecked} // Ensure CheckboxWithText supports 'checked' prop
          />
          <CheckboxWithText
            mainText="I agree to Privacy Policy"
            name="privacyPolicy"
            onChange={handlePrivacyChange}
            check={isPrivacyChecked} // Ensure CheckboxWithText supports 'checked' prop
          />
          <div className="flex items-center justify-center gap-7 pt-10">
            <Button
              variant="outline"
              type="submit"
              className="rounded-full w-40"
              disabled={isPending}
              onClick={prevStep}
            >
              Back
            </Button>
            <Button
              type="submit"
              className="rounded-full w-40 text-white"
              disabled={isPending ||( !isTermsChecked ||!isPrivacyChecked)}
              onClick={nextStep}
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
