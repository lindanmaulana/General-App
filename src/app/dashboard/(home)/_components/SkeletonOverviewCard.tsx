"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const SkeletonOverviewCard = () => {
    return (
        <div className="grid grid-cols-3 gap-3">
            <Card className="p-0">
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
            <Card className="p-0">
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
            <Card className="p-0">
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
        </div>
    )
}