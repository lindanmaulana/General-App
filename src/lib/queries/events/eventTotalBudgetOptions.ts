import { queryOptions } from "@tanstack/react-query"
import { eventsKeys } from "./queryKeys"
import { getEventTotalBudget } from "@/lib/services/events.service"

export const eventTotalBudgetOptions = () => {
    return queryOptions({
        queryKey: eventsKeys.totalBudget(),
        queryFn: getEventTotalBudget,
        staleTime: 1 * 60 * 60 * 1000
    })
}