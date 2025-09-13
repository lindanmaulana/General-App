import { queryOptions } from "@tanstack/react-query"
import { financialSummaryKeys } from "./queryKeys"
import { getFinancialSummaryMonthly } from "@/lib/services/financial-summaries.service"

export const financialSummaryMonthlyOptions = () => {
    return queryOptions({
        queryKey: financialSummaryKeys.monthly(),
        queryFn: getFinancialSummaryMonthly,
        staleTime: 1 * 60 * 60 * 1000
    })
}