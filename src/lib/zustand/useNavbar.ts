import { create } from "zustand"

type State = {
    isActive: boolean
}

type Action = {
    handleNavbar: () => void
}

export const useNavbar = create<State & Action>((set) => ({
    isActive: false,
    handleNavbar: () => set((state) => ({isActive: !state.isActive}))
}))