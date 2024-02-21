"use client";
import ApexChart from "@/components/dashboard/ActivityChart";
import AdvertForm from "@/components/dashboard/AdvertForm";
import SettingsCard from "@/components/dashboard/SettingsCard";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentAdvert from "@/components/recent_advert/RecentAdvert";
import { dashboardStatsAction } from "@/store/dashboard/dashboardThunk";
import { getCookie } from "cookies-next";
import { useEffect } from "react";
// import { useEffect } from "react";
import { IoIosPerson } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

export default function DashBoard() {
  const dispatch = useDispatch();
  const { advertLenght } = useSelector((state) => state.advert);

  const { states } = useSelector((state) => state.dashboard);

  let userString = getCookie("user");

  let user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    dispatch(dashboardStatsAction(user?.UserId));
  }, [dispatch,user?.UserId]);
  const stats = [
    {
      icon: <IoIosPerson />,
      title: states?.PackageName ,
      description: "Package",
    },
    {
      icon: <IoIosPerson />,
      title: (states.ImagesProcessed || 0) + "/" + (states.TotalAllowedImages || 0),
      description: "Images Processed",
    },
    {
      icon: <IoIosPerson />,
      title: states?.RenewalDate || 0,
      description: "Renewal Date",
    },
    {
      icon: <IoIosPerson />,
      title: states?.AdvertsCreated || 0,
      description: "Adverts Created",
    },
  ];

  // Array of components with unique key prop
  const components = [
    { title: "Settings", Component: <SettingsCard key="chart-2" /> },
    { title: "Activity", Component: <ApexChart key="chart-3" /> },
  ];

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-12 gap-4">
          {stats.map((stat, index) => (
            <div
              className="lg:col-span-3 md:col-span-6 col-span-12"
              key={`dashboard-${index}`}
            >
              <StatsCard {...stat} />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="lg:col-span-4 md:col-span-6 bg-site_secondary rounded-lg p-5 col-span-12">
            <h5 className="font-medium">Create Advert</h5>
            <AdvertForm />
          </div>
          {components.map(({ title, Component }, index) => (
            // <div
            //   className="lg:col-span-4 md:col-span-6 bg-site_secondary rounded-lg p-5 col-span-12"
            //   key={`dashboard-comp-${index}`}
            // >
            <div
              className={`${
                title == "Activity"
                  ? "md:col-span-full w-auto lg:col-span-4"
                  : "lg:col-span-4"
              } bg-site_secondary rounded-lg p-5 col-span-12 md:col-span-6`}
              key={`dashboard-comp-${index}`}
            >
              <h5 className="font-medium">{title}</h5>
              <div className="bg-white rounded-lg mt-3 p-5 h-[300px]">
                {Component}
              </div>
            </div>
          ))}
        </div>
        <div className="">
          <RecentAdvert showCard={2} />
        </div>
      </div>
    </>
  );
}
