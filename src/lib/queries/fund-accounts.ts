import { queryOptions } from "@tanstack/react-query"
import { apiFundAccountsGetAll, apiFundAccountsGetAllOptions, apiFundAccountsGetCountActive, apiFundAccountsGetCountActiveNonCash, apiFundAccountsGetTotalBalance, apiFundAccountsGetTotalCash } from "../api/fund-accounts"

export const queryGetAllFundAccountsOptions = (params: string) => {
    return queryOptions({
        queryKey: ['getAllFundAccounts', params],
        queryFn: async () =>  apiFundAccountsGetAll({params}),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000
    })
}

export const queryGetAllFundAccountsOnlyOptions = () => {
    return queryOptions({
        queryKey: ["getAllFundAccountsOptions"],
        queryFn: apiFundAccountsGetAllOptions,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000
    })
}

export const queryGetCountActiveFundAccountsOptions = () => {
    return queryOptions({
        queryKey: ['getCountActiveFundAccounts'],
        queryFn: async () => apiFundAccountsGetCountActive(),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000
    })
}

export const queryGetTotalBalanceFundAccountsOptions = () => {
    return queryOptions({
        queryKey: ['getTotalBalanceFundAccounts'],
        queryFn: () => apiFundAccountsGetTotalBalance(),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000
    })
}

export const queryGetTotalCashFundAccountsOptions = () => {
    return queryOptions({
        queryKey: ['getTotalCashFundAccounts'],
        queryFn: () => apiFundAccountsGetTotalCash(),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000
    })
}

export const queryGetCountActiveNonCashFundAccountsOptions = () => {
    return queryOptions({
        queryKey: ['getCountActiveNonCashFundAccounts'],
        queryFn: () => apiFundAccountsGetCountActiveNonCash(),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000
    })
}