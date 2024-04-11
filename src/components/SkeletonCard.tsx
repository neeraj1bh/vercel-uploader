import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = () => {
  return (
    <div className="flex space-x-6">
      <Skeleton className="h-7 w-[180px] rounded-xl" />
      <Skeleton className="h-7 w-[70px]" />
      <Skeleton className="h-7 w-[30px]" />
      <Skeleton className="h-7 w-[30px]" />
    </div>
  );
};

export default SkeletonCard;
