import { queryOptions } from "@tanstack/react-query"
import { incomesKeys } from "./queryKeys"
import { getTotalAmountIncomeThisMonth } from "@/lib/services/incomes.service"

export const incomeTotalAmountThisMonthOptions = () => {
    return queryOptions({
        queryKey: incomesKeys.total.amount.month(),
        queryFn: getTotalAmountIncomeThisMonth,
        staleTime: 1 * 60 * 60 * 1000
    })
}