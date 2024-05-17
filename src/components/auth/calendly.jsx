import React, { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const Calendly = ({ prevStep }) => {
  const router =useRouter();
  const [loading, setLoading] = useState(true);
  const [showFinishButton, setShowFinishButton] = useState(false);
  
  useEffect(() => {
    if (
      !document.querySelector(
        'script[src="https://assets.calendly.com/assets/external/widget.js"]'
      )
    ) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => {
        setLoading(false);
        if (window.Calendly && !window.Calendly.initialized) {
          window.Calendly.initInlineWidget({
            url: "https://calendly.com/motorcut-support/30min",
            parentElement: document.getElementById("calendly-embed"),
            prefill: {},
            utm: {},
          });
          window.Calendly.initialized = true; 
        }
      };
      document.body.appendChild(script);
    }

    return () => {
      const script = document.querySelector(
        'script[src="https://assets.calendly.com/assets/external/widget.js"]'
      );
      if (script) {
        document.body.removeChild(script);
      }
      if (window.Calendly) {
        window.Calendly.initialized = false;
      }
    };
  }, []);

 

  // const handleFinish =()=>{
  //   router.push("/auth/login")
  // }

  return (
    <>
      <div className="w-full ">
        {loading && (
          <div className="h-screen flex items-center justify-center text-whitee">
            Loading...
          </div>
        )}
        <div
          id="calendly-embed"
          style={{ width: "100vw", height: "100vh" }}
          className="overflow-hidden"
        >
        </div>
        {/* {showFinishButton && (
          <div className="flex justify-center pb-5">
          <Button
            className="bg-[#814adf] text-white py-2 px-4 rounded sm:w-full md:mt-4 min-w-32 max-w-40"
            onClick={handleFinish}
          >
            Finish
          </Button>
          </div>
        )} */}
      </div>
    </>
  );
};
