"use client";
import React, { useState } from "react";
import { WelcomeSignUp } from "../welcome-signup";
import { SignUpForm } from "./sign-up";
import { VerifyNumberForm } from "./verify-number-form";
import { CreatePasswordForm } from "./create-password-form";
import { TermsAndConditionsForm } from "./terms-contions-form";
import { FillProfilePageForm } from "./fill-Profile-Form";
import { BookMeeting } from "../book-meeting";
import { Calendly } from "../calendly";
export const RegisterForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState("");
const [meeting, setMeeting]=useState("yes")

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <WelcomeSignUp nextStep={nextStep} />;
      case 1:
        return <BookMeeting nextStep={nextStep} prevStep={prevStep} setMeeting={setMeeting}/>;

      case 2:
        if (meeting === "yes") {
          return <Calendly prevStep={prevStep} />;
        } else {
          return <SignUpForm setFormData={setFormData} nextStep={nextStep} />;
        }
        // return <SignUpForm  setFormData={setFormData} nextStep={nextStep} />;
      case 3:
        return <VerifyNumberForm formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <CreatePasswordForm setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return (
          <TermsAndConditionsForm setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />
        );
      case 6:
        return <FillProfilePageForm formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
};
