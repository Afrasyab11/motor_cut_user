import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  changeLogoPositionOnProcessImage,
  getAdvertAction,
  getAdvertProcesByIdAction,
} from "@/store/createAdvert/createAdvertThunk";
import { ImSpinner8 } from "react-icons/im";
import { getCookie } from "cookies-next";
import { viewAdvertAction } from "@/store/createAdvert/advertSlice";
import { Button } from "../ui/button";

export default function ChangeCarPositionModal({
  open,
  setOpen,
  item,
  advertId,
}) {
//   console.log("item564", item);
  const { shiftBgLoader } = useSelector((state) => state?.advert);
  // const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const MIN = -10;
  const MAX = 10;
  const [value, setValue] = useState(0);
  let userString = getCookie("user");

  // console.log("advert",advert)
  let user = userString ? JSON.parse(userString) : null;

  const handleSliderChange = (newValue) => {
    console.log("new value", newValue);
    setValue(newValue);
  };
  const submitHandler = () => {
    const formData = new FormData();
    let payload = {
      UniqueAdvertId: advertId,
      ExistingProcessedImagePath: item?.Processed,
      FullCutValue:value,
      HalfCut: false,
    };
    for (const key in payload) {
      formData.append(key, payload[key]);
    }
    console.log("payload",payload)
    dispatch(
      changeLogoPositionOnProcessImage({
        formData,
        onSuccess: () => {
          dispatch(
            getAdvertProcesByIdAction({ Id: advertId, onSuccess: (data) => {} })
          );
          toast.success("Image Updated");
          // window.location.reload();
          setOpen();
        },
      })
    );
  };
  const marks = {
    "-10": "-10",
    0: <strong>0</strong>,

    10: {
      style: {
        color: "red",
      },
      label: <strong>10</strong>,
    },
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent
        className={`overflow-y-auto h-auto lg:w-full xl:w-full 2xl:min-w-[80vh]`}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="lg:text-[40px] sm:text-[15px] text-center font-normal flex justify-between items-center pb-[20px] pt-[15px]">
              <p>Change Car Position</p>
              <button disabled={shiftBgLoader} onClick={setOpen}>
                <MdClose size={35} />
              </button>
            </div>
          </AlertDialogTitle>
          <div className="flex justify-center align-items-center gap-4">
            <div>
              <div className="relative">
                <Image
                  className={`rounded-lg h-[${item?.ImageDimenison?.Height}] w-[${item?.ImageDimenison?.Width}]`}
                  src={`${baseDomain}get-file?filename=${item?.Processed}`}
                  width={item?.ImageDimenison?.Width}
                  height={item?.ImageDimenison?.Height}
                  alt={`Background`}
                />
                {/* <div
                  className="absolute left-0 w-full h-1 bg-red-500 transform -translate-y-1/2"
                  style={{ bottom: `calc(100% - ${value}%)` }}
                ></div> */}
              </div>
            </div>

            <div>
              <Slider
                min={MIN}
                max={MAX}
                value={value}
                onChange={handleSliderChange}
                vertical
                reverse
                marks={marks}
                tipFormatter={(val) => `${val}`}
                className="custom-slider"
                railStyle={{ backgroundColor: "black" }} // Set track fill color to black
                trackStyle={{ backgroundColor: "black" }} // Set track fill color to black
                handleStyle={{ borderColor: "red" }} // Set point border color to red
                dotStyle={{ borderColor: "red" }} // Set point fill color to red
                activeDotStyle={{ borderColor: "red" }} // Set active point fill color to red
              />
            </div>
          </div>
          <div className="flex justify-center">
            <span className="font-bold">{"Value: " + value}</span>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex justify-between items-center mx-auto">
            <Button
              className="bg-primary sm:text-[12px] md:text-[15px] py-1 rounded-full sm:px-3 md:px-14 text-white"
              type="button"
              onClick={submitHandler}
              disabled={shiftBgLoader}
            >
              Save and Reprocess Image
              {shiftBgLoader && <ImSpinner8 className="spinning-icon" />}
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
