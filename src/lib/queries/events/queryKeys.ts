const all = ['events'] as const

export const eventsKeys = {
    lists: () => [...all, 'list'],
    list: (params: string) => [...all, 'list', {params}],
    options: () => [...all, 'option'],
    counts: () => [...all, 'count'],
    allCount: () => [...all, 'count', 'all'],
    publicCount: () => [...all, 'count', 'public'],
    budgets: () => [...all, 'budget'],
    totalBudget: () => [...all, 'budget', 'total']
}