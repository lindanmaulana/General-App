import { queryOptions, UseQueryOptions } from "@tanstack/react-query"
import { eventsKeys } from "./queryKeys"
import { getEventCount } from "@/lib/services/events.service"

export const eventCountOptions = (options: Partial<UseQueryOptions<number>>) => {
    return queryOptions({
        queryKey: eventsKeys.allCount(),
        queryFn: getEventCount,
        staleTime: 1 * 60 * 60 * 1000,
        ...options
    })
}