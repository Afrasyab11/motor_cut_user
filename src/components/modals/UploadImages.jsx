"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSelector, useDispatch } from "react-redux";
import {
  createAdvertAction,
  getActivityChartAction,
  getAdvertAction,
} from "@/store/createAdvert/createAdvertThunk";
import { MdClose } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { useDropzone } from "react-dropzone";
import { ImSpinner8 } from "react-icons/im";
import { uploadImagesSchema } from "@/schemas/advertFromValidation";
import { useEffect } from "react";
import { dashboardStatsAction } from "@/store/dashboard/dashboardThunk";
import { getCookie } from "cookies-next";
export default function UploadImages({
  payload,
  open,
  setOpen,
  setPayload,
  reset,
}) {
  const { advertLoader } = useSelector((state) => state?.advert);
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  let userString = getCookie("user");
  let user = userString ? JSON.parse(userString) : null;
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const filesToValidate = acceptedFiles.map((file) => ({
        name: file.name,
      }));
      const result = uploadImagesSchema.safeParse({ files: filesToValidate });
      if (result.success) {
        setFiles([...files, ...acceptedFiles]); // If validation is successful, update state
        setErrorMessage(""); // Clear any existing error messages
      } else {
        const firstError = result.error.issues[0];
        setErrorMessage(firstError.message);
      }
    },
  });
  useEffect(() => {
    // Trigger validation manually with react-hook-form if needed
  }, [files]);
  const removeFile = (index) => {
    let temp = [...files];
    temp.splice(index, 1);
    setFiles(temp);
  };
  const SubmitHanlder = (e) => {
    e.preventDefault();
    if (files.length === 0) {
      setErrorMessage("Please select at least one file."); // Set error message
      return; // Stop the submission process
    }
    const formData = new FormData();
    for (const key in payload) {
      formData.append(key, payload[key]);
    }
    files.forEach((file) => {
      formData.append("Files", file);
    });

    dispatch(
      createAdvertAction({
        formData,
        onSuccess: () => {
          setOpen();
          dispatch(getAdvertAction(user?.UserId));
          dispatch(getActivityChartAction(user?.UserId));
          dispatch(dashboardStatsAction(user?.UserId));
          setPayload({
            UserId: user?.UserId,
            isAdmin:false,
            Label: "",
            CutType: "Half Cut", // Default value
            TrimImages: false,
          });
          reset();
          setFiles("");
          
        },

        onError:(msg)=>{
           toast.error(msg);
        }
      })
    );
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className={` overflow-y-auto h-[80vh] lg:w-full xl:w-full 2xl:min-w-[100vh]`}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="lg:text-[40px] sm:text-[15px] text-center font-normal flex justify-between pb-[20px] pt-[15px]">
              <p>Upload Images</p>
              <button disabled={advertLoader} onClick={setOpen}>
                <MdClose size={35} />
              </button>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            <div
              {...getRootProps()}
              className="w-full  lg:w-[400px] h-[200px] mt-2 border text-black border-black rounded-3xl mx-auto flex justify-center gap-y-10 items-center flex-col hover:cursor-pointer"
            >
              <input {...getInputProps()} />
              <p>Drag and drop upload</p>
            </div>
            {errorMessage && (
              <small className="text-red-500 text-center text-[13px]">
                {errorMessage}
              </small>
            )}
          </AlertDialogDescription>
          <div className="lg:grid lg:grid-cols-2 sm:grid md:grid md:grid-cols-2 sm:grid-cols-1 gap-x-2 gap-y-1 px-6">
            {files.length > 0 &&
              files?.map((obj, index) => (
                <>
                  <div key={index} className="relative mt-2">
                    <Image
                      className="rounded-lg w-full h-[150px]"
                      height={100}
                      width={100}
                      src={URL.createObjectURL(obj)}
                      alt={`Image ${index}`}
                    />
                    <button
                      className="absolute top-[-15px] right-[-10px]   rounded-full"
                      onClick={() => {
                        removeFile(index);
                      }}
                      disabled={advertLoader}
                    >
                      <TiDelete size={40} />
                    </button>
                  </div>
                </>
              ))}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex justify-between items-center mx-auto">
            {/* <AlertDialogAction > */}
            <button
              className="bg-primary mt-[120px] py-2 rounded-full px-14 text-white"
              type="submit"
              onClick={SubmitHanlder}
              disabled={advertLoader}
            >
              Image Process{" "}
              {advertLoader && <ImSpinner8 className="spinning-icon" />}
            </button>
            {/* </AlertDialogAction> */}
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}