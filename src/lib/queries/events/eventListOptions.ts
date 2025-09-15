"use client"

import { queryOptions } from "@tanstack/react-query"
import { eventsKeys } from "./queryKeys"
import { getAllEvents } from "@/lib/services/events.service"

export const eventListOptions = (params: string) => {
    return queryOptions({
        queryKey: eventsKeys.list(params),
        queryFn: () => getAllEvents({params}),
        staleTime: 1 * 60 * 60 * 1000
    })
}