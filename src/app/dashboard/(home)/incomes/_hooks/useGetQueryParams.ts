"use client"

import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

export const useGetQueryParams = () => {
    const currentParams = useSearchParams()

    const defaultQueryParams = useMemo(() => {
        const defaultQueryKeyword = currentParams.get('keyword')?.toString() ?? '';
        const defaultQueryEvent = currentParams.get('event')?.toString() ?? 'default';
        const defaultQueryAccount = currentParams.get('account')?.toString() ?? 'default';
        const defaultQuerySort = currentParams.get('sort')?.toString() ?? 'default';
        const defaultQueryStartDate = currentParams.get('start-date') ? new Date(currentParams.get('start-date') ?? '') : undefined;
        const defaultQueryEndDate = currentParams.get('end-date') ? new Date(currentParams.get('end-date') ?? '') : undefined;

        return {defaultQueryKeyword, defaultQueryEvent, defaultQueryAccount, defaultQuerySort, defaultQueryStartDate, defaultQueryEndDate}
    }, [currentParams])

    return defaultQueryParams
}