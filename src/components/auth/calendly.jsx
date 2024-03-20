import { IoArrowBackOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

export const Calendly = ({ prevStep }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement("script");
    script.type="text/javascript"
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => setLoading(false); // Set loading to false when script has loaded
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div className=" w-full h-screen">
        <IoArrowBackOutline
          className="cursor-pointer absolute  top-5 left-5 sm:left-20 lg:left-40 z-10"
          onClick={prevStep}
          size={25}
        />
        {loading && (
          <div
            className={`calendly-inline-widget w-full ${
              loading ? "hidden" : "block"
            }`}
            style={{ height: "660px" }}
          >
            {/* Show a loading spinner or placeholder */}
            Loading...
          </div>
        )}
        <iframe 
          src="https://calendly.com/motorcut-support/30min?month=2024-03"
          className={`absolute inset-0 w-full h-full mOUYF5ZmuNL6I7t0mSFg ${
            loading ? "hidden" : "block"
          }`}
          style={{backgroundColor:"transparent"}}
        //   style="background-color: transparent !important;"
        ></iframe>
      </div>
    </>
  );
};
