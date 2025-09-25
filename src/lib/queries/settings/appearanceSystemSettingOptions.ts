import { queryOptions } from "@tanstack/react-query"
import { settingsKeys } from "./queryKeys"
import { getAppearanceSystemSetting } from "@/lib/services/users.service"

export const appearanceSystemSettingOptions = () => {
    return queryOptions({
        queryKey: settingsKeys.system.appearance.get(),
        queryFn: getAppearanceSystemSetting,
        staleTime: 1 * 60 * 60 * 1000
    })
}