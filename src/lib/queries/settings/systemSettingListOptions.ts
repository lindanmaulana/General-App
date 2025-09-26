import { queryOptions } from "@tanstack/react-query";
import { settingsKeys } from "./queryKeys";
import { getSystemSetting } from "@/lib/services/settings.service";

export const systemSettingListOptions = () => {
    return queryOptions({
        queryKey: settingsKeys.system.lists(),
        queryFn: getSystemSetting,
        staleTime: 1 * 60 * 60 * 1000,
    });
};
