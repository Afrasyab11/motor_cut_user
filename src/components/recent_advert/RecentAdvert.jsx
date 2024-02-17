"use client"
import { getAdvertAction } from "@/store/createAdvert/createAdvertThunk";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdvertCard from "./AdvertCard";
import { getCookie } from "cookies-next";
export default function RecentAdvert({ showCard }) {
  let { advert } = useSelector((state) => state?.advert);
  const dispatch = useDispatch();
  let userString = getCookie("user");

let user = userString ? JSON.parse(userString) : null;
  useEffect(() => {
    dispatch(getAdvertAction( user?.UserId));
  }, [dispatch,user?.UserId]);

  return (
    // <div className={`grid gap-8 ${recentColumn}`}>
    <div className="bg-site_secondary p-4 rounded-2xl mb-2">
      <div className="flex justify-between ">
        <h2 className="text-lg sm:text-md mb-4 font-medium">Recent Advert</h2>
        <Link href="/main/ad-history" className="text-primary text-sm sm:text-md font-normal">
          All History
        </Link>
      </div>
      <AdvertCard data={advert} showCard={showCard} />
    </div>

    // </div>
  );
}
