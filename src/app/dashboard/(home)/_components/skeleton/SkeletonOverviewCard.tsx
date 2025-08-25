"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface SkeletonOverviewCardProps {
    totalCard: number 
}
export const SkeletonOverviewCard = ({totalCard}: SkeletonOverviewCardProps) => {

    const getGridCols = (count: number) => {
        if(count <= 1) return "grid-cols-1"
        if(count === 2) return "grid-cols-2"
        if(count === 3) return "grid-cols-3"
        if(count === 4) return "grid-cols-4"
        if(count === 5) return "grid-cols-5"
        
        return "grid-cols-6"
    }

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:${getGridCols(totalCard)} gap-3`}>
            {Array.from({length: totalCard}, (_, index: number) => (
            <Card key={index} className="p-0">
                <CardContent className="p-0">
                    <Skeleton className="h-30 space-y-4 p-6">
                        <Skeleton className="w-20 h-5 bg-gnrGray/20" />
                        <div className="">
                            <Skeleton className="w-16 h-4 bg-gnrGray/20 rounded-l-none rounded-tl-md rounded-br-none" />
                            <Skeleton className="w-30 h-5 bg-gnrGray/20 rounded-l-none rounded-bl-md" />
                        </div>
                    </Skeleton>
                </CardContent>
            </Card>
            ))}
        </div>
    )
}