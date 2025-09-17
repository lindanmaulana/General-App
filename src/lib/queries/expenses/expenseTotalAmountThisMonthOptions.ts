import { getTotalAmountExpenseThisMonth } from "@/lib/services/expenses.service"
import { queryOptions } from "@tanstack/react-query"
import { expensesKeys } from "./queryKeys"

export const expenseTotalAmountThisMonthOptions = () => {
    return queryOptions({
        queryKey: expensesKeys.total.amount.month(),
        queryFn: getTotalAmountExpenseThisMonth,
        staleTime: 1 * 60 * 60 * 1000,
    })
}