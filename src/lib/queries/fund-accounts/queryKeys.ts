const all = ['fundAccounts'] as const

export const fundAccountsKeys = {
    lists: () => [...all, 'list'],
    list: (params: string) => [...all, 'list', {params}],
    options: () => [...all, 'option'],

    counts: {
        all: () => [...all, 'count', 'all'],
        actives: {
            all: () => [...all, 'count', 'active', 'all'],
            nonCash: () => [...all, 'count', 'active', 'nonCash']
        }
    },

    totals: {
        all: () => [...all, 'total'],
        balances: {
            all: () => [...all, 'total', 'balance'],
            nonCash: () => [...all, 'total', 'balance', 'nonCash'],
            cash: () => [...all, 'total', 'balance', 'cash']
        }
    },
}

// export const eventsKeys = {
//     lists: () => [...all, 'list'],
//     list: (params: string) => [...all, 'list', {params}],
//     options: () => [...all, 'option'],
//     counts: () => [...all, 'count'],
//     allCount: () => [...all, 'count', 'all'],
//     publicCount: () => [...all, 'count', 'public'],
//     budgets: () => [...all, 'budget'],
//     totalBudget: () => [...all, 'budget', 'total']
// }


// export const queryGetAllFundAccountsOptions = (params: string) => {
//     return queryOptions({
//         queryKey: ['getAllFundAccounts', params],
//         queryFn: async () =>  apiFundAccountsGetAll({params}),
//         staleTime: 5 * 60 * 1000,
//         gcTime: 10 * 60 * 1000
//     })
// }

// export const queryGetAllFundAccountsOnlyOptions = () => {
//     return queryOptions({
//         queryKey: ["getAllFundAccountsOptions"],
//         queryFn: apiFundAccountsGetAllOptions,
//         staleTime: 5 * 60 * 1000,
//         gcTime: 10 * 60 * 1000
//     })
// }

// export const queryGetCountActiveFundAccountsOptions = () => {
//     return queryOptions({
//         queryKey: ['getCountActiveFundAccounts'],
//         queryFn: async () => apiFundAccountsGetCountActive(),
//         staleTime: 5 * 60 * 1000,
//         gcTime: 10 * 60 * 1000
//     })
// }

// export const queryGetTotalBalanceFundAccountsOptions = (options: Partial<UseQueryOptions<number>> = {}) => {
//     return queryOptions({
//         queryKey: ['getTotalBalanceFundAccounts'],
//         queryFn: () => apiFundAccountsGetTotalBalance(),
//         staleTime: 5 * 60 * 1000,
//         gcTime: 10 * 60 * 1000,
//         ...options
//     })
// }

// export const queryGetTotalBalanceNonCashFundAccountsOptions = () => {
//     return queryOptions({
//         queryKey: ['getTotalBalanceNonCashFundAccounts'],
//         queryFn: apiFundAccountsGetTotalBalanceNonCash,
//         staleTime: 5 * 60 * 1000,
//         gcTime: 10 * 60 * 1000
//     })
// }

// export const queryGetTotalBalanceCashFundAccountsOptions = () => {
//     return queryOptions({
//         queryKey: ['getTotalBalanceCashFundAccounts'],
//         queryFn: () => apiFundAccountsGetTotalBalanceCash(),
//         staleTime: 5 * 60 * 1000,
//         gcTime: 10 * 60 * 1000
//     })
// }

// export const queryGetCountActiveNonCashFundAccountsOptions = () => {
//     return queryOptions({
//         queryKey: ['getCountActiveNonCashFundAccounts'],
//         queryFn: () => apiFundAccountsGetCountActiveNonCash(),
//         staleTime: 5 * 60 * 1000,
//         gcTime: 10 * 60 * 1000
//     })
// }