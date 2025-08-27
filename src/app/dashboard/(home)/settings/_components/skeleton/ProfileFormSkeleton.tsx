import { Skeleton } from "@/components/ui/skeleton"

export const ProfileFormSkeleton = () => {
    return (
        <div className="w-full min-h-52 space-y-4">
            <div className="w-full space-y-1">
                <Skeleton className="w-16 h-5 bg-gnrGray/20 rounded" />
                <Skeleton className="w-full h-8 bg-gnrGray/20 rounded" />
            </div>
            <div className="w-full space-y-1">
                <Skeleton className="w-16 h-5 bg-gnrGray/20 rounded" />
                <Skeleton className="w-full h-8 bg-gnrGray/20 rounded" />
            </div>
            <div className="w-full space-y-1">
                <Skeleton className="w-16 h-5 bg-gnrGray/20 rounded" />
                <Skeleton className="w-full h-8 bg-gnrGray/20 rounded" />
            </div>
        </div>
    )
}