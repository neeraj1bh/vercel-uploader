import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonCard from "@/components/SkeletonCard";

const loading = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col items-center grow">
        <Skeleton className="h-12 w-[250px] rounded-md mt-6" />
        <div className="flex items-center justify-center grow">
          <div className="flex flex-col gap-4 border rounded-lg h-[500px] overflow-scroll p-7">
            {Array.from({ length: 10 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </div>
      <Skeleton className="h-14" />
    </div>
  );
};

export default loading;
