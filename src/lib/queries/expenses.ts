import { queryOptions } from "@tanstack/react-query"
import { apiExpensesGetTotalAmountThisMonth } from "../api/expenses"

export const queryGetTotalAmountThisMonthExpensesOptions = () => {
    return queryOptions({
        queryKey: ['getTotalAmountThisMonthExpenses'],
        queryFn: apiExpensesGetTotalAmountThisMonth,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000
    })
}