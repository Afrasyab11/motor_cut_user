"use client";
import Image from "next/image";
import Link from "next/link";
// import { baseDomain } from "@/repository/repository";
import { axiosInstance } from "@/utils/axios";
import {
  downloadAdvertImagesAction,
  downloadAllAdvertImagesAction,
} from "@/store/createAdvert/createAdvertThunk";
import { useDispatch, useSelector } from "react-redux";
import { SkeletonCard } from "../skeleton/SkeletonCard";
import { baseDomain } from "@/utils/axios";
import { getCookie } from "cookies-next";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function AdvertCard({ data, showCard }) {
  const dispatch = useDispatch();
  const router = useRouter();
  let userString = getCookie("user");
  const { advertLoader } = useSelector((state) => state?.advert);
  let user = userString ? JSON.parse(userString) : null;
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
    router.push(`/main/view-advert/?advertId=${item.UniqueAdvertisementId}`)
    // router.push({
    //   pathname: "/main/view-advert",
    //   query: { advertId: item.UniqueAdvertisementId },
    // });
  };
  return (
    <div
      className={`lg:grid md:grid sm:grid  ${
        showCard % 2 !== 0
          ? "lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-4 "
          : "lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-4 "
      }`}
    >
      {data.length > 0 ? (
        data?.slice(0, showCard).map((item, index) => (
          <div
            key={index}
            className="lg:grid lg:grid-cols-12 md:grid md:grid-cols-12 sm:gird sm:grid-cols-12 bg-whitee gap-3 gap-y-2 p-4 rounded-2xl mb-5 shadow-xl"
          >
            {/* Image Section */}
            <div className="col-span-5 mb-2">
              <div className="rounded-2xl">
                <Image
                  src={`${baseDomain}get-file?filename=${item?.Images?.Images[0]?.Original}`}
                  alt={"BackgroundLibrary"}
                  width={1600}
                  height={900}
                  // className="w-full h-full object-cover rounded-2xl"
                  className="w-full lg:min-h-[120px] lg:max-h-[120px] object-cover rounded-2xl"
                />
              </div>
            </div>
            {/* Details Section */}
            <div className="col-span-7 mb-2 ">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 gap-y-2 mt-2 sm:mt-2 mb-1 lg:m-0">
                <div>
                  <span className="text-sm sm:text-md">Label:</span>
                </div>
                <div>
                  <p className="text-sm sm:text-md truncate">{item?.Label}</p>
                </div>
                <div>
                  <p className="text-sm sm:text-md truncate">Date:</p>
                </div>
                <div>
                  <p className="text-sm sm:text-md truncate">{item?.Date}</p>
                </div>
                <div>
                  <span className="text-sm sm:text-md">Time:</span>
                </div>
                <div>
                  <span className="text-sm sm:text-md">{item?.Time}</span>
                </div>
                <div>
                  <p className="text-sm sm:text-md truncate">No of Images:</p>
                </div>
                <div>
                  <span className="text-sm sm:text-md">
                    {item.Images?.Images?.length}
                  </span>
                </div>
              </div>
            </div>
            {/* Status Section */}
            <div className="lg:col-span-5 md:col-span-12 sm:col-span-12 flex justify-center mb-1  md:m-0">
              <div className="lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 w-full lg:w-32">
                <p
                  className={` col-span-4 rounded-full w-full text-center text-sm sm:text-md py-1 m-0 ${
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
                  {/* <Link
                    href={{
                      pathname: "/main/view-advert",
                      query: { advertId: item.UniqueAdvertisementId },
                    }}
                  > */}
                  <button
                    onClick={() => {
                      handleButtonClick(item);
                    }}
                    className="text-primary border w-full rounded-full  py-1 text-sm sm:text-md "
                  >
                    View Images
                  </button>
                  {/* </Link> */}
                </div>
                <div className="lg:col-span-6 md:col-span-12  sm:col-span-12">
                  <button
                    onClick={(e) => downloadImagesHandler(e, item)}
                    className="text-whitee bg-primary  w-full rounded-full  py-1 text-sm sm:text-md "
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : advertLoader ? (
        [...Array(showCard)].map((_, index) => <SkeletonCard key={index} />)
      ) : (
        <span>No Data Found</span>
      )}
    </div>
  );
}
