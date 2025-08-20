import { queryOptions } from "@tanstack/react-query"
import { apiIncomesGetAll, apiIncomesGetTotalAmountThisMonth } from "../api/incomes"


export const queryGetAllIncomesOptions = (params: string) => {
    return queryOptions({
        queryKey: ['getAllIncomes', params],
        queryFn: () => apiIncomesGetAll({params}),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000
    })
}

export const queryGetTotalAmountThisMonthIncomesOptions = () => {
    return queryOptions({
        queryKey: ["getTotalAmountThisMonthIncomes"],
        queryFn: apiIncomesGetTotalAmountThisMonth,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000
    })
}