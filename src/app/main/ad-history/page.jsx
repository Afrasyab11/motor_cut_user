"use client";
import AdvertCard from "@/components/recent_advert/AdvertCard";
import { Input } from "@/components/ui/input";
import { getAdvertAction } from "@/store/createAdvert/createAdvertThunk";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function AdHistory() {
  const { advert} = useSelector((state) => state?.advert);
  const dispatch = useDispatch();
  const [showData, setShowData] = useState(6);
  const [showCard, setShowCard] = useState(6);
  const [filter, setFilter] = useState("");
  let userString = getCookie("user");

  let user = userString ? JSON.parse(userString) : null;
  useEffect(() => {
    dispatch(getAdvertAction({userId:user?.UserId,onSuccess:()=>{
      
    }}));
  }, []);

  const filterHandle = (e) => {
    setFilter(e.target.value.toLowerCase());
  };
  const visibleCards =
  filter.length > 0
  ? advert
  ?.filter((item) => item.Label.toLowerCase().includes(filter))
  .slice(0, showData)
  : advert?.slice(0, showData);
  
  console.log('visibleCards: ', visibleCards);
  const handleLoadMore = (e) => {
    e.preventDefault();
    setShowCard(showData + 6);
    // Increase the count of cards to show when "Load More" is clicked
    setShowData(showData + 6); // Adjust the number as needed
  };

  return (
    <div className="bg-site_secondary md:p-2 lg:p-8 m-3 rounded-2xl gap-8">
      <div className="flex flex-wrap items-start mb-4 px-2 pt-3">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 mr-6">
          Advert History
        </h2>
        <Input
          className="bg-primary[light] w-full max-w-[480px]"
          placeholder="Search Adverts"
          type="text"
          onChange={filterHandle}
        />
      </div>

      <AdvertCard data={visibleCards} showCard={showCard} />
      <div className="flex justify-center">
        {showData < advert?.length && (!(visibleCards?.length < 6)) && (
          <a
            className="text-primary cursor-pointer text-sm sm:text-md font-medium"
            onClick={handleLoadMore}
          >
            Load More
          </a>
        )}
      </div>
    </div>
  );
}
