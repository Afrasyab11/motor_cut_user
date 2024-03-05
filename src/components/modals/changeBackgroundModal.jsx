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
  channgeBackgroundImageAction,
  getchanngeBackgroundImageAction,
} from "@/store/background/backgroundThunk";
import { MdClose } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { useDropzone } from "react-dropzone";
import { ImSpinner8 } from "react-icons/im";
import { uploadImagesSchema } from "@/schemas/advertFromValidation";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { toast } from "react-toastify";
export default function ChangeBackgroudImage({
  open,
  setOpen,
  backgroundLoader,
}) {
  const dispatch = useDispatch();

  let userString = getCookie("user");

  let user = userString ? JSON.parse(userString) : null;
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const fileToValidate = acceptedFiles[0]; // Get only the first file
      const result = uploadImagesSchema.safeParse({ files: [fileToValidate] });

      if (result.success) {
        setFile(fileToValidate); // If validation is successful, set the file
        setErrorMessage(""); // Clear any existing error messages
      } else {
        const firstError = result.error.issues[0];
        setErrorMessage(firstError.message);
      }
    },
  });

  useEffect(() => {
    // Trigger validation manually with react-hook-form if needed
  }, [file]);

  const removeFile = () => {
    setFile(null);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!file) {
      setErrorMessage("Please select a file."); // Set error message if no file is selected
      return; // Stop the submission process
    }
    const formData = new FormData();

    let list = {
      UserId: user?.UserId,
      Path: "",
    };
    formData.append("File", file);
    dispatch(
      channgeBackgroundImageAction({
        list,
        formData,
        onSuccess: () => {
          setOpen();
          dispatch(getchanngeBackgroundImageAction(user?.UserId));
          dispatch(dashboardStatsAction(user?.UserId));
          setFile(null);
        },
      })
    );
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className={`overflow-y-auto h-5/6 lg:w-full xl:w-full 2xl:min-w-[80vh]`}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="lg:text-[40px] sm:text-[15px] text-center font-normal flex justify-between pb-[20px] pt-[15px]">
              <p>Upload Background</p>
              <button disabled={backgroundLoader} onClick={setOpen}>
                <MdClose size={35} />
              </button>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            <div
              {...getRootProps()}
              className=" w-6/6 h-[200px] mt-2 border text-black border-black rounded-3xl mx-auto flex justify-center gap-y-10 items-center flex-col hover:cursor-pointer"
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
            {file && (
              <div className="relative mt-2">
                <Image
                  className="rounded-lg w-full cover-fit min-h-[150px]"
                  src={URL.createObjectURL(file)} // Use URL.createObjectURL to display the selected file
                  alt={`Background`}
                  width={50}
                  height={50}
                />
                <button
                  className="absolute top-[-15px] right-[-10px]   rounded-full"
                  onClick={removeFile}
                  disabled={backgroundLoader}
                >
                  <TiDelete size={40} />
                </button>
              </div>
            )}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex justify-between items-center mx-auto">
            <button
              className="bg-primary mt-[120px] py-2 rounded-full px-14 text-white"
              type="button"
              onClick={submitHandler}
              disabled={backgroundLoader}
            >
              Submit{" "}
              {backgroundLoader && <ImSpinner8 className="spinning-icon" />}
            </button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
