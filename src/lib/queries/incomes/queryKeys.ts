const all = ["incomes"] as const

export const incomesKeys = {
    lists: () => [...all, 'list'],
    list: (params: string) => [...all, 'list', {params}],

    total: {
        all: () => [...all, 'total'],
        
        amount: {
            all: () => [...all, 'total', 'amount'],

            month: () => [...all, 'total', 'amount', 'month']
        }
    }
}