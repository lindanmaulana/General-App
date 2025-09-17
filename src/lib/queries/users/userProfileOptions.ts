import { getProfileUser } from "@/lib/services/users.service"
import { queryOptions } from "@tanstack/react-query"

export const userProfileOptions = (id: string) => {
    return queryOptions({
        queryKey: ['getProfileUsers', id],
        queryFn: () => getProfileUser(id),
        staleTime: 1 * 60 * 60 * 1000,
    })
}