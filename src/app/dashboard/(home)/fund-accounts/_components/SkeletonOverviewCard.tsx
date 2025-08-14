"use client"

import { Skeleton } from "@/components/ui/skeleton"

export const SkeletonOverviewCard = () => {
    return (
        <div className="grid grid-cols-3 gap-3">
            <Skeleton className="h-30 bg-gnrGray/20" />
            <Skeleton className="h-30 bg-gnrGray/20" />
            <Skeleton className="h-30 bg-gnrGray/20" />
        </div>
    )
}