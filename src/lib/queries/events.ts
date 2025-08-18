import { queryOptions } from "@tanstack/react-query"
import { apiEventsGetAll, apiEventsGetCount, apiEventsGetCountIsPublic, apiEventsGetTotalBudget } from "../api/events"

export const queryGetAllEventsOptions = (params: string) => {
    return queryOptions({
        queryKey: ['getAllEvents', params],
        queryFn: () => apiEventsGetAll({params}),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000
    })
}

export const queryGetCountEventsOptions = () => {
    return queryOptions({
        queryKey: ["getCountEvents"],
        queryFn: () => apiEventsGetCount(),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000
    })
}

export const queryGetCountIsPublicEventsOptions = () => {
    return queryOptions({
        queryKey: ['getCountIsPublicEvents'],
        queryFn: () => apiEventsGetCountIsPublic(),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000
    })
}

export const queryGetTotalBudgetEventsOptions = () => {
    return queryOptions({
        queryKey: ['getTotalBudgetEvents'],
        queryFn: () => apiEventsGetTotalBudget(),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000
    })
}