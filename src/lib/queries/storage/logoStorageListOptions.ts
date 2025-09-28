import { queryOptions } from "@tanstack/react-query"
import { storageKeys } from "./queryKeys"
import { getStorageLogo } from "@/lib/services/storage.service"

export const logoStorageListOptions = () => {
    return queryOptions({
        queryKey: storageKeys.logo.lists(),
        queryFn: getStorageLogo,
        staleTime: 1 * 60 * 60 * 1000
    })
}