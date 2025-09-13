import { queryOptions } from "@tanstack/react-query"
import { eventsKeys } from "./queryKeys"
import { getEventOptions } from "@/lib/services/events.service"

export const eventOptions = () => {
    return queryOptions({
        queryKey: eventsKeys.options(),
        queryFn: getEventOptions,
        staleTime: 1 * 60 * 60 * 1000
    })
}