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