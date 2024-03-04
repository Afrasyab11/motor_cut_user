"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivityChartAction } from "@/store/createAdvert/createAdvertThunk";
import { getCookie } from "cookies-next";

import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
const ActivityChart = () => {
  const dispatch = useDispatch();
  const { activity, chartLoader } = useSelector((state) => state?.advert);
  let userString = getCookie("user");
  let user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    dispatch(getActivityChartAction(user?.UserId));
  }, []);

  const formattedDates = activity?.map((detail) => {
    const date = new Date(detail.Date);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}`;
  });
  // let isRender = typeof window !== 'undefined';
  const series = [
    {
      name: "Total",
      data: activity?.map((detail) => detail.NoOfAdverts),
    },
    {
      name: "Half-Cut",
      data: activity?.map((detail) => detail.HalfCut),
    },
    {
      name: "Full-Cut",
      data: activity?.map((detail) => detail.FullCut),
    },
  ];

  const options = {
    chart: {
      // height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    yaxis: {
      title: {
        text: "No. of Adverts",
      },
      tickAmount: 4, // Number of ticks you want to show
      min: 0, // Minimum value on y-axis
      max: 20, // Maximum value on y-axis
    },
    xaxis: {
      categories: formattedDates || [],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };
  return (
    <div className="h-auto">
      {activity.length > 0 && series ? (
        <div className="min-h-[40vh]">
          <ReactApexChart
            className="w-full"
            options={options}
            series={series}
            type="area"
            width={"100%"}
            height={"100%"}
          />
        </div>
      ) : chartLoader ? (
        <div className={`flex justify-center items-center min-h-[40vh]`}>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={`flex justify-center min-h-[40vh]`}>
          <span>No Data found</span>
        </div>
      )}
    </div>
  );
};

export default ActivityChart;
