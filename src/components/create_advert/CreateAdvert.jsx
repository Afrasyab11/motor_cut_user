"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import TestImage from "../../../public/Test.jpg";
import { payloadSchema } from "@/schemas/advertFromValidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UploadImages from "../modals/UploadImages";
import ChangeBackgroudImage from "../modals/changeBackgroundModal";
import { getchanngeBackgroundImageAction } from "@/store/background/backgroundThunk";
import { useDispatch, useSelector } from "react-redux";
import { baseDomain } from "@/utils/axios";
import { getCookie } from "cookies-next";
export default function CreateAdvert() {
  const dispatch = useDispatch();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { background,backgroundLoader } = useSelector((state) => state.background);
  const [isBacgroundDialog, setBackgroundDialog] = useState(false);
  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);
  const handleBackgroundDialog = () => setBackgroundDialog(true);
  const handleCloseBackground = () => setBackgroundDialog(false);
  let userString = getCookie("user");

  let user = userString ? JSON.parse(userString) : null;
  const [payload, setPayload] = useState({
    UserId: user?.UserId,
    isAdmin:false,
    Label: "",
    CutType: "Half Cut", // Default value
    TrimImages: false, // Default value, assuming 'off' maps to `false`
  });
  useEffect(() => {
    dispatch(getchanngeBackgroundImageAction(user?.UserId));
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(payloadSchema),
  });
  const handleChange = (field, value) => {
    // Special handling for fields that need boolean values
    if (field === "TrimImages") {
      value = value === "on" ? true : false;
    }
    setPayload({
      ...payload,
      [field]: value,
    });
  };

  return (
    <>
      {/* <AlertDialog> */}
      <div className="bg-site_secondary px-6 py-4 rounded-2xl mb-2">
        <h2 className="text-lg sm:text-md mb-6 font-medium">Create Advert</h2>
        <div className="mb-6 sm:mb-6 mt-6 sm:mt-6">
          <label htmlFor="cutType" className="text-sm sm:text-md mb-6 ">
            Advert Label
          </label>
          <Input
            {...register("Label")}
            className="mt-6 bg-primary[light]"
            name="Label"
            placeholder="Advert Label"
            value={payload?.Label}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            type="text"
          />
          {errors.Label && (
            <small className="text-red-500">{errors.Label.message}</small>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="cutType" className="text-sm sm:text-md ">
            Select Cut Type
          </label>
          <div className="grid grid-cols-2 gap-8 mt-4">
            <button
              className={`rounded-full p-1 sm:p-3 md:p-3 text-sm sm:text-md ${
                payload?.CutType === "Half Cut"
                  ? "bg-primary text-whitee"
                  : "bg-whitee text-primary border border-gray-500 "
              }`}
              onClick={() => handleChange("CutType", "Half Cut")}
            >
              Half Cut
            </button>
            <button
              className={`rounded-full p-1 sm:p-3 md:p-3 text-sm sm:text-md ${
                payload?.CutType === "Full Cut"
                  ? "bg-primary text-whitee"
                  : "bg-whitee text-primary border border-gray-500 "
              }`}
              onClick={() => handleChange("CutType", "Full Cut")}
            >
              Full Cut
            </button>
          </div>
        </div>
        {payload.CutType == "Half Cut" && (
          <div className="mb-6">
            <label className="block mb-2">Trim Images</label>
            <div className="grid grid-cols-2 gap-8 mt-4">
              <button
                className={`rounded-full p-1 sm:p-3 md:p-3 text-sm sm:text-md ${
                  payload?.TrimImages === true
                    ? "bg-primary text-whitee"
                    : "bg-whitee text-primary border border-gray-500 "
                }`}
                onClick={() => handleChange("TrimImages", "on")}
              >
                On
              </button>
              <button
                className={` rounded-full p-1 sm:p-3 md:p-3 text-sm sm:text-md ${
                  payload?.TrimImages === false
                    ? "bg-primary text-whitee"
                    : "bg-whitee text-primary border border-gray-500 "
                }`}
                onClick={() => handleChange("TrimImages", "off")}
              >
                Off
              </button>
            </div>
          </div>
        )}
        <div className="my-6">
          <hr className="text-black h-[2px] bg-gray-500" />
        </div>
        <div className="mb-6 mt-6">
          <div className="text-center ">
            <button
              onClick={handleSubmit(handleOpenDialog)}
              // onClick={handleSubmit}
              className=" bg-whitee border border-gray-500  rounded-full px-10 py-3 text-sm sm:text-md "
            >
              Upload Images
            </button>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          {/* <Image
            className="w-full lg:h-[200px] rounded-3xl mx-2 overflow-hidden"
            src={`${baseDomain}get-file?filename=${background?.BackgroundImage}`}
            objectFit="cover"
            height={30}
            width={30}
            alt=""
          /> */}
          <div className="rounded-2xl">
            <Image
              src={`${baseDomain}get-file?filename=${background?.BackgroundImage}`}
              alt={"Background"}
              height={600}
              width={900}
              className="w-full h-[200px] object-cover rounded-2xl"
            />
          </div>
        </div>

        <div className=" text-center">
          <a
            onClick={handleBackgroundDialog}
            className="text-primary text-sm sm:text-md font-medium"
            href="#"
          >
            Change Background
          </a>
        </div>
      </div>
      {isDialogOpen && (
        <UploadImages
          payload={payload}
          open={isDialogOpen}
          setOpen={handleCloseDialog}
        />
      )}
      {isBacgroundDialog && (
        <ChangeBackgroudImage
          open={isBacgroundDialog}
          setOpen={handleCloseBackground}
          backgroundLoader={backgroundLoader}
        />
      )}
      {/* </AlertDialog> */}
    </>
  );
}
