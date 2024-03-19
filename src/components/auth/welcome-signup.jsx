"use client";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/auth/card-wrapper";
import Image from "next/image";
import { Link } from "lucide-react";
import logo from "../../assets/images/cutting.png"

export const WelcomeSignUp = ({ nextStep, prevStep }) => {
  return (
    <CardWrapper headerPadding="p-0" className="p-0">
      <div className="w-full flex justify-center items-center flex-col">
        <Image src={logo} height={150} width={150} alt="logo" />
        <h1 className="text-4xl text-center	font-medium pt-10 pb-3">
          Welcome to MotorCut
        </h1>
        <p className="text-center font-medium 2xl:w-4/6 px-4 md:px-0 text-mutedFields text-sm	">
          Our free trial consists of 50 free images credits and expires after
          7-days. No payment information required.
        </p>
      </div>
      <div className="text-center">
      <Button
        type="submit"
        className="rounded-full w-full  2xl:w-3/6 text-white mt-7"
        onClick={nextStep}
      >
        Continue
      </Button>
      </div>
    
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
