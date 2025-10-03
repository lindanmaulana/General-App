"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonChart = () => {
    return (
        <div className="h-64 flex items-center gap-4 mb-4">
            <div className="w-18 space-y-9">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
            </div>
            <Skeleton className="flex-1 h-full"></Skeleton>
        </div>
    );
};
