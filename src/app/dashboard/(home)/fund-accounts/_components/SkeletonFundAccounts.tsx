import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const SkeletonFundAccounts = () => {
    return (
         <Card className="w-full p-0">
            <CardContent className="p-0">
                <Skeleton className="h-98 p-7 space-y-4">
                    <Skeleton className="bg-gnrGray/50 h-10" />
                    <Skeleton className="bg-gnrGray/50 h-56" />
                    <Skeleton className="bg-gnrGray/50 h-10" />
                </Skeleton>
            </CardContent>
        </Card>
    )
}