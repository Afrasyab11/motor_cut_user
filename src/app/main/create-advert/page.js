import RecentAdvert from "@/components/recent_advert/RecentAdvert";
import CreateAdvert from "@/components/create_advert/CreateAdvert";

export default function Advert() {

  return (
    <>
      <div className="lg:grid lg:grid-cols-2 md:grid md:grid-cols-2 sm:grid-cols-1 gap-8 gap-y-4 p-3 w-full">
        <CreateAdvert />
        <RecentAdvert showCard={3}/>
      </div>
    </>
  );
}
 