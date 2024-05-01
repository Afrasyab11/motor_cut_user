"use client";
import Image from "next/image";
import Link from "next/link";
// import { baseDomain } from "@/repository/repository";
import { axiosInstance } from "@/utils/axios";
import {
  downloadAdvertImagesAction,
  downloadAllAdvertImagesAction,
  getAdvertAction,
} from "@/store/createAdvert/createAdvertThunk";
import { useDispatch, useSelector } from "react-redux";
import { SkeletonCard } from "../skeleton/SkeletonCard";
import { baseDomain } from "@/utils/axios";
import { getCookie } from "cookies-next";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import InprogressImage from "./../../assets/images/InProgress.png";
export default function AdvertCard({ data, showCard }) {
  //  data = []
  const dispatch = useDispatch();
  const router = useRouter();
  let userString = getCookie("user");
  let user = userString ? JSON.parse(userString) : null;
  const { advertLoader } = useSelector((state) => state?.advert);
  const [loader, setLoader] = useState(true);

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
      const inProgressDetails = data.filter(item => item?.Status === 'InProgress');
      if (inProgressDetails.length > 0) {
        dispatch(getAdvertAction( user?.UserId));
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [data]);


  const downloadImagesHandler = (e, item) => {
    if (!(item?.Status == "Completed")) {
      toast.warning("Not Completed Yet..!");
      return;
    }
    dispatch(downloadAdvertImagesAction(item?.UniqueAdvertisementId)).then(
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
          ? "lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-4 px-2"
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
            <div className="col-span-5 mb-2">
              <div className="rounded-2xl flex justify-center items-center w-full h-full  ">
                <Image
                  src={
                    item?.Status == "InProgress"
                      ? InprogressImage
                      : `${baseDomain}get-file?filename=${item?.Images?.Images[0]?.Original}`
                  }
                  alt={"Advert"}
                  width={1900}
                  height={600}
                  // className="w-full h-full object-cover rounded-2xl"
                  className=" object-fill rounded-2xl picture "
                />
              </div>
            </div>
            {/* Details Section */}
            <div className="col-span-7 mb-2">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-2 gap-2 md:gap-y-2 lg:gap-y-1 xl:gap-y-1 2xl:gap-y-1 3xl:gap-y-4 mt-2 sm:mt-2 mb-1 pt-1 lg:m-0">
                <div>
                  <span className="text-sm sm:text-md lg:text-[13px] xl:text-[13px] 2xl:text-[20px]">
                    Label:
                  </span>
                </div>
                <div>
                  <p className="text-sm sm:text-md truncate lg:text-[13px] xl:text-[13px] 2xl:text-[20px]">
                    {item?.Label}
                  </p>
                </div>
                <div>
                  <span className="text-sm sm:text-md lg:text-[13px] xl:text-[13px] 2xl:text-[20px]">
                    Cut Type:
                  </span>
                </div>
                <div>
                  <p className="text-sm sm:text-md truncate lg:text-[13px] xl:text-[13px] 2xl:text-[20px]">
                    {item?.CutType}
                  </p>
                </div>
                <div>
                  <p className="text-sm sm:text-md truncate lg:text-[13px] xl:text-[13px] 2xl:text-[20px]">
                    Date:
                  </p>
                </div>
                <div>
                  <p className="text-sm sm:text-md truncate lg:text-[13px] xl:text-[13px] 2xl:text-[20px]">
                    {item?.Date}
                  </p>
                </div>
                <div>
                  <span className="text-sm sm:text-md lg:text-[13px] xl:text-[13px] 2xl:text-[20px]">
                    Time:
                  </span>
                </div>
                <div>
                  <span className="text-sm sm:text-md lg:text-[13px] xl:text-[13px] 2xl:text-[20px]">
                    {item?.Time}
                  </span>
                </div>
                <div>
                  <p className="text-sm sm:text-md truncate lg:text-[13px] xl:text-[13px] 2xl:text-[20px]">
                    No of Images:
                  </p>
                </div>
                <div>
                  <span className="text-sm sm:text-md lg:text-[13px] xl:text-[13px] 2xl:text-[20px]">
                    {item.Images?.Images?.length}
                  </span>
                </div>
              </div>
            </div>
            {/* Status Section */}
            <div className="lg:col-span-5 md:col-span-12 sm:col-span-12 flex justify-center mb-1  md:m-0">
              <div className="lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 w-full lg:w-32">
                <p
                  className={` col-span-4 rounded-full w-full text-center text-sm sm:text-md lg:text-[13px] xl:text-[13px] 2xl:text-[20px] py-1 lg:py-1 xl:py-1 2xl:py-2 3xl:py-2 m-0 ${
                    item?.Status == "Completed"
                      ? "bg-site_green text-whitee"
                      : "bg-site_orange text-primary[dark]"
                  }`}
                >
                  {item?.Status == "Completed" ? "Complete" : "In Progress"}
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 md:col-span-12 sm:col-span-12 ">
              <div className="lg:grid lg:grid-cols-12 md:grid md:grid-cols-12 sm:grid sm:grid-cols-12 gap-x-3 gap-y-1">
                <div className="lg:col-span-6 md:col-span-12 sm:col-span-12 mb-1 sm:m-0 md:m-0">
                  <Link
                    href={{
                      pathname: "/main/view-advert",
                      query: { advertId: item.UniqueAdvertisementId },
                    }}
                  >
                    <button className="text-primary border w-full rounded-full  py-1  lg:py-1 xl:py-1 2xl:py-2 3xl:py-2 text-sm sm:text-md lg:text-[13px] xl:text-[13px] 2xl:text-[20px]">
                      View Images
                    </button>
                  </Link>
                </div>
                <div className="lg:col-span-6 md:col-span-12  sm:col-span-12">
                  <button
                    onClick={(e) => downloadImagesHandler(e, item)}
                    className="text-whitee bg-primary  w-full rounded-full  py-1 lg:py-1 xl:py-1 2xl:py-2 3xl:py-2 text-sm sm:text-md lg:text-[13px] xl:text-[13px] 2xl:text-[20px]"
                  >
                    Download
                  </button>
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
