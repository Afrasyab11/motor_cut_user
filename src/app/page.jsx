"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {

  return (
    <div className="bg-white flex">
      <div className="bg-primary h-screen  sm:w-6/12"></div> 
      {/* // w-6/12  */}
      <div className="bg-heroSection h-screen w-full sm:w-6/12 flex flex-col justify-center items-center">
        <Image src="/logo3.png" height={350} width={350} alt="logo" />
        <p className="text-xl w-64 sm:w-6/12 text-center font-medium text-mutedFields">
          Join us today to enhance your online vehicle adverts.
        </p>
        <Link
          href="/auth/register"
          className=" flex justify-center items-center text-white h-10 bg-primary w-6/12 rounded-full mt-20"
        >
          Sign Up
        </Link>
        <Link
          href="/auth/login"
          className=" h-10 flex justify-center items-center border border-gray-500  w-6/12 rounded-full mt-7 text-primary"
        >
          Log In
        </Link>

        <p className="text-xs w-8/12 text-center mt-6 font-medium text-mutedFields ">
          By Signing up, i agree to the terms and conditions
        </p>
      </div>
    </div>
  );
}
