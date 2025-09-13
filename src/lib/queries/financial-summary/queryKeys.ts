const all = ['financial-summaries'] as const

export const financialSummaryKeys = {
    monthly: () => [...all, 'monthly']
}