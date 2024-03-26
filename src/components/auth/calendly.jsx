import React, { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";

export const Calendly = ({ prevStep }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only append the script if it's not already present
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
          window.Calendly.initialized = true; // Set a flag to indicate initialization
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

  return (
    <>
      <div className="w-full ">
        <IoArrowBackOutline
          className="cursor-pointer text-whitee  absolute top-[100px] md:left-[130px] lg:left-[200px] xl:left-[330px] z-10 "
          onClick={prevStep}
          size={30}
        />
        {loading && (
          <div className="h-screen flex items-center justify-center text-whitee">
            Loading...
          </div>
        )}
        <div
          id="calendly-embed"
          style={{ width: "100vw", height: "100vh" }}
        ></div>
      </div>
    </>
  );
};
