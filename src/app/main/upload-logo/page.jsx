"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Select,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import {
  createLogoAction,
  getLogoAction,
  removeUserLogoAction,
} from "@/store/uploadLogo/logoThunk";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadLogoSchema } from "@/schemas/uploadLogoSchema";
import placeholder from "../../../../public/placeholder.png";
import { ImSpinner8 } from "react-icons/im";
import { baseDomain } from "@/utils/axios";
import { getCookie } from "cookies-next";
import { logoutUser } from "@/store/user/userSlice";
import { useRouter } from "next/navigation";

const UploadLogo = () => {
  const router=useRouter();
  const dispatch = useDispatch();
  const { logo, logoLoader, getLogoLoader, removeLogoLoader } = useSelector(
    (state) => state.logo
  );
  let userString = getCookie("user");
  let user = userString ? JSON.parse(userString) : null;
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [selectedValue, setSelectedValue] = useState("top-right");
  const [selectedFormat, setSelectedFormat] = useState("jpg");
  const [coversStatus, setCoversStatus] = useState("off");

  useEffect(() => {
    dispatch(getLogoAction({UserId:user?.UserId,onNotAuthicate:()=>{
      dispatch(logoutUser())
      router.push('/auth/login')
    }
  }));
  }, []);

  useEffect(() => {
    if (logo && logo?.LogoPosition) {
      setSelectedValue(logo.LogoPosition);
    }
  }, [logo]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const onSubmit = (e) => {
    const formData = new FormData();
    formData.append("UserId", user?.UserId);
    formData.append("LogoPosition", selectedValue);
    formData.append("DownloadFormat", selectedFormat);
    if (selectedFile) {
      formData.append("Logo", selectedFile);
    }
    dispatch(
      createLogoAction({
        formData,
        onSuccess: () => {
          // document.getElementById("logo").value = "";
          dispatch(getLogoAction({UserId:user?.UserId,onNotAuthicate:()=>{
            dispatch(logoutUser())
            router.push('/auth/login')
          }
      }));
          setSelectedValue("top-right");
          // setSelectedFile("");
          reset({
            position: "",
          });
        },
        onNotAuthicate:()=>{
          dispatch(logoutUser())
          router.push('/auth/login')
        }
      })
    );
  };

  const removeHandler = () => {
    dispatch(
      removeUserLogoAction({
        UserId: user?.UserId,
        onSuccess: () => {
          setSelectedFile("");
          dispatch(getLogoAction({UserId:user?.UserId,onNotAuthicate:()=>{
            dispatch(logoutUser())
            router.push('/auth/login')
          }
      }));
        },
        onNotAuthicate:()=>{
          dispatch(logoutUser())
          router.push('/auth/login')
        }
      })
    );
  };

  return (
    <>
      <main className="upload-logo-section sm:m-1 md:m-3">
        <section className="bg-gray-100 rounded-2xl w-full  pb-2  md:w-2/2 my-3 px-2 ">
          <CardHeader>
            <h2 className="md:text-[20px] lg:text-[30px] py-3 font-medium tracking-normal">
              Upload Logo
            </h2>
          </CardHeader>
          <CardContent>
            <div className="bg-white rounded-2xl mt-2 p-2 h-full w-full ">
              {/* {logo?.Logo !== undefined && logo?.Logo ? ( */}
              <Image
                src={
                  selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : logo?.Logo !== null && logo?.Logo
                    ? `${baseDomain}get-file?filename=${logo?.Logo}`
                    : placeholder
                }
                alt="logo"
                width={900}
                height={600}
                id="logo"
                className=" aspect-video max-h-[300px] object-contain w-full rounded"
              />

              <input
                type="file"
                id="logo"
                name="logo"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e)}
              />
            </div>
          </CardContent>
        </section>
        <div className="md:grid md:grid-cols-12 lg:grid lg:grid-cols-12 gap-3 ">
          <div className="lg:col-span-6 md:col-span-12 bg-gray-100 rounded-2xl  my-3 px-2 py-3">
            <CardFooter className="flex basis-1/2 gap-4 items-end px-0 md:px-3 pt-2">
              <Button
                type="button"
                className="text-white bg-primary rounded-full w-3/6 "
                onClick={() => fileInputRef.current.click()}
              >
                Upload Logo
              </Button>
              {/* </label> */}
              <div className="w-3/6 flex flex-col ">
                <p className="text-sm font-medium text-primary-dark  my-auto min-w-[100px] text-wrap">
                  Set Position:
                </p>
                <Select
                  value={selectedValue}
                  // {...field}
                  className="border-none "
                  onValueChange={(val) => {
                    // field.onChange(val);
                    setSelectedValue(val);
                  }}
                >
                  <SelectTrigger className="w-full h-10  md:min-w-40  border border-gray-500 rounded-full text-primary-dark">
                    <SelectValue placeholder={selectedValue} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {/* <SelectLabel>Positions</SelectLabel> */}
                      <SelectItem value="top-right">Top Right</SelectItem>
                      <SelectItem value="top-center">Top Center</SelectItem>
                      <SelectItem value="top-left">Top Left</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </CardFooter>
            <CardHeader className="pl-0 sm:mt-3 md:px-3">
              <h2 className="md:text-[20px]  lg:text-[30px] font-medium tracking-normal">
                Download Format
              </h2>
            </CardHeader>
            <CardContent className="flex basis-1/2 justify-center gap-4">
              <Button
                type="button"
                className={`text-white w-3/6 ${
                  selectedFormat === "jpg" ? "bg-primary" : "bg-gray-300"
                } rounded-full w-full`}
                onClick={(e) => {
                  e.preventDefault(); // Prevent default action
                  e.stopPropagation(); // Stop the event from propagating to parent elements
                  setSelectedFormat("jpg");
                }}
              >
                JPG
              </Button>
              <Button
                type="button"
                className={`text-white w-3/6 ${
                  selectedFormat === "png" ? "bg-primary" : "bg-gray-300"
                } rounded-full w-full`}
                onClick={(e) => {
                  e.preventDefault(); // Prevent default action
                  e.stopPropagation(); // Stop the event from propagating to parent elements
                  setSelectedFormat("png");
                }}
              >
                PNG
              </Button>
            </CardContent>

            <CardContent className="flex basis-1/2 justify-center items-center gap-4 pt-5 mt-2">
              <Button
                type="button"
                disabled={logoLoader}
                className={`text-white bg-primary rounded-full  w-3/6`}
                onClick={onSubmit}
              >
                Save {logoLoader && <ImSpinner8 className="spinning-icon" />}
              </Button>
              {logo && logo?.Logo !== null && (
                <Button
                  type="button"
                  disabled={removeLogoLoader}
                  className={`text-white bg-[#ef4444] hover:bg-[#ef4444] rounded-full w-3/6 `}
                  onClick={removeHandler}
                >
                  Remove{" "}
                  {removeLogoLoader && <ImSpinner8 className="spinning-icon" />}
                </Button>
              )}
            </CardContent>
          </div>
          <div className="lg:col-span-6 md:col-span-12  bg-gray-100 rounded-2xl py-2 px-2  my-3">
            <CardHeader className="pl-0 md:px-3">
              <h2 className="md:text-[20px] lg:text-[30px] font-medium tracking-normal">
                License Plate Covers (coming soon)
              </h2>
            </CardHeader>
            <CardContent className="flex basis-1/2 justify-center  gap-4 px-0 md:px-3  pt-5">
              <Button
                type="button"
                disabled={true}
                className={`text-white border-primary-dark rounded-full w-full ${
                  coversStatus === "on" ? "bg-primary " : "bg-gray-300"
                }`}
                onClick={() => setCoversStatus("on")}
              >
                On
              </Button>
              <Button
                type="button"
                disabled={true}
                className={`text-white rounded-full w-full ${
                  coversStatus === "off" ? "bg-primary" : "bg-gray-300"
                }`}
                onClick={() => setCoversStatus("off")}
              >
                Off
              </Button>
            </CardContent>
          </div>
        </div>
      </main>
    </>
  );
};

export default UploadLogo;
