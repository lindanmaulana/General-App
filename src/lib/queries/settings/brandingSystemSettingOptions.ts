import { queryOptions } from "@tanstack/react-query"
import { settingsKeys } from "./queryKeys"
import { getBrandingSystemSetting } from "@/lib/services/users.service"

export const brandingSystemSettingOptions = () => {
    return queryOptions({
        queryKey: settingsKeys.system.branding.get(),
        queryFn: getBrandingSystemSetting,
        staleTime: 1 * 60 * 60 * 1000,
    })
}