"use client"

import { errorHandler } from "@/lib/helpers/errorHandler";
import { fundAccountTotalBalanceOptions } from "@/lib/queries/fund-accounts/fundAccountTotalBalanceOptions";
import { pdfDocumentSettingListOptions } from "@/lib/queries/settings/pdfDocumentSettingListOptions";
import { PostExportDataCustom } from "@/lib/services/export-data.service";
import { typeExportDataCustomSchema } from "@/lib/validations/export-data";
import { useExportData } from "@/lib/zustand/useExportData";
import { usePdfDocumentSetting } from "@/lib/zustand/usePdfDocumentSetting";
import { useMutation, useQueries } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";


interface useCustomExportDataProps {
    isOpen: boolean
}

export const useCustomExportData = ({isOpen}: useCustomExportDataProps) => {
    const formatFile = useExportData((state) => state.format)
    const dateFile = useExportData((state) => state.date);
    const categoryDataFile = useExportData((state) => state.category_data);
    const eventsFile = useExportData((state) => state.events);

    const setStatePdfDocumentSetting = usePdfDocumentSetting((state) => state.setState)

    const {dataTotalBalance, dataPdfDocumentSetting, isLoading, isError} = useQueries({
        queries: [fundAccountTotalBalanceOptions({enabled: isOpen}), pdfDocumentSettingListOptions({enabled: formatFile.toLowerCase() === "pdf"})],
        combine: (results) => {
            return {
                dataTotalBalance: results[0].data,
                dataPdfDocumentSetting: results[1].data,
                isLoading: results.some(result => result.isLoading),
                isError: results.some(result => result.isError)
            }
        }
    })

    const mutationFn = useMutation({
        mutationKey: ['exportDataCustom'],
        mutationFn: (data: typeExportDataCustomSchema) => PostExportDataCustom(data),
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

    // setter gloabl state
    useEffect(() => {
        if (dataPdfDocumentSetting) setStatePdfDocumentSetting(dataPdfDocumentSetting)
    }, [dataPdfDocumentSetting, setStatePdfDocumentSetting])

    return {formatFile, dataTotalBalance, dataPdfDocumentSetting, isLoading, isError, mutationFn, fetchData}
}