"use client"

import { brandingSystemSettingOptions } from "@/lib/queries/settings/brandingSystemSettingOptions"
import { useQuery } from "@tanstack/react-query"


export const useGetBrandingSystemSetting = () => {
    const {data, isLoading, isError} = useQuery(brandingSystemSettingOptions())

    return {data, isLoading, isError}
}