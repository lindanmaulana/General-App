import { create } from "zustand"

type State = {
    id: string
    label: string
}

type Action = {
    setActiveView: (view: State) => void
}

type DemoConfig = State & Action


export const useDemo = create<DemoConfig>((set => ({
    id: "DASHBOARD",
    label: "Dashboard",
    setActiveView: (view) => set({id: view.id, label: view.label})
})))