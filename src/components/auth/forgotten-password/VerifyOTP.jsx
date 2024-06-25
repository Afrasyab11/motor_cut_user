"use client";
import React, { useState, useEffect } from "react";
import Otp_Input from "../forms/Otp_Input";
import { CardWrapper } from "../card-wrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { verifyUserPassword } from "@/store/user/userThunk";
import { useDispatch, useSelector } from "react-redux";

const VerifyOTP = ({ email, nextStep }) => {
  const { userLoader } = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [inputValues, setInputValues] = useState({
    verifyCode1: "",
    verifyCode2: "",
    verifyCode3: "",
    verifyCode4: "",
  });

  const isEmpty = Object.values(inputValues).some((value) => value === "");

  const onSubmit = () => {
    const otp = Object.values(inputValues).join("");
    setError("");
    setSuccess("");
    let payload = {
      Email: email,
      OTP: otp,
    };
    dispatch(
      verifyUserPassword({
        payload,
        onSuccess: (e) => {
          nextStep();
        },
        onError: (msg) => {
          setError(msg);
        },
      })
    );
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && !isEmpty) {
        onSubmit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputValues, isEmpty]);

  return (
    <CardWrapper
      headerText="Forgot-Password "
      headerPadding="pb-2 mt-4"
      headerLabel={`Check your e-mail, we have sent a code to ${email}`}
      backButtonLabel="Go back to?"
      // backButtonHref="/auth/register"
      headerLogo
      className=""
    >
      <Otp_Input inputValues={inputValues} setInputValues={setInputValues} />
      <FormError message={error} />
      <FormSuccess message={success} />
      <Button
        disabled={isEmpty}
        className="rounded-full w-full text-white mt-8"
        onClick={onSubmit}
      >
        {userLoader ? "Verifying..." : "Continue"}
      </Button>
    </CardWrapper>
  );
};

export default VerifyOTP;
