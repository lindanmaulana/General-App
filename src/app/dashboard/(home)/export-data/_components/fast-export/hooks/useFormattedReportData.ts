"use client"

import { apiExportDataCustom } from "@/lib/api/export-data"
import { typeExportDataCustomSchema } from "@/lib/validations/export-data"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useCallback } from "react"
import { useGetStartEndOfCurrentMonth } from "./useGetStartEndOfCurrentMonth"
import { fundAccountTotalBalanceOptions } from "@/lib/queries/fund-accounts/fundAccountTotalBalanceOptions"

export const useFormattedReportData = () => {
    const {startDate, endDate} = useGetStartEndOfCurrentMonth()

    const mutationFn = useMutation({
        mutationKey: ['exportDataFast'],
        mutationFn: (data: typeExportDataCustomSchema) => apiExportDataCustom(data),
    })

    const queryTotalBalance = useQuery(fundAccountTotalBalanceOptions({enabled: mutationFn.isSuccess}))

    console.log({startDate, endDate})

    const fetchData = useCallback(() => {
        mutationFn.mutate({category_data: {incomes: true, expenses: true}, date_file: {start_date: startDate, end_date: endDate}, events: []})

    }, [mutationFn, startDate, endDate])

    return {fetchData, mutationFn, queryTotalBalance}
}