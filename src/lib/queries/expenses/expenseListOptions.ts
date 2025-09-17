import { getAllExpenses } from "@/lib/services/expenses.service"
import { queryOptions } from "@tanstack/react-query"
import { expensesKeys } from "./queryKeys"

export const expenseListOptions = (params: string) => {
    return queryOptions({
        queryKey: expensesKeys.list(params),
        queryFn: () => getAllExpenses({params}),
        staleTime: 1 * 60 * 60 * 1000,
    })
}