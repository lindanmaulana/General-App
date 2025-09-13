import { queryOptions } from "@tanstack/react-query"
import { eventsKeys } from "./queryKeys"
import { getPublicEventCount } from "@/lib/services/events.service"

export const eventPublicCountOptions = () => {
    return queryOptions({
        queryKey: eventsKeys.publicCount(),
        queryFn: getPublicEventCount,
        staleTime: 1 * 60 * 60 * 1000
    })
}