import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MdClose } from "react-icons/md";
import Image from "next/image";
import { baseDomain } from "@/utils/axios";

export default function ShiftBackground({ open, setOpen, selectedImage }) {
  const MIN = 0;
  const MAX = 100;
  const [value, setValue] = useState(50);

  const handleSliderChange = (newValue) => {
    setValue(newValue);
  };
  const submitHandler = () => {
    console.log("value", value);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent
        className={`overflow-y-auto h-5/6 lg:w-full xl:w-full 2xl:min-w-[80vh]`}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="lg:text-[40px] sm:text-[15px] text-center font-normal flex justify-between items-center pb-[20px] pt-[15px]">
              <p>Shift Background</p>
              <button onClick={setOpen}>
                <MdClose size={35} />
              </button>
            </div>
          </AlertDialogTitle>
          <div className="flex align-items-center gap-4">
            <div>
              <div className="relative">
                <Image
                  className="rounded-lg"
                  src={`${baseDomain}get-file?filename=${selectedImage}`}
                  width={1600}
                  height={1600}
                  alt={`Background`}
                />
                <div
                  className="absolute left-0 w-full h-1 bg-red-500 transform -translate-y-1/2"
                  style={{ top: `calc(100% - ${value}%)` }}
                ></div>
              </div>
            </div>
            <div>
              <Slider
                min={MIN}
                max={MAX}
                value={value}
                onChange={handleSliderChange}
                vertical
                className="custom-slider"
                railStyle={{ backgroundColor: "black" }} // Set track fill color to black
                trackStyle={{ backgroundColor: "black" }} // Set track fill color to black
                handleStyle={{ borderColor: "red" }} // Set point border color to red
                dotStyle={{ borderColor: "red" }} // Set point fill color to red
                activeDotStyle={{ borderColor: "red" }} // Set active point fill color to red
              />
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex justify-between items-center mx-auto">
            <button
              className="bg-primary py-2 rounded-full px-14 text-white"
              type="button"
              onClick={submitHandler}
              //   disabled={backgroundLoader}
            >
              Save and Reprocess Image
              {/* {backgroundLoader && <ImSpinner8 className="spinning-icon" />} */}
            </button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
