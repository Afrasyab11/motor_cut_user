"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TermsAndConditionsModal from "@/components/modals/TermsAndConditionsModal";
import logo from "./../assets/images/logo.png";
import ThreeAnimation from "@/components/threeJsAnimation/ThreeAnimation";
import { set } from "zod";
export default function Home() {
  const route = useRouter()
  const [open, setOpen] = useState(false);
  const termsAndConditonHandler = () => {
    route.push("/terms-conditions")
  };
  const closeHandler = () => {
    setOpen(false);
  };
  return (
    <div className="bg-white flex">
      <div className=" h-screen  sm:w-6/12">
        <ThreeAnimation ></ThreeAnimation>
      </div>

      {/* // w-6/12  */}
      <div className="bg-heroSection h-screen w-full sm:w-6/12 flex flex-col justify-center items-center">
        <Image
          src={logo}
          height={350}
          width={380}
          alt="logo"
          className="w-[380px]  px-6 md:px-1"
        />
        <p className="text-[16px] md:text-xl w-64 sm:w-6/12 text-center font-medium text-mutedFields ">
          Join us today to enhance your online vehicle adverts.
        </p>
        <Link
          href="/auth/register"
          className="flex justify-center items-center text-white h-10 bg-primary w-6/12 rounded-full mt-10 sm:mt-10"
        >
          Sign Up
        </Link>
        <Link
          href="/auth/login"
          className=" h-10 flex justify-center items-center border border-gray-500  w-6/12 rounded-full mt-2 text-primary"
        >
          Log In
        </Link>
        <div className="flex w-8/12 justify-center text-center">
          <p className="flex text-xs  text-center mt-6 font-medium text-mutedFields ">
            By signing up, I agree to the
          </p>
          
          <p
            onClick={termsAndConditonHandler}
            className="text-xs cursor-pointer text-center mt-6 font-medium text-mutedFields "
          >
            &nbsp; terms and conditions
          </p>
         
        </div>
      </div>
      {/* {open && (
        <TermsAndConditionsModal
          open={open}
          setOpen={setOpen}
          closeHandler={closeHandler}
        />
      )} */}
    </div>
  );
}
