"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const SkeletonOverviewCardPrice = () => {
    return (
        <Card className="w-full p-0">
            <CardContent className="p-0">
                <Skeleton className="h-26 p-6 space-y-3">
                    <Skeleton className="w-48 h-6 bg-gnrGray/20" />
                    <Skeleton className="w-38 h-5 bg-gnrGray/20" />
                </Skeleton>
            </CardContent>
        </Card>
    )
}