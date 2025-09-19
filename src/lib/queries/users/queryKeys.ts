const all = ["users"] as const

export const usersKeys = {
    profiles: () => [...all, 'profile'],
    profile: (id: string) => [...all, 'profile', id]
}


// import { queryOptions } from "@tanstack/react-query"
// import { apiUsersGetProfile } from "../api/users"

// export const queryGetProfileUsersOptions = (id: string) => {
//     return queryOptions({
//         queryKey: ['getProfileUsers', id],
//         queryFn: () => apiUsersGetProfile(id),
//         staleTime: 5 * 60 * 1000,
//         gcTime: 10 * 60 * 1000
//     })
// }