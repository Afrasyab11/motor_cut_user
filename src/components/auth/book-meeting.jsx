"use client";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/auth/card-wrapper";
import Image from "next/image";

export const BookMeeting = ({ nextStep }) => {
  const handleClick = () => {
    nextStep();
  };
  return (
    <CardWrapper headerPadding="p-0" className="p-6">
      <div className="w-full flex justify-center items-center flex-col">
        <Image src="/meeting.png" height={150} width={150} alt="logo" />
        <h1 className="text-4xl text-center	font-normal pb-7">
          Book a Meeting?
        </h1>
        <p className="text-center font-medium w-80 text-gray-400 text-sm	">
          Would you like assistance getting setup on how to use our app and
          choosing the right look for your dealership?
        </p>
      </div>
      <Button
        href="/auth/register"
        className=" flex justify-center items-center text-white h-10 bg-primary w-full rounded-full mt-14 text-sm"
        onClick={handleClick}
      >
        Yes, book a meeting.
      </Button>
      <Button
        className=" h-10 flex justify-center items-center border border-gray-500  w-full rounded-full mt-4 text-primary bg-white hover:bg-gray-50 text-sm"
        onClick={handleClick}
      >
        No, Thanks
      </Button>
    </CardWrapper>
  );
};
