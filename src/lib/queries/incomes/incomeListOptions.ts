import { getAllIncomes } from "@/lib/services/incomes.service"
import { queryOptions } from "@tanstack/react-query"
import { incomesKeys } from "./queryKeys"

export const incomeListOptions = (params: string) => {
    return queryOptions({
        queryKey: incomesKeys.list(params),
        queryFn: () => getAllIncomes({params}),
        staleTime: 1 * 60 * 60 * 1000,
    })
}