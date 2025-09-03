import { create } from "zustand"

type State = {
    format: string
    date: {
        start_date?: string
        end_date?: string
    }
    category_data: {
        incomes: boolean
        expenses: boolean
    },
    events: string[]
}

type Action = {
    setConfig: (data: Partial<State>) => void
    resetConfig: () => void
}

type ExportConfig = State & Action

export const useExportData = create<ExportConfig>((set) => ({
    format: "",
    date: {
        start_date: "",
        end_date: "",
    },
    category_data: {
        incomes: false,
        expenses: false
    },
    events: [],
    setConfig: (data: Partial<State>) => set((state) => ({...state, ...data})),
    resetConfig: () => set({
        format: "",
        date: {
            start_date: "",
            end_date: "",
        },
        category_data: {
            incomes: false,
            expenses: false
        },
        events: []
    })
}))