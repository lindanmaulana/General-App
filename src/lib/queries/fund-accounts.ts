import { queryOptions } from "@tanstack/react-query"
import { ApiFundAccountsGetAll } from "../api/fund-accounts"

export const queryGetAllFundAccountsOptions = (params: string) => {
    return queryOptions({
        queryKey: ['getAllFundAccounts', params],
        queryFn: async () =>  ApiFundAccountsGetAll({params}),
        staleTime: 5 * 1000,
        gcTime: 5 * 60 * 1000
    })
}