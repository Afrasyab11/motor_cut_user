"use client";
import React, { useState, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import "./library.module.css";
import "../../globals.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllBackgroundImagesAction } from "@/store/background/backgroundThunk";
import { baseDomain } from "@/utils/axios";
import { Skeleton } from "@/components/ui/skeleton";
import {
  channgeBackgroundImageAction,
  getchanngeBackgroundImageAction,
} from "@/store/background/backgroundThunk";
import { ImSpinner8 } from "react-icons/im";
import { getCookie } from "cookies-next";
const BackgroundLibrary = () => {
  const dispatch = useDispatch();
  const { allBackground, backgroundLoader, background } = useSelector(
    (state) => state.background
  );
  const [loading, setLoading] = useState(
    Array(allBackground?.length).fill(false)
  );
  console.log(
    "dash path ",
    background?.BackgroundImage + "libray path " + allBackground?.Path
  );
  let userString = getCookie("user");
  let user = userString ? JSON.parse(userString) : null;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showData, setShowData] = useState(9);
  const [showCard, setShowCard] = useState(9);
  const [file, setFile] = useState("");

  useEffect(() => {
    dispatch(getAllBackgroundImagesAction());
  }, []);

  useEffect(() => {
    if (user?.UserId) {
      dispatch(getchanngeBackgroundImageAction(user?.UserId));
    }
  }, [user?.UserId]);

  const filterHandler = (category) => {
    setSelectedCategory(category);
  };

  const filteredBackgrounds = allBackground?.filter((bg) => {
    if (selectedCategory === "All") return true;
    return bg.BackgroundTags.some((tag) =>
      tag.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  });
  console.log(
    "dash path ",
    background?.BackgroundImage + "libray path " + allBackground
  );
  const handleLoadMore = (e) => {
    e.preventDefault();
    setShowCard(showData + 9);
    setShowData(showData + 9);
  };
  const backgroundSelectHandler = (e, path, index) => {
    e.preventDefault();
    setLoading((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
    let userString = getCookie("user");

    let user = userString ? JSON.parse(userString) : null;
    const formData = new FormData();
    let list = {
      UserId: user?.UserId,
      Path: path,
    };
    // if(file.length>0){
    formData.append("File", file);
    // }
    dispatch(
      channgeBackgroundImageAction({
        list,
        formData,
        onSuccess: () => {
          setLoading((prev) => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
          });
          dispatch(getchanngeBackgroundImageAction(user?.UserId));
        },
      })
    );
  };

  return (
    <main className="">
      <main className=" bg-gray-100 rounded-2xl p-2 md:p-4 h-auto">
        <div className="p-4">
          <h1 className="text-3xl">Background Library</h1>
        </div>
        <main className="grid 2xl:grid-cols-12 xl:grid-cols-12 gap-3 lg:grid-cols-12 md:grid-cols-6 sm:grid-cols-12 h-fit">
          <section className="categories 2xl:col-span-2 xl:col-span-2 lg:col-span-2 md:col-span-6 sm:col-span-12 h-max-full lg:min-h-[80vh] border lg:max-h-[80vh] sm:flex-col md:flex-col flex lg:flex-col  mb-4 lg:mb-1  bg-white rounded-2xl px-3 py-2 lg:leading-loose  ">
            <div className="flex justify-center items-center">
              <Button className="bg-gray-500 text-white w-full  rounded-full  lg:mb-2">
                Categories
              </Button>
            </div>
            <div className="bar-scroll flex flex-row  lg:justify-start lg:flex-col overflow-x-auto">
              <p
                onClick={() => filterHandler("All")}
                className={`mx-2 py-2 cursor-pointer lg:text-[13px] xl:text-[15px] 2xl:text-[20px] ${
                  selectedCategory === "All" ? "font-bold text-primary" : ""
                }`}
              >
                All
              </p>
              <p
                onClick={() => filterHandler("Indoor")}
                className={`mx-2 py-2 cursor-pointer lg:text-[13px] xl:text-[15px] 2xl:text-[20px] ${
                  selectedCategory === "Indoor" ? "font-bold text-primary" : ""
                }`}
              >
                Indoor
              </p>
              <p
                onClick={() => filterHandler("Outdoor")}
                className={`mx-2 py-2 cursor-pointer lg:text-[13px] xl:text-[15px] 2xl:text-[20px] ${
                  selectedCategory === "Outdoor" ? "font-bold text-primary" : ""
                }`}
              >
                Outdoor
              </p>
              <p
                onClick={() => filterHandler("Simple")}
                className={`mx-2 py-2 cursor-pointer lg:text-[13px] xl:text-[15px] 2xl:text-[20px] ${
                  selectedCategory === "Simple" ? "font-bold text-primary" : ""
                }`}
              >
                Simple
              </p>
              <p
                onClick={() => filterHandler("Creative")}
                className={`mx-2 py-2 cursor-pointer lg:text-[13px] xl:text-[15px] 2xl:text-[20px] ${
                  selectedCategory === "Creative"
                    ? "font-bold text-primary"
                    : ""
                }`}
              >
                Creative
              </p>
              <p
                onClick={() => filterHandler("Studio")}
                className={`mx-2 py-2 cursor-pointer lg:text-[13px] xl:text-[15px] 2xl:text-[20px] ${
                  selectedCategory === "Studio" ? "font-bold text-primary" : ""
                }`}
              >
                Studio
              </p>
            </div>
          </section>

          {allBackground &&
          allBackground.length > 0 &&
          filteredBackgrounds.length > 0 ? (
            <section className="2xl:col-span-10 xl:col-span-10 lg:col-span-10 md:col-span-6 sm:col-span-12   gap-y-3">
              <div className="bar-scroll  rounded-sm cards  grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 h-fit w-full ">
                {filteredBackgrounds?.slice(0, showCard)?.map((card, index) => (
                  <Card
                    key={index}
                    className="bg-white p-1 w-full rounded-2xl 2xl:flex 2xl:flex-col 2xl:justify-between border-none h-full"
                  >
                    <CardContent className="p-2 min-h-[220px] lg:min-h-[200px] ">
                      <div className="rounded-3xl">
                        <Image
                          src={`${baseDomain}get-file?filename=${card?.Path}`}
                          alt={"BackgroundLibrary"}
                          width={1600}
                          height={900}
                          className="w-full object-fill h-[210px] 2xl:h-full background-library-picture rounded-2xl"
                          //  className="image-card"
                          onContextMenu={(e) => e.preventDefault()} // Prevent right-click menu
                          draggable="false"
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="p-1 flex justify-center gap-x-2">
                      <a
                        href={`${baseDomain}get-file?filename=${card?.Path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outline"
                      >
                        <Button className="library-btn bg-white hover:bg-white basis-1/2 text-sm lg:text-[13px] xl:text-[15px] 2xl:text-[20px] text-center rounded-full border-2 border-primary-dark text-primary-dark px-3 py-2">See Example</Button>
                      </a>
                      <Button
                        // disabled={backgroundLoader}
                        onClick={(e) => {
                          backgroundSelectHandler(e, card?.Path, index);
                        }}
                        className="library-btn basis-1/2  text-sm lg:text-[13px] xl:text-[15px] 2xl:text-[20px] text-justify rounded-full bg-primary-light  text-white px-3 "
                        disabled={
                          (card?.Id === background?.BackgroundImageId &&
                            background?.BackgroundImageId !== null) ||
                          loading[index]
                        }
                      >
                        {card?.Id === background?.BackgroundImageId &&
                        background?.BackgroundImageId !== null
                          ? "Selected"
                          : "Select"}
                        {loading[index] && (
                          <ImSpinner8 className="spinning-icon" />
                        )}
                        {/* {backgroundLoader && card.spiner === true && (
                      <ImSpinner8 className="spinning-icon" />
                    )} */}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="flex justify-center mt-3">
                {showData < filteredBackgrounds?.length && (
                  <a
                    className="text-primary cursor-pointer text-sm sm:text-md font-medium"
                    onClick={handleLoadMore}
                  >
                    Load More
                  </a>
                )}
              </div>
            </section>
          ) : backgroundLoader ? (
            <div className="2xl:col-span-10 xl:col-span-10 lg:col-span-10 md:col-span-6 sm:col-span-12 ">
              <div className="bar-scroll  rounded-sm cards  grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 h-fit w-full ">
                {[...Array(9)].map((_, index) => (
                  <div key={index} className=" mx-1 p-2 bg-whitee  rounded-xl">
                    <Skeleton className="w-[210px] sm:w-full h-[125px] lg:w-full rounded-xl pl-6 pt-6" />
                    <div className=" flex lg:flex-row md:flex-col sm:flex-col mt-2 gap-2">
                      <Skeleton className="h-8 w-[100px] sm:w-full lg:w-[190px] " />
                      <Skeleton className="h-8 w-[100px] sm:w-full lg:w-[190px]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className=" grid col-span-10 place-content-center place-item-center  ">
              <span className="font-medium">No Data Found</span>
            </div>
          )}
        </main>
      </main>
    </main>
  );
};

export default BackgroundLibrary;
