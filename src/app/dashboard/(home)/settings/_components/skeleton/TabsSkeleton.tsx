"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { LucideIcon } from "lucide-react"

interface TabsSkeletonProps {
    text: string
    icon: LucideIcon
}

export const TabsSkeleton = (props: TabsSkeletonProps) => {
    const {text} = props
    return (
        <Skeleton className="w-full h-[450px] flex items-center justify-center gap-1">
            <props.icon className="mt-1 size-8" /> <h4 className="text-xl">{text}...</h4>
        </Skeleton>
    )
}