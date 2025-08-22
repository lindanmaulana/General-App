import { queryOptions } from "@tanstack/react-query"
import { apiExpensesGetAll, apiExpensesGetTotalAmountThisMonth } from "../api/expenses"


export const queryGetAllExpensesOptions = (params: string) => {
    return queryOptions({
        queryKey: ['getAllExpenses', params],
        queryFn: () => apiExpensesGetAll({params}),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000
    })
}

export const queryGetTotalAmountThisMonthExpensesOptions = () => {
    return queryOptions({
        queryKey: ['getTotalAmountThisMonthExpenses'],
        queryFn: apiExpensesGetTotalAmountThisMonth,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000
    })
}