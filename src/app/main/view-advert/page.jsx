"use client";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogBody,
} from "@/components/ui/alert-dialog";
import { MdClose } from "react-icons/md";
import { RiFlagFill } from "react-icons/ri";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdvertProcesByIdAction,
  flageImageAction,
  downloadAdvertImagesAction,
  downloadZipFileAction,
} from "@/store/createAdvert/createAdvertThunk";
import { baseDomain } from "@/utils/axios";
import { Skeleton } from "@/components/ui/skeleton";
import { createLogoAction, getLogoAction } from "@/store/uploadLogo/logoThunk";
import placeholder from "../../../../public/placeholder.png";
import { getCookie } from "cookies-next";
const ViewAdvert = ({ searchParams }) => {
  const dispatch = useDispatch();
  const { processAdvert, advertLoader } = useSelector((state) => state?.advert);
  const { logo } = useSelector((state) => state?.logo);
  let userString = getCookie("user");
  let user = userString ? JSON.parse(userString) : null;
  const [advert, setAdvert] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    setAdvert([processAdvert]);
  }, [processAdvert]);
  useEffect(() => {
    dispatch(getAdvertProcesByIdAction(searchParams?.advertId));
  }, [searchParams?.advertId]);

  useEffect(() => {
    dispatch(getLogoAction(user?.UserId));
  }, [user?.UserId]);
  const handleOptionChange = async (e) => {
    setSelectedOption(e.target.value);
    console.log("LogoPosition", e.target.value);
    const formData = new FormData();
    formData.append("UserId", user?.UserId);
    formData.append("LogoPosition", e.target.value);
    formData.append("Logo", "");
    formData.append("DownloadFormat", null);

    await dispatch(
      createLogoAction({
        formData,
        onSuccess: () => {
          dispatch(getLogoAction(user?.UserId));
          selectedOption("");
        },
      })
    );
  };

  const downloadHandler = () => {
    dispatch(downloadAdvertImagesAction(searchParams?.advertId)).then(
      (response) => {
        const data = response?.payload;
        downloadFile(
          `${baseDomain}get-file?filename=${data}
      `,
          "Advert"
        );
      }
    );
  };
  async function downloadFile(url, fileName) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;

      // Append the link to the body
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Remove the link from the DOM
      document.body.removeChild(link);
    } catch (error) {}
  }

  const flageImageHandle = (e, Id, ImageUniqueId, index) => {
    e.preventDefault();
    const uniqueImageId = ImageUniqueId[index].UniqueImageId;
    var payload = {
      AdvertId: Id,
      UniqueImageId: uniqueImageId,
    };
    dispatch(flageImageAction(payload));
  };
  return (
    <AlertDialog>
      <div className="bg-site_secondary md:mx-2 lg:mx-8 my-4 md:px-2 lg:px-8 py-3 rounded-2xl">
        {advert.length > 0 ? (
          <>
            <div className="2xl:grid 2xl:grid-cols-12 lg:grid lg:grid-cols-12 sm:grid sm:grid-cols-12 gap-x-3 px-2">
              <div className="2xl:col-span-8 lg:col-span-7 md:col-span-6 sm:col-span-4 flex items-center">
                <h2 className=" sm:text-md mb-4 font-medium lg:text-[15px] xl:text-[20px] 2xl:text-[25px]">
                  View Advert
                </h2>
              </div>
              <div className="2xl:col-span-2 lg:col-span-2 md:col-span-3 sm:col-span-4 flex items-center ">
                <button
                  onClick={downloadHandler}
                  className="bg-primary text-whitee  rounded-full py-2 w-full  text-sm sm:text-md lg:text-[13px] xl:text-[15px] 2xl:text-[20px]  mb-1"
                >
                  Download All
                </button>
              </div>
              <div className="2xl:col-span-2 lg:col-span-3 md:col-span-3 sm:col-span-4 flex justify-end items-center">
                <span className="text-primary text-sm sm:text-md lg:text-[12px] xl:text-[14px] 2xl:text-[19px] font-medium">
                  Advert ID:{" "}
                </span>
                <span className="text-primary text-sm sm:text-md font-medium lg:text-[13px] xl:text-[15px] 2xl:text-[20px]">
                  {" " + searchParams?.advertId}
                </span>
              </div>
            </div>
            {advert &&
              advert.map((item, index) =>
                item?.Images?.Images?.map((img, i) => (
                  <div
                    key={index}
                    className="bg-whitee px-4 rounded-2xl py-4 my-3"
                  >
                    <div
                      key={i}
                      className="lg:grid lg:grid-cols-12 sm:grid sm:grid-cols-12 gap-2 lg:gap-x-6 gap-y-2 "
                    >
                      <div className="lg:col-span-9 md:col-span-12 sm:col-span-12 mb-1">
                        <div className="lg:grid lg:grid-cols-12 sm:grid sm:grid-cols-12 gap-2 gap-x-6 gap-y-2">
                          <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 mb-1">
                            <Image
                              className="w-full cover-fit rounded-xl"
                              src={`${baseDomain}get-file?filename=${img.Original}`}
                              alt={"OrignalImage"}
                              width={1600}
                              height={1600}
                              // className="w-full h-full object-cover rounded-2xl"
                            />
                          </div>
                          <div className="lg:col-span-6 md:col-span-6 sm:col-span-6  relative mb-1">
                            <Image
                              className="w-full cover-fit rounded-xl"
                              height={1600}
                              width={1600}
                              src={`${baseDomain}get-file?filename=${img.Processed}`}
                              // src={testimage2}
                              alt=""
                            />
                            {logo?.DisplayLogo && (
                              <Image
                                className={` h-[50px] w-[120px] absolute  cover-fit rounded-lg
                           ${
                             logo?.LogoPosition === "top-right"
                               ? "right-[10px] top-[10px]"
                               : logo?.LogoPosition === "top-left"
                               ? "left-[10px] top-[10px]"
                               : logo?.LogoPosition === "bottom-left"
                               ? "bottom-[10px] left-[10px]"
                               : "bottom-[10px] right-[10px]"
                           }`}
                                // src={`${baseDomain}get-file?filename=${logo?.Logo}`}
                                src={
                                  logo?.Logo !== undefined && logo?.Logo
                                    ? `${baseDomain}get-file?filename=${logo?.Logo}`
                                    : placeholder
                                }
                                alt="Logo"
                                height={900}
                                width={1600}
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-3 md:col-span-12 sm:col-span-12 ml-4">
                        <div className="lg:grid lg:grid-cols-12 sm:grid sm:grid-cols-12 gap-x-3 gap-y-1 lg:gap-y-1 xl:gap-y-2 2xl:gap-y-8">
                          <div className="lg:col-span-12 md:col-span-4 sm:col-span-6 mb-1">
                            <button className="bg-primary text-whitee  w-full rounded-full py-2 px-2   sm:text-[12px] md:text-[12px] lg:text-[12px] xl:text-[15px] 2xl:text-[20px]">
                              Edit Background Position
                            </button>
                          </div>
                          <div className="lg:col-span-12 md:col-span-4 sm:col-span-6 mb-1">
                            <AlertDialogTrigger className="bg-whitee text-black border rounded-full py-2 w-full  mx-auto text-sm sm:text-md lg:text-[13px] xl:text-[15px] 2xl:text-[20px]">
                              {/* <AlertDialogTrigger> */}
                              Crop / Trim
                              {/* </AlertDialogTrigger> */}
                            </AlertDialogTrigger>
                          </div>
                          <div className="lg:col-span-12 md:col-span-4 sm:col-span-6 mb-1">
                            <button className="bg-whitee text-site_red border rounded-full py-2 w-full  text-sm sm:text-md lg:text-[13px] xl:text-[15px] 2xl:text-[20px]">
                              Reprocess
                            </button>
                          </div>
                          <div className="lg:col-span-12 md:col-span-4 sm:col-span-6 flex items-center mb-1 lg:text-[13px] xl:text-[15px] 2xl:text-[20px]">
                            <span className="text-sm sm:text-md font-medium">
                              Logo:
                            </span>
                            <select
                              className="bg-white text-black border text-center rounded-full py-2 w-full text-sm sm:text-md lg:text-[13px] xl:text-[15px] 2xl:text-[20px] ml-4 mb-1 cursor-pointer  custom-select"
                              value={selectedOption}
                              onChange={handleOptionChange}
                            >
                              <option name="" value="">
                                Position
                              </option>
                              <option name="top-left" value="top-left">
                                Top Left
                              </option>
                              <option name="top-right" value="top-right">
                                Top Right
                              </option>
                              <option name="bottom-left" value="bottom-left">
                                Bottom Left
                              </option>
                              <option name="bottom-right" value="bottom-right">
                                Bottom Right
                              </option>
                            </select>
                          </div>
                          <div className="lg:col-span-12 md:col-span-4 sm:col-span-12 flex items-center ml-4 ">
                            <RiFlagFill className="text-site_red" size={15} />
                            <a
                              href="#"
                              onClick={(e) =>
                                flageImageHandle(
                                  e,
                                  item?.Id,
                                  item?.Images?.Images,
                                  i
                                )
                              }
                              className="ml-4 text-sm sm:text-md text-site_red"
                            >
                              Flag Image
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
          </>
        ) : advertLoader ? (
          <div className="bg-whitee px-4 py-3 rounded-2xl my-3">
            <div className="lg:grid lg:grid-cols-12 sm:grid sm:grid-cols-12 gap-x-6 ">
              <div className="lg:col-span-9 md:col-span-12 sm:col-span-12 mb-1">
                <div className="lg:grid lg:grid-cols-12 sm:grid sm:grid-cols-12 gap-x-6  ">
                  <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 mb-1">
                    <Skeleton className="rounded-lg h-[200px] w-full" />
                  </div>
                  <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 mb-1">
                    <Skeleton className="rounded-lg h-[200px] w-full" />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 md:col-span-12 sm:col-span-12 flex items-center justify-center">
                <div className="flex flex-col justify-between items-center">
                  <Skeleton className="rounded-lg h-[100px] w-full" />
                  <Skeleton className="rounded-lg h-[100px] w-full" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-row justify-center items-center min-h-[400px]">
            <span>No Data Found</span>
          </div>
        )}
      </div>
      <AlertDialogContent className={`overflow-y-auto h-[80vh] lg:h-[95vh]`}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {/* This div is for just Heading or title */}
            <div className="text-[40px] text-center font-normal flex justify-between pb-[20px] pt-[15px]">
              <p>Shift Background</p>
              <button>
                <AlertDialogCancel className="border-0">
                  <MdClose size={35} />
                </AlertDialogCancel>
              </button>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex justify-between items-center mx-auto">
            <AlertDialogAction className="bg-primary mt-[120px] py-2 rounded-full px-14 text-white">
              Save and Reprocess Image
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ViewAdvert;
