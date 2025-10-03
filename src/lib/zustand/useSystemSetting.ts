import { create } from "zustand"

type State = {
    app_name: string
    logo_url: string
    organization_address: string
    tagline: string

    created_at: string
    updated_at: string
}


type Action = {
    setState: (data: Partial<State>) => void
}

type ConfigSystemSetting = State & Action

export const useSystemSetting = create<ConfigSystemSetting>((set) => ({
    app_name: "Loading...",
    logo_url: "/images/image-loader.png",
    organization_address: "...",
    tagline: "",
    created_at: "",
    updated_at: "",

    setState: (data) => set((state) => ({...state, ...data}))
}))