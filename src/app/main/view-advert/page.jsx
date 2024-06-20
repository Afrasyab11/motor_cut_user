"use client";
import Image from "next/image";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { RiFlagFill } from "react-icons/ri";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdvertProcesByIdAction,
  flageImageAction,
  downloadAdvertImagesAction,
  changeLogoPositionOnProcessImage,
} from "@/store/createAdvert/createAdvertThunk";
import { baseDomain } from "@/utils/axios";
import { Skeleton } from "@/components/ui/skeleton";
import { getLogoAction } from "@/store/uploadLogo/logoThunk";
import placeholder from "../../../../public/placeholder.png";
import { getCookie } from "cookies-next";
import ViewAdvertSkelton from "@/components/skeleton/ViewAdvertSkelton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ShiftBackground from "@/components/modals/ShiftBackgroundModal";
import { Button } from "@/components/ui/button";
import { viewAdvertAction } from "@/store/createAdvert/advertSlice";
const ViewAdvert = ({ searchParams }) => {
  const dispatch = useDispatch();
  const { processAdvert } = useSelector((state) => state?.advert);
  const { logo } = useSelector((state) => state?.logo);
  let userString = getCookie("user");
  let user = userString ? JSON.parse(userString) : null;
  const [selectedImage, setSelectedImage] = useState(null); // State to hold the selected image
  const [open, setOpen] = useState(false); // State to hold the selected image
  const [loading, setLoading] = useState(false);
  const [loader,setLoader]=useState(true)
  const toggle = (item) => {
    console.log("item",item)
    setOpen(!open);
    setSelectedImage(item);

  
  };


  useEffect(() => {
    setLoader(true)
    dispatch(
      getAdvertProcesByIdAction({
        Id: searchParams?.advertId,
        onSuccess: (data) => {
          setLoader(false)
          // setAdvert([data]);
        },
      })
    );
  }, [searchParams?.advertId]);
  useEffect(() => {
    dispatch(getLogoAction(user?.UserId));
  }, [user?.UserId]);

  const handleOptionChange = async (value, imageId, ImagePath) => {
    const formData = new FormData();
    let payload = {
      UniqueAdvertId: imageId,
      ExistingProcessedImagePath: ImagePath,
      LogoPosition: value,
    };
    for (const key in payload) {
      formData.append(key, payload[key]);
    }
    dispatch(
      changeLogoPositionOnProcessImage({
        formData,
        onSuccess: () => {
          dispatch(
            getAdvertProcesByIdAction({
              Id: searchParams?.advertId,
              onSuccess: (data) => {
                // setAdvert([data]);
              },
            })
          );
        },
      })
    );
  };

  const downloadHandler = async (e, item) => {
    setLoading(true);
    try {
      const response = await dispatch(
        downloadAdvertImagesAction(searchParams?.advertId)
      );
      const data = response?.payload;
      await downloadFile(
        `${baseDomain}Get-Advertisement-Zip-File?FilePath=${data}`,
        `Advert`
      );
    } catch (error) {
      console.error("Error downloading file:", error);
    } finally {
      setLoading(false);
    }
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
    dispatch(
      flageImageAction({
        payload,
        onSuccess: () => {
          dispatch(
            getAdvertProcesByIdAction({
              Id: searchParams?.advertId,
              onSuccess: (data) => {
                // setAdvert([data]);
              },
            })
          );
        },
      })
    );
  };
  return (
    <AlertDialog>
      <div className="bg-site_secondary md:mx-2 lg:mx-8 my-4 md:px-2 lg:px-8 py-3 rounded-2xl">
        {processAdvert?.Images?.Images?.length > 0 ? (
          <>
            <div className="2xl:grid 2xl:grid-cols-12 lg:grid lg:grid-cols-12 sm:grid sm:grid-cols-12 gap-x-3 px-2">
              <div className="2xl:col-span-8 lg:col-span-7 md:col-span-6 sm:col-span-4 flex items-center">
                <h2 className=" sm:text-md mb-4 font-medium lg:text-[15px] xl:text-[20px] 2xl:text-[25px]">
                  View Advert
                </h2>
              </div>
              <div className="2xl:col-span-2 lg:col-span-2 md:col-span-3 sm:col-span-4 flex items-center ">
                <button
                  disabled={loading}
                  onClick={downloadHandler}
                  className="bg-primary text-whitee  rounded-full py-2 w-full  text-sm sm:text-md lg:text-[13px] xl:text-[15px] 2xl:text-[20px]  mb-1"
                >
                  {loading ? "Downloading..." : "Download All"}
                </button>
              </div>
              <div className="2xl:col-span-2 lg:col-span-3 md:col-span-3 sm:col-span-4 flex justify-center items-center ">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="text-primary text-sm sm:text-md lg:text-[12px] xl:text-[14px] 2xl:text-[19px] font-medium">
                    Advert ID:{" "}
                  </span>
                  <span className="text-primary text-sm sm:text-md break-words font-medium lg:text-[13px] xl:text-[15px] 2xl:text-[20px]">
                    {" " + searchParams?.advertId}
                  </span>
                </div>
              </div>
            </div>
            {processAdvert &&
              // advert.map((item) =>
                processAdvert?.Images?.Images?.map((img, i) => (
                  <div
                    key={i}
                    className="bg-whitee px-4 rounded-2xl py-4 my-3"
                  >
                    <div
                      key={i}
                      className="lg:grid lg:grid-cols-12 sm:grid sm:grid-cols-12 gap-2 lg:gap-x-6 gap-y-2 "
                    >
                      <div className="lg:col-span-9 md:col-span-12 sm:col-span-12 mb-1">
                        <div className="lg:grid lg:grid-cols-12 sm:grid sm:grid-cols-12 gap-2 gap-x-6 gap-y-2">
                          <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 mb-1">
                            <a
                              href={`${baseDomain}get-file?filename=${img?.Original}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              variant="outline"
                            >
                              <Image
                                className="w-full object-contain rounded-xl"
                                src={`${baseDomain}get-file?filename=${img?.Original}`}
                                alt={"OrignalImage"}
                                width={1600}
                                height={1600}
                                // className="w-full h-full object-cover rounded-2xl"
                              />
                            </a>
                          </div>
                          <div
                            className={`lg:col-span-6 md:col-span-6 sm:col-span-6   relative mb-1 ${
                              img?.Flagged === true
                                ? "border-[3px] border-red-500 rounded-xl"
                                : ""
                            }`}
                          >
                            <a
                              href={`${baseDomain}get-file?filename=${img?.Processed}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              variant="outline"
                            >
                              <Image
                                className="w-full object-contain rounded-lg "
                                height={1600}
                                width={1600}
                                Id="processed"
                                src={`${baseDomain}get-file?filename=${img?.Processed}`}
                                // src={testimage2}
                                alt=""
                              />
                            </a>
                            {logo?.DisplayLogo && img?.LogoPosition && (
                              <Image
                                className={` h-[50px] w-[120px] absolute object-contain rounded-2xl
                         ${
                           img?.LogoPosition === "top-right"
                             ? "right-[2px] top-[10px]"
                             : img?.LogoPosition === "top-left"
                             ? "left-[2px] top-[10px]"
                             : img?.LogoPosition === "top-center"
                             ? " left-1/2 transform -translate-x-1/2 top-2"
                             : "hidden"
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
                            <button
                              onClick={() => toggle(img)}
                              className="bg-primary text-whitee  w-full rounded-full py-2 px-2   sm:text-[12px] md:text-[12px] lg:text-[12px] xl:text-[15px] 2xl:text-[20px]"
                            >
                              Edit Background Position
                            </button>
                          </div>
                          <div className="lg:col-span-12 md:col-span-4 sm:col-span-6 mb-1">
                            <Button
                              disabled
                              className="bg-whitee text-black border rounded-full py-2 w-full  mx-auto text-sm sm:text-md lg:text-[13px] xl:text-[15px] 2xl:text-[20px]"
                            >
                              {/* <button> */}
                              Crop
                              {/* </button> */}
                            </Button>
                          </div>
                          <div className="lg:col-span-12 md:col-span-4 sm:col-span-6 mb-1">
                            <Button
                              disabled
                              className="bg-whitee text-site_red border rounded-full py-2 w-full  text-sm sm:text-md lg:text-[13px] xl:text-[15px] 2xl:text-[20px]"
                            >
                              Reprocess
                            </Button>
                          </div>
                          <div className="lg:col-span-12 md:col-span-4 sm:col-span-6 flex items-center mb-1 lg:text-[13px] xl:text-[15px] 2xl:text-[20px]">
                            {logo?.DisplayLogo ? (
                              <>
                                <span className="text-sm sm:text-md font-medium">
                                  Logo:
                                </span>
                                <Select
                                  value={img?.LogoPosition}
                                  className="border-none "
                                  onValueChange={(val) => {
                                    handleOptionChange(
                                      val,
                                      item?.UniqueAdvertisementId,
                                      img?.Processed
                                    );
                                  }}
                                >
                                  <SelectTrigger className="bg-white text-black border text-center rounded-full py-2 w-full text-sm sm:text-md lg:text-[13px] xl:text-[15px] 2xl:text-[20px] ml-4 mb-1 cursor-pointer  custom-select">
                                    <SelectValue
                                      placeholder={img?.LogoPosition}
                                    />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectItem value="top-left">
                                        Top Left
                                      </SelectItem>
                                      <SelectItem value="top-center">
                                        Top Center
                                      </SelectItem>
                                      <SelectItem value="top-right">
                                        Top Right
                                      </SelectItem>
                                      <SelectItem value="hidden">
                                        Hide
                                      </SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </>
                            ) : (
                              <div className="flex justify-center items-center">
                                <p>Logo disabled</p>
                              </div>
                            )}
                          </div>
                          <div className="lg:col-span-12 md:col-span-4 sm:col-span-12 flex items-center ml-4 ">
                            <RiFlagFill className="text-site_red" size={15} />
                            {img?.Flagged === false ? (
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
                            ) : (
                              <p className="ml-4 text-sm sm:text-md text-site_red">
                                Flagged
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            }
          </>
        ) : loader ? (
          <ViewAdvertSkelton/>
        ) : (
          <div className="flex flex-row justify-center items-center min-h-[400px]">
            <span>No Data Found</span>
          </div>
        )}
      </div>
      {open && (
        <ShiftBackground
          open={open}
          setOpen={toggle}
          item={selectedImage}
          advertId={searchParams?.advertId}
        />
      )}
    </AlertDialog>
  );
};
export default ViewAdvert;
