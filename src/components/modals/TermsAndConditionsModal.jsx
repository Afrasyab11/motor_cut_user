"use client";
import React, { useState } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { ImSpinner8 } from "react-icons/im";
import { MdClose } from "react-icons/md";
export default function TermsAndConditionsModal({ open, setOpen, closeHandler,loader }) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="lg:text-[15px] sm:text-[15px] text-center font-normal flex justify-between pb-[20px] pt-[15px]">
              <p>Terms and Conditions</p>
              <button onClick={closeHandler}>
                <MdClose size={20} />
              </button>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            <div className="w-full text-black border-black rounded-3xl mx-auto flex justify-center items-center flex-col hover:cursor-pointer">
              <p>.........</p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex justify-between items-center mx-auto">
            <button
              className="bg-primary py-1 rounded-full px-14 text-white"
              type="submit"
              onClick={closeHandler}
              // disabled={loader}
            >
              Agree
              {/* {loader && <ImSpinner8 className="spinning-icon" />} */}
            </button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
