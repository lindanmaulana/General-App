import { getProfileUser } from "@/lib/services/users.service"
import { queryOptions } from "@tanstack/react-query"
import { usersKeys } from "./queryKeys"

export const userProfileOptions = (id: string) => {
    return queryOptions({
        queryKey: usersKeys.profile(id),
        queryFn: () => getProfileUser(id),
        staleTime: 1 * 60 * 60 * 1000,
    })
}