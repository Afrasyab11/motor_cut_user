import { Skeleton } from "@/components/ui/skeleton";

const ViewAdvertSkelton = () => {
  return (
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
          <div className="flex flex-col gap-2 justify-between items-center">
            <Skeleton className="rounded-lg h-[40px] w-[200px]" />
            <Skeleton className="rounded-lg h-[40px] w-[200px]" />
            <Skeleton className="rounded-lg h-[40px] w-[200px]" />
            <Skeleton className="rounded-lg h-[40px] w-[200px]" />
       
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewAdvertSkelton;
