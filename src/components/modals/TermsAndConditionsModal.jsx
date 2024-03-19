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
import { CheckboxWithText } from "../auth/checkbox-text";
export default function TermsAndConditionsModal({
  open,
  setOpen,
  closeHandler,
  loader,
}) {
  const [isTermsChecked, setTermsChecked] = useState(false);
  const [isPrivacyChecked, setPrivacyChecked] = useState(false);
  const handleTermsChange = (event) => {
    setTermsChecked(event.target.checked);
  };

  const handlePrivacyChange = (event) => {
    setPrivacyChecked(event.target.checked);
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="lg:text-[25px] sm:text-[15px] text-center font-normal flex justify-between pb-[20px] pt-[15px]">
              <p>Terms & Conditions</p>
              <button onClick={closeHandler}>
                <MdClose size={20} />
              </button>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription >
            <div className="w-full text-black border-black rounded-3xl mx-auto flex flex-col gap-y-5 hover:cursor-pointer">
             
              <p>
                These terms and conditions outline the rules and regulations for
                the use of MotorCut&aposs website, located at www.motorcut.com.
              </p>
              <p>
                By accessing this website we assume you accept these terms and
                conditions. Do not continue to use website name if you do not
                agree to take all of the terms and conditions stated on this
                page.
              </p>
              <div className="flex flex-col gap-y-3">
                <CheckboxWithText
                  mainText="I agree to Terms and Conditions"
                  name="termsAndConditions"
                  onChange={handleTermsChange}
                  check={isTermsChecked} // Ensure CheckboxWithText supports 'checked' prop
                />
              </div>
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
