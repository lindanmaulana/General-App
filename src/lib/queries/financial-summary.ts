import { queryOptions } from "@tanstack/react-query";
import { apiGetFinancialSummaryMonthly } from "../api/financial-summary";

export const queryGetFinancialSummaryMonthlyOptions = () => {
    return queryOptions({
        queryKey: ['getFinancialSummaryMonthly'],
        queryFn: apiGetFinancialSummaryMonthly,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000
    })
}