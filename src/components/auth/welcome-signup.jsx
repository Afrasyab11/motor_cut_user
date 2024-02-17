"use client";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/auth/card-wrapper";
import Image from "next/image";
import { Link } from "lucide-react";

export const WelcomeSignUp = ({ nextStep, prevStep }) => {
  return (
    <CardWrapper headerPadding="p-0" className="p-0">
      <div className="w-full flex justify-center items-center flex-col">
        <Image src="/logo1.png" height={150} width={150} alt="logo" />
        <h1 className="text-4xl text-center	font-medium pt-20 pb-10">
          Welcome to MotorCut
        </h1>
        <p className="text-center font-medium w-80 text-mutedFields text-sm	">
          Our free trial consists of 50 free images credits and expires after
          7-days. No payment information required.
        </p>
      </div>
      <Button
        type="submit"
        className="rounded-full w-full text-white mt-7"
        onClick={nextStep}
      >
        Continue
      </Button>
      {/* <Button
      variant="link"

        type="submit"
        className="rounded-full w-full  mt-3 mb-7 text-mutedFields"
        // onClick={nextStep}
      > */}
        
      {/* </Button>  */}
    </CardWrapper>
  );
};
