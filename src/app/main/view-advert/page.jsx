"use client";
import Image from "next/image";
import testimage2 from "../../../../public/Test.jpg";
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
  downloadAllAdvertImagesAction,
  downloadAdvertImagesAction,
} from "@/store/createAdvert/createAdvertThunk";
import { axiosInstance, baseDomain } from "@/utils/axios";
import { getCookie } from "cookies-next";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
const ViewAdvert = ({ searchParams }) => {
  const router=useRouter();
  console.log("searchParams",router)
  const dispatch = useDispatch();
  const { processAdvert, advertLoader } = useSelector((state) => state?.advert);
  const [advert, setAdvert] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Top Left");
  useEffect(() => {
    setAdvert([processAdvert]);
  }, [processAdvert]);
  useEffect(() => {
    dispatch(getAdvertProcesByIdAction(searchParams?.advertId));
  }, [dispatch,searchParams?.advertId]);
  const options = ["Top Left", "Top Right", "Bottom Left", "Bottom Right"];
  let userString = getCookie("user");

  let user = userString ? JSON.parse(userString) : null;
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
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
    console.log("fileName: ", fileName);
    console.log("url: ", url);
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
  const flageImageHandle = (e, item) => {
    e.preventDefault();
    let payload = {
      AdvertId: item.Id,
      UniqueImageId: item.Images.Images[0].UniqueImageId,
    };
    dispatch(flageImageAction(payload));
  };
  return (
    <AlertDialog>
      <div className="bg-site_secondary mx-8 my-4 px-8 py-3 rounded-2xl">
        <div className="lg:grid lg:grid-cols-12 sm:grid sm:grid-cols-12 gap-x-3">
          <div className="lg:col-span-8 md:col-span-6 sm:col-span-4 flex items-center">
            <h2 className="text-lg sm:text-md mb-4 font-medium">View Advert</h2>
          </div>
          <div className="lg:col-span-2 md:col-span-3 sm:col-span-4 flex items-center ">
            <button
              onClick={downloadHandler}
              className="bg-primary text-whitee  rounded-full py-2 w-full  text-sm sm:text-md  mb-1"
            >
              All Download
            </button>
          </div>
          <div className="lg:col-span-2 md:col-span-3 sm:col-span-4 flex items-center">
            <span className="text-primary text-sm sm:text-md font-medium">
              Advert ID:{" "}
            </span>
            <span className="text-primary text-sm sm:text-md font-medium">
              {" " + searchParams?.advertId}
            </span>
          </div>
        </div>
        {advert && advert?.length > 0 ? (
          advert.map((item) =>
            item?.Images?.Images?.map((img, index) => (
              <div
                key={`ViewAdvert-${index}`}
                className="bg-whitee px-4 rounded-2xl py-4 my-3"
              >
                <div className="lg:grid lg:grid-cols-12 sm:grid sm:grid-cols-12 gap-2 gap-x-6 gap-y-2 ">
                  <div className="lg:col-span-9 md:col-span-12 sm:col-span-12 mb-1">
                    <div className="lg:grid lg:grid-cols-12 sm:grid sm:grid-cols-12 gap-2 gap-x-6 gap-y-2">
                      <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 mb-1">
                        <Image
                          className="rounded-lg h-[200px] w-full"
                          height={900}
                          width={1600}
                          src={`${baseDomain}get-file?filename=${img?.Original}`}
                          // src={testimage2}
                          alt=""
                        />
                      </div>
                      <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 mb-1">
                        <Image
                          className="rounded-lg h-[200px] w-full "
                          height={900}
                          width={1600}
                          src={`${baseDomain}get-file?filename=${img.Processed}`}
                          // src={testimage2}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-3 md:col-span-12 sm:col-span-12 ml-4">
                    <div className="lg:grid lg:grid-cols-12 sm:grid sm:grid-cols-12 gap-x-3 gap-y-1">
                      <div className="lg:col-span-12 md:col-span-4 sm:col-span-6 mb-1">
                        <button className="bg-primary text-whitee  w-full rounded-full py-2   text-sm">
                          Edit Background Position
                        </button>
                      </div>
                      <div className="lg:col-span-12 md:col-span-4 sm:col-span-6 mb-1">
                        <AlertDialogTrigger className="bg-whitee text-black border rounded-full py-2 w-full  mx-auto text-sm sm:text-md">
                          {/* <AlertDialogTrigger> */}
                          Crop / Trim
                          {/* </AlertDialogTrigger> */}
                        </AlertDialogTrigger>
                      </div>
                      <div className="lg:col-span-12 md:col-span-4 sm:col-span-6 mb-1">
                        <button className="bg-whitee text-site_red border rounded-full py-2 w-full  text-sm sm:text-md">
                          Reprocess
                        </button>
                      </div>
                      <div className="lg:col-span-12 md:col-span-4 sm:col-span-6 flex items-center mb-1">
                        <span className="text-sm sm:text-md font-medium">
                          Logo:
                        </span>
                        <select
                          className="bg-white text-black border text-center rounded-full py-2 w-full text-sm sm:text-md ml-4 mb-1  custom-select"
                          value={selectedOption}
                          onChange={handleOptionChange}
                        >
                          {options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="lg:col-span-12 md:col-span-4 sm:col-span-12 flex items-center ml-4 ">
                        <RiFlagFill className="text-site_red" size={15} />
                        <a
                          href="#"
                          onClick={(e) => flageImageHandle(e, item)}
                          className="ml-4 text-sm sm:text-md text-site_red"
                        >
                          Flage Image
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )
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
