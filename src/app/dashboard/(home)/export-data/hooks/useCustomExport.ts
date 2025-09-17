"use client"

import { apiExportDataCustom } from "@/lib/api/export-data";
import { errorHandler } from "@/lib/helpers/errorHandler";
import { fundAccountTotalBalanceOptions } from "@/lib/queries/fund-accounts/fundAccountTotalBalanceOptions";
import { typeExportDataCustomSchema } from "@/lib/validations/export-data";
import { useExportData } from "@/lib/zustand/useExportData"
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "sonner";


interface useCustomExportDataProps {
    isOpen: boolean
}

export const useCustomExportData = ({isOpen}: useCustomExportDataProps) => {
    const formatFile = useExportData((state) => state.format)
    const dateFile = useExportData((state) => state.date);
    const categoryDataFile = useExportData((state) => state.category_data);
    const eventsFile = useExportData((state) => state.events);

    const queryTotalBalance = useQuery(fundAccountTotalBalanceOptions({enabled: isOpen}))

    const mutationFn = useMutation({
        mutationKey: ['exportDataCustom'],
        mutationFn: (data: typeExportDataCustomSchema) => apiExportDataCustom(data),
        onError: (err) => toast.error(errorHandler(err)),
        onSuccess: () => toast.success("Data selesai dimuat..")
    })

    const fetchData = useCallback(() => {
        const data: typeExportDataCustomSchema = {
            category_data: categoryDataFile,
            date_file: {
                start_date: dateFile.start_date ?? '',
                end_date: dateFile.end_date ?? '',
            },
            events: eventsFile,
        };

        if(formatFile) mutationFn.mutate(data)
            
    }, [formatFile, dateFile, categoryDataFile, eventsFile, mutationFn])

    return {formatFile, queryTotalBalance, mutationFn, fetchData}
}