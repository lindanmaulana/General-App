const all = ["expenses"] as const

export const expensesKeys = {
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