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
          dispatch(getchanngeBackgroundImageAction(user?.UserId));
        },
      })
    );
  };

  return (
    
      <main className=" ">
        <main className=" bg-gray-100 rounded-2xl p-2 md:p-4 ">
          <div className="p-4">
            <h1 className="text-3xl">Background Library</h1>
          </div>
          <main className="  flex flex-col  lg:flex-row h-fit ">
            <section className="categories flex flex-col  h-[130px]  lg:min-h-[70vh] lg:max-h-full  align-items-center justify-content-center mb-4 lg:mb-1 lg:mr-4 bg-white rounded-2xl px-3 py-2 lg:leading-loose  ">
              <Button className="bg-gray-500  text-lg-screen text-xl-screen text-2xl-screen text-1800-screen text-2000-screen text-4k-screen text-white w-fit  rounded-full mr-2 lg:mr-0 lg:mb-2 ">
                Categories
              </Button>
              <div className="bar-scroll flex flex-row  lg:justify-start lg:flex-col overflow-x-auto ">
                <p
                  onClick={() => filterHandler("All")}
                  className={`mx-2 py-2 cursor-pointer text-lg-screen text-xl-screen text-2xl-screen text-1800-screen text-2000-screen text-4k-screen ${
                    selectedCategory === "All" ? "font-bold text-primary" : ""
                  }`}
                >
                  All
                </p>
                <p
                  onClick={() => filterHandler("Indoor")}
                  className={`mx-2 py-2 cursor-pointer text-lg-screen text-xl-screen text-2xl-screen text-1800-screen text-2000-screen text-4k-screen ${
                    selectedCategory === "Indoor"
                      ? "font-bold text-primary"
                      : ""
                  }`}
                >
                  Indoor
                </p>
                <p
                  onClick={() => filterHandler("Outdoor")}
                  className={`mx-2 py-2 cursor-pointer text-lg-screen text-xl-screen text-2xl-screen text-1800-screen text-2000-screen text-4k-screen ${
                    selectedCategory === "Outdoor"
                      ? "font-bold text-primary"
                      : ""
                  }`}
                >
                  Outdoor
                </p>
                <p
                  onClick={() => filterHandler("Simple")}
                  className={`mx-2 py-2 cursor-pointer text-lg-screen text-xl-screen text-2xl-screen text-1800-screen text-2000-screen text-4k-screen ${
                    selectedCategory === "Simple"
                      ? "font-bold text-primary"
                      : ""
                  }`}
                >
                  Simple
                </p>
                <p
                  onClick={() => filterHandler("Creative")}
                  className={`mx-2 py-2 cursor-pointer text-lg-screen text-xl-screen text-2xl-screen text-1800-screen text-2000-screen text-4k-screen ${
                    selectedCategory === "Creative"
                      ? "font-bold text-primary"
                      : ""
                  }`}
                >
                  Creative
                </p>
                <p
                  onClick={() => filterHandler("Studio")}
                  className={`mx-2 py-2 cursor-pointer text-lg-screen text-xl-screen text-2xl-screen text-1800-screen text-2000-screen text-4k-screen ${
                    selectedCategory === "Studio"
                      ? "font-bold text-primary"
                      : ""
                  }`}
                >
                  Studio
                </p>
              </div>
            </section>

              {allBackground &&
              allBackground.length > 0 &&
              filteredBackgrounds.length > 0 ? (
            <section className="bar-scroll  rounded-sm cards  grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 h-fit w-full ">
              {  filteredBackgrounds.slice(0, showCard)?.map((card, index) => (

                  <Card
                    key={index}
                    className="bg-white p-1 rounded-2xl border-none  min-w-[270px]"
                  >
                    <CardContent className="p-1">
                      <div className="rounded-2xl m-1">
                        <Image
                          src={`${baseDomain}get-file?filename=${card?.Path}`}
                          alt={"BackgroundLibrary"}
                          width={1600}
                          height={900}
                          // className="w-full h-full object-cover rounded-2xl"
                          className=" object-cover rounded-2xl background-library-picture  "
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="p-1 flex justify-center m-auto">
                      {/* <Button
                        variant="outline"
                        className="library-btn basis-1/2 text-sm  rounded-full border-2 border-primary-dark text-primary-dark px-3 py-2  mr-2"
                      >
                        See Example
                      </Button> */}
                      <a
                        href={`${baseDomain}get-file?filename=${card?.Path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outline"
                        className="library-btn basis-1/2 text-sm text-center rounded-full border-2 border-primary-dark text-primary-dark px-3 py-2  mr-2"
                      >
                        See Example
                      </a>
                      <Button
                        // disabled={backgroundLoader}
                        onClick={(e) => {
                          backgroundSelectHandler(e, card?.Path, index);
                        }}
                        className="library-btn basis-1/2  text-sm text-justify rounded-full bg-primary-light  text-white px-3  ml-2 "
                      >
                        Select{" "}
                        {/* {backgroundLoader && card.spiner === true && (
                          <ImSpinner8 className="spinning-icon" />
                        )} */}
                      </Button>
                    </CardFooter>
                  </Card>
              ))} </section>
              ) : backgroundLoader ? (
            <section className="bar-scroll  rounded-sm cards  grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 h-fit w-full  ">
               { [...Array(9)].map((_, index) => (

                  <div
                    key={index}
                    className="flex flex-col mx-1 p-2 bg-white  rounded-xl"
                  >
                    <Skeleton className="w-[210px] sm:w-full h-[125px] lg:w-full rounded-xl pl-6 pt-6" />
                    <div className="space-x-2 flex lg:flex-row md:flex-col sm:flex-col mt-2">
                      <Skeleton className="h-8 w-[100px] sm:w-full lg:w-[190px] " />
                      <Skeleton className="h-8 w-[100px] sm:w-full lg:w-[190px]" />
                    </div>
                  </div> 
              ))}
            </section>
          ) : (
            <div className="w-full flex justify-center items-center">
              <span className="font-medium">No Data Found</span>
            </div>
          )}
        </main>
      </main>
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
    </main>
  );
};

export default BackgroundLibrary;
