"use client"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export const SkeletonButton = () => {
    return (
        <Button variant={"outline"} asChild>
            <Skeleton className="w-30  flex items-center justify-start">
                <Skeleton className="bg-gnrGray/20 w-4 h-full rounded" />
                <Skeleton className="bg-gnrGray/20 w-full h-full rounded" />
            </Skeleton>
        </Button>
    )
}