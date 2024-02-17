"use client";
// import * as z from "zod";
import { FormError } from "@/components/auth/form-error";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
//   import { FormSuccess } from "../form-success";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { verifyEmail } from "@/store/user/userThunk";
import "react-international-phone/style.css";
import { useDispatch, useSelector } from "react-redux";
import { FormSuccess } from "../form-success";
import Otp_Input from "./Otp_Input";
import ResendCode from "./ResendCode";

export const VerifyNumberForm = ({ formData,nextStep, prevStep }) => {
  const { isLoading } = useSelector((state) => state?.user);

  const dispatch =useDispatch()
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();


  const [inputValues, setInputValues] = useState({
    verifyCode1: '',
    verifyCode2: '',
    verifyCode3: '',
    verifyCode4: '',
  });

  const isEmpty = Object.values(inputValues).some(value => value === '');

  const onSubmit = () => {
    const otp = Object.values(inputValues).join('');
    setError("");
    setSuccess("");
    const payload={
      OTP:otp
    }
    dispatch(verifyEmail(
      { payload,
        onSuccess:()=>{
          nextStep();
          // setSuccess(data ? data.success : "");
        },
        onError:(msg)=>{

          setError(msg);
        }
      }))
    // startTransition(() => {
     
      // VerifyNumberAction(values).then((data) => {
      //   setError(data ? data.error : "");
      //   setSuccess(data ? data.success : "");
      //   if (data.success) {
      //     nextStep();
      //   }
      // });
    // });

};




  return (
     <CardWrapper
      headerText="Verify Code"
      headerLabel={`Check your E-mail, we have sent a code to ${formData?.email}`}
      backButtonLabel="Don't Have an account?"
      backButtonHref="/auth/register"
      btnText="Sign Up with Google"
      showProgressBar
      progressBarCount="2"
    >
      
       
        <Otp_Input inputValues={inputValues}  setInputValues={setInputValues} />
           
          <FormError message={error} />
          <FormSuccess message={success} />
         <ResendCode  />
       <div className="flex flex-col  gap-3 mt-4">
          <Button
            disabled={isEmpty}
            className="rounded-full w-full text-white"
            onClick={onSubmit}
          >
            {isLoading?"Verifying...":"Continue"}
          </Button>
          <Button
            variant="outline"
            type="submit"
            className="rounded-full w-full"
            disabled={isPending}
            onClick={prevStep}
          >
            Back
          </Button>
          </div>
    </CardWrapper>
  );
};
