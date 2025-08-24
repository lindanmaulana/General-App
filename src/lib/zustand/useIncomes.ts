import { incomes } from "@/app/api/_lib/models/incomes"
import { create } from "zustand"

type State = {
    data: incomes[] | []
}

type Action = {
    setData: (data: incomes[]) => void
}

export const useIncomes = create<State & Action>((set) => ({
    data: [],
    setData: (data: incomes[]) => set(() => ({data: data}))
}))