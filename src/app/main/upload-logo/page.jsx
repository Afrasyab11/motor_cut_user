"use client";
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
import { createLogoAction, getLogoAction,removeUserLogoAction } from "@/store/uploadLogo/logoThunk";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadLogoSchema } from "@/schemas/uploadLogoSchema";
import placeholder from "../../../../public/placeholder.png";
import { ImSpinner8 } from "react-icons/im";
import { baseDomain } from "@/utils/axios";
import { getCookie } from "cookies-next";

const UploadLogo = () => {
  const dispatch = useDispatch();
  const { logo, logoLoader, getLogoLoader,removeLogoLoader } = useSelector(
    (state) => state.logo
  );
  let userString = getCookie("user");
  let user = userString ? JSON.parse(userString) : null;
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("jpg");
  const [coversStatus, setCoversStatus] = useState("off");
  useEffect(() => {
    dispatch(getLogoAction(user?.UserId));
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(uploadLogoSchema),
  });
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
          dispatch(getLogoAction(user?.UserId));
          setSelectedValue("");
          // setSelectedFile("");
          reset({
            position: "",
          });
        },
      })
    );
  };

  const removeHandler = () => {
    dispatch(
      removeUserLogoAction({
        UserId: user?.UserId,
        onSuccess: () => {
          setSelectedFile("");
          dispatch(getLogoAction(user?.UserId));
        },
      })
    );
  };
  return (
    <>
      {/* logo uploader */}
      {/* remove bg-colors after completion */}
      <main className="upload-logo-section">
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="bg-gray-100 rounded-2xl w-full  md:w-1/2 my-3 px-2 ">
              <CardHeader>
                <h2 className="md:text-[20px] lg:text-[30px] font-medium tracking-normal">
                  Upload Logo
                </h2>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-2xl mt-2 p-6">
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
                    className="rounded-lg w-full h-full max-h-36 object-contain"
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
              <CardFooter className="grid place-items-end ">
                <Button
                  type="button"
                  className="text-white bg-primary rounded-full w-full xs:max-w-28 sm:max-w-28 md:max-w-40 "
                  onClick={() => fileInputRef.current.click()}
                >
                  Upload Logo
                </Button>
                {/* </label> */}
                <div className="py-2 flex mt-3">
                  <p className="text-sm font-medium text-primary-dark  my-auto min-w-[100px] text-wrap">
                    Set Position:
                  </p>
                  <Controller
                    name="position"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        className="border-none "
                        onValueChange={(val) => {
                          field.onChange(val);
                          setSelectedValue(val);
                        }}
                      >
                        <SelectTrigger className="w-full md:min-w-40  border border-gray-500 rounded-full text-primary-dark">
                          <SelectValue placeholder="Position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Positions</SelectLabel>
                            <SelectItem value="top-left">Top Left</SelectItem>
                            <SelectItem value="top-right">Top Right</SelectItem>
                            <SelectItem value="bottom-left">
                              Bottom Left
                            </SelectItem>
                            <SelectItem value="bottom-right">
                              Bottom Right
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                {errors.position && (
                  <small className="text-red-500">
                    {"Position is required"}
                  </small>
                )}
              </CardFooter>
              <CardHeader>
                <h2 className="md:text-[20px] lg:text-[30px] font-medium tracking-normal">
                  Download Format
                </h2>
              </CardHeader>
              <CardContent>
                <div className="flex basis-1/2 justify-center">
                  <label className="radio-label w-1/2 mx-2">
                    <input
                      type="radio"
                      name="downloadFormat"
                      value="jpg"
                      className="hidden"
                      onChange={() => setSelectedFormat("jpg")}
                      checked={selectedFormat === "jpg"}
                    />
                    <Button
                      className={`text-white ${
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
                  </label>
                  <label className="radio-label w-1/2 mx-2">
                    <input
                      type="radio"
                      name="downloadFormat"
                      value="png"
                      className="hidden"
                      onChange={() => setSelectedFormat("png")}
                      checked={selectedFormat === "png"}
                    />
                    <Button
                      className={`text-white ${
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
                  </label>
                </div>
              </CardContent>
              <CardContent className="flex basis-1/2 justify-center items-center gap-x-4 pt-5">
                <Button
                  disabled={logoLoader}
                  className={`text-white bg-primary rounded-full w-3/6`}
                >
                  Save{" "}
                  {logoLoader && <ImSpinner8 className="spinning-icon" />}
                </Button>
                {logo && logo?.Logo !== null && (
                  <Button
                    type="button"
                    disabled={removeLogoLoader}
                    className={`text-white bg-primary rounded-full w-3/6 `}
                    onClick={removeHandler}
                  >
                    Remove{" "}
                    {removeLogoLoader && (
                      <ImSpinner8 className="spinning-icon" />
                    )}
                  </Button>
                )}
              </CardContent>
          </section>
        
        </form>
        {/* License Plate covers */}
        <section className="bg-gray-100 rounded-2xl sm:w-2/3 md:w-1/2 my-3">
          <Card>
            <CardHeader>
              <h2 className="md:text-[20px] lg:text-[30px] font-medium tracking-normal">
                License Plate Covers (coming soon)
              </h2>
            </CardHeader>
            <CardContent>
              <div className="flex basis-1/2 justify-center">
                <label className="radio-label w-1/2 mx-2">
                  <input
                    type="radio"
                    name="coversStatus"
                    value="on"
                    className="hidden"
                    onChange={() => setCoversStatus("on")}
                    checked={coversStatus === "on"}
                  />
                  <Button
                    className={`text-white border-primary-dark rounded-full w-full ${
                      coversStatus === "on" ? "bg-primary " : "bg-gray-300"
                    }`}
                    onClick={() => setCoversStatus("on")}
                  >
                    On
                  </Button>
                </label>
                <label className="radio-label w-1/2 mx-2">
                  <input
                    type="radio"
                    name="coversStatus"
                    value="off"
                    className="hidden"
                    onChange={() => setCoversStatus("off")}
                    checked={coversStatus === "off"}
                  />
                  <Button
                    className={`text-white rounded-full w-full ${
                      coversStatus === "off" ? "bg-primary" : "bg-gray-300"
                    }`}
                    onClick={() => setCoversStatus("off")}
                  >
                    Off
                  </Button>
                </label>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
};
export default UploadLogo;
