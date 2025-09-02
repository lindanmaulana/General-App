import { create } from "zustand"
import { persist } from "zustand/middleware"

type State = {
    format: string
    start_date: string
    end_date: string
    category_data: {
        incomes: boolean
        expenses: boolean
    }
}

type Action = {
    setConfig: (data: Partial<State>) => void
    resetConfig: () => void
}

type ExportConfig = State & Action


export const useExportData = create<ExportConfig>()(
    persist((set) => ({
        format: "",
        start_date: "",
        end_date: "",
        category_data: {
            incomes: false,
            expenses: false
        },
        setConfig: (data: Partial<State>) => set((state) => ({...state, ...data})),
        resetConfig: () => set({
            format: "",
            start_date: "",
            end_date: "",
            category_data: {
                incomes: false,
                expenses: false
            }
        })
    }),
    {
        name: "export-data",
        storage: {
            getItem: (name) => {
                const items = sessionStorage.getItem(name)

                return items ? JSON.parse(items) : null
            },

            setItem: (name, value) => sessionStorage.setItem(name, JSON.stringify(value)),
            removeItem: (name) => sessionStorage.removeItem(name)
        }
    }
    )
)