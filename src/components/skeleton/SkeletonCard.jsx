import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="bg-whitee lg:grid lg:grid-cols-12 md:grid md:grid-cols-12 sm:gird sm:grid-cols-12 gap-3 gap-y-2 p-4 rounded-2xl mb-5 shadow-xl">
      <div className="col-span-5 ">
        <Skeleton className="h-[130px] w-full rounded-xl" />
      </div>
      <div className="col-span-7 ">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 gap-y-2 mt-2 sm:mt-2 mb-1 lg:m-0">
          <div>
            <Skeleton className="h-4 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
      <div className="lg:col-span-5 md:col-span-12 sm:col-span-12 flex justify-center mb-1  md:m-0">
        <div className="lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 w-full lg:w-32">
          <Skeleton className="h-4 w-full" />
        </div>
      </div>

      <div className="lg:col-span-7 md:col-span-12 sm:col-span-12 ">
        <div className="lg:grid lg:grid-cols-12 md:grid md:grid-cols-12 sm:grid sm:grid-cols-12 gap-x-3 gap-y-1">
          <div className="lg:col-span-6 md:col-span-12 sm:col-span-12 mb-1 sm:m-0 md:m-0">
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="lg:col-span-6 md:col-span-12  sm:col-span-12">
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
