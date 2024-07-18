"use client";
import Image from "next/image";
import Link from "next/link";
// import { baseDomain } from "@/repository/repository";
import { axiosInstance } from "@/utils/axios";
import {
  downloadAdvertImagesAction,
  getActivityChartAction,
  getAdvertAction,
} from "@/store/createAdvert/createAdvertThunk";
import { useDispatch, useSelector } from "react-redux";
import { SkeletonCard } from "../skeleton/SkeletonCard";
import { baseDomain } from "@/utils/axios";
import { getCookie } from "cookies-next";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import InprogressImage from "./../../assets/images/spinner.gif";
import notProcess from "./../../assets/images/notProcess.gif";
import Failed from "./../../assets/images/Failed.gif";
// import notProcess from "./../../assets/images/spiinner.gif";
import { Button } from "../ui/button";
import { dashboardStatsAction } from "@/store/dashboard/dashboardThunk";
import { ImSpinner8 } from "react-icons/im";
import { logoutUser } from "@/store/user/userSlice";
export default function AdvertCard({ data, showCard }) {
  //  data = []
  const dispatch = useDispatch();
  const router = useRouter();
  let userString = getCookie("user");
  let user = userString ? JSON.parse(userString) : null;
  const { advertLoader } = useSelector((state) => state?.advert);
  const [loader, setLoader] = useState(true);
  const [loading, setLoading] = useState(Array(data.length).fill(false));
  const { logo } = useSelector((state) => state.logo);

  useEffect(() => {
    setTimeout(() => {
      if (data.length != 0) {
        setLoader(false);
      } else {
        setLoader(false);
      }
    }, 1000);
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      const inProgressDetails = data.filter(
        (item) => item?.Status === "InProgress"
      );
      if (inProgressDetails.length > 0) {
        dispatch(
          getAdvertAction({
            userId: user?.UserId,
            onSuccess: () => {
              dispatch(
                dashboardStatsAction({
                  UserId: user?.UserId,
                  onNotAuthicate: () => {
                    dispatch(logoutUser());
                    router.push("/auth/login");
                  },
                })
              );
              dispatch(
                getActivityChartAction({
                  UserId: user?.UserId,
                  onNotAuthicate: () => {},
                })
              );
            },
          })
        );
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [data]);

  const downloadImagesHandler = async (e, item, index) => {
    setLoading((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
    try {
      const response = await dispatch(
        downloadAdvertImagesAction({
          Id: item?.UniqueAdvertisementId,
          onNotAuthicate: () => {
            dispatch(logoutUser());
            router.push("/auth/login");
          },
        })
      );
      console.log("response", response);
      if (response?.payload !== undefined) {
        const data = response?.payload;
        await downloadFile(
          `${baseDomain}Get-Advertisement-Zip-File?FilePath=${data}`,
          `${item?.Label + " Advert"}`
        );
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    } finally {
      setLoading((prev) => {
        const newState = [...prev];
        newState[index] = false;
        return newState;
      });
    }
  };

  async function downloadFile(url, fileName) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }
  const handleButtonClick = (item) => {
    if (!(item?.Status == "Completed")) {
      toast.warning("Not Completed Yet..!");
      return;
    }
    router.push(`/main/view-advert/?advertId=${item?.UniqueAdvertisementId}`);
    // router.push({
    //   pathname: '/main/view-advert',
    //   query: { advertId:item.UniqueAdvertisementId },
    // });
  };
  return (
    <div
      className={`lg:grid md:grid sm:grid  ${
        showCard % 2 !== 0
          ? "lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 gap-x-2 gap-y-4 px-2"
          : "lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-4 px-2 "
      }`}
    >
      {data.length > 0 ? (
        data?.slice(0, showCard)?.map((item, index) => (
          <div
            key={index}
            className="lg:grid lg:grid-cols-12 md:grid md:grid-cols-12 sm:gird sm:grid-cols-12 bg-whitee gap-3 gap-y-2 p-4 rounded-2xl mb-5 shadow-xl"
          >
            {/* Image Section */}
            <div className="sm:col-span-5 relative md:col-span-12 lg:col-span-5 mb-2">
              <div className="aspect-w-16 aspect-h-9 w-full rounded-2xl  min-h-full">
                <Image
                  src={
                    item?.Status == "InProgress"
                      ? InprogressImage
                      : item?.Images?.Images.length === 0
                      ? notProcess
                      : item?.Status === "Failed"
                      ? Failed
                      : `${baseDomain}get-file?filename=${
                          logo.DisplayLogo
                            ? item?.Images?.Images[0]?.LogoImage
                            : item?.Images?.Images[0]?.Processed
                        }`
                  }
                  fill
                  alt={"Advert"}
                  priority={true}
                  className="object-contain w-full h-full rounded-xl "
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="sm:col-span-7 md:col-span-12 lg:col-span-7 mb-2">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-2 gap-2 md:gap-y-2 lg:gap-y-1 xl:gap-y-1 2xl:gap-y-1 3xl:gap-y-4 mt-2 sm:mt-2 mb-1 pt-1 lg:m-0">
                <div>
                  <span className="text-sm sm:text-md lg:text-[13px] xl:text-[13px] 2xl:text-[15px]">
                    Label:
                  </span>
                </div>
                <div>
                  <p className="text-sm sm:text-md truncate lg:text-[13px] xl:text-[13px] 2xl:text-[15px]">
                    {item?.Label || "No Label Found"}
                  </p>
                </div>
                <div>
                  <span className="text-sm sm:text-md lg:text-[13px] xl:text-[13px] 2xl:text-[15px]">
                    Cut Type:
                  </span>
                </div>
                <div>
                  <p className="text-sm sm:text-md truncate lg:text-[13px] xl:text-[13px] 2xl:text-[15px]">
                    {item?.CutType}
                  </p>
                </div>
                <div>
                  <p className="text-sm sm:text-md truncate lg:text-[13px] xl:text-[13px] 2xl:text-[15px]">
                    Date:
                  </p>
                </div>
                <div>
                  <p className="text-sm sm:text-md truncate lg:text-[13px] xl:text-[13px] 2xl:text-[15px]">
                    {item?.Date}
                  </p>
                </div>
                <div>
                  <span className="text-sm sm:text-md lg:text-[13px] xl:text-[13px] 2xl:text-[15px]">
                    Time:
                  </span>
                </div>
                <div>
                  <span className="text-sm sm:text-md lg:text-[13px] xl:text-[13px] 2xl:text-[15px]">
                    {item?.Time}
                  </span>
                </div>
                <div>
                  <p className="text-sm sm:text-md truncate lg:text-[13px] xl:text-[13px] 2xl:text-[15px]">
                    Number of Images:
                  </p>
                </div>
                <div>
                  <span className="text-sm sm:text-md lg:text-[13px] xl:text-[13px] 2xl:text-[15px]">
                    {item?.Status === "InProgress"
                      ? `...`
                      : item?.Status === "Failed"
                      ? 0
                      : item.Images?.Images?.length}
                  </span>
                </div>
              </div>
            </div>
            {/* Status Section */}
            <div className="lg:col-span-5 md:col-span-12 sm:col-span-12 flex justify-center mb-1  md:m-0">
              <div className="lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 w-full lg:w-32">
                <p
                  className={` col-span-4 rounded-full w-full text-center text-sm sm:text-md lg:text-[13px] xl:text-[13px] 2xl:text-[15px] py-1 lg:py-1 xl:py-1 2xl:py-1 3xl:py-2 m-0 ${
                    item?.Status == "Completed"
                      ? "bg-site_green text-whitee"
                      : item?.Status === "InProgress"
                      ? "bg-site_orange text-primary[dark]"
                      : "text-red-500 bg-white border border-red-500"
                  }`}
                >
                  {item?.Status == "Completed"
                    ? "Complete"
                    : item?.Status === "InProgress"
                    ? "In Progress"
                    : "Failed"}
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 md:col-span-12 sm:col-span-12 ">
              <div className="lg:grid lg:grid-cols-12 md:grid md:grid-cols-12 sm:grid sm:grid-cols-12 gap-x-3 gap-y-1">
                <div className="lg:col-span-6 md:col-span-12 sm:col-span-12 mb-1 sm:m-0 md:m-0">
                  {/* <Link
                    href={{
                      pathname: "/main/view-advert",
                      query: { advertId: item.UniqueAdvertisementId },
                    }}
                  > */}
                  <Button
                    onClick={() => {
                      handleButtonClick(item);
                    }}
                    disabled={
                      item?.Images?.Images?.length === 0 ||
                      item?.Status === "InProgress" ||
                      item?.Status === "Failed"
                    }
                    className="text-primary bg-white hover:bg-white h-7 border w-full rounded-full  py-1  lg:py-1 xl:py-1 2xl:py-2 3xl:py-2 text-sm sm:text-md lg:text-[13px] xl:text-[13px] 2xl:text-[15px]"
                  >
                    View Images
                  </Button>
                  {/* </Link> */}
                </div>
                <div className="lg:col-span-6 md:col-span-12  sm:col-span-12">
                  <Button
                    disabled={
                      item?.Images?.Images?.length === 0 ||
                      item?.Status === "InProgress" ||
                      loading[index] ||
                      item?.Status === "Failed"
                    }
                    onClick={(e) => downloadImagesHandler(e, item, index)}
                    className="text-whitee bg-[#7739e0] h-7  w-full rounded-full  py-1 lg:py-1 xl:py-1 2xl:py-2 3xl:py-2 text-sm sm:text-md lg:text-[13px] xl:text-[13px] 2xl:text-[15px]"
                  >
                    {loading[index] ? (
                      <ImSpinner8 className="spinning-icon" />
                    ) : (
                      "Download"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : loader ? (
        [...Array(showCard)].map((_, index) => <SkeletonCard key={index} />)
      ) : data.length === 0 ? (
        <span>No Data Found</span>
      ) : (
        ""
      )}
    </div>
  );
}
