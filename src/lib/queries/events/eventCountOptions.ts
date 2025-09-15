import { getEventCount } from "@/lib/services/events.service"
import { queryOptions } from "@tanstack/react-query"
import { eventsKeys } from "./queryKeys"

export const eventCountOptions = () => {
    return queryOptions({
        queryKey: eventsKeys.allCount(),
        queryFn: getEventCount,
        staleTime: 1 * 60 * 60 * 1000,
    })
}