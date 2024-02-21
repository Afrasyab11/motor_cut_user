"use client";
import { sendSignUpOTP } from "@/store/user/userThunk";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ResendCode = ({ formData }) => {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(0);
  console.log("formData.email", formData);
  const reSendMail = () => {
    const payload = {
      Email: formData.email,
    };
    dispatch(sendSignUpOTP({ payload, onSuccess: () => {} }));
    setTimer(60);
  };
  const isResendDisabled = timer > 0;
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);
  return (
    <div className="my-8 text-slate-500">
      {timer > 0 ? (
        <div>Resend code in {timer}s</div>
      ) : (
        <div className="cursor-pointer" onClick={reSendMail}>
          {" Didn't receive the code? Resend code"}
        </div>
      )}
    </div>
  );
};

export default ResendCode;
