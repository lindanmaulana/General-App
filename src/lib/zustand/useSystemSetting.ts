import { create } from "zustand"

type State = {
    app_name: string
    logo_url: string
    organization_address: string
    tagline: string

    wellcome_message_login: string
    wellcome_message_dashboard: string

    created_at: string
    updated_at: string
}


type Action = {
    setState: (data: Partial<State>) => void
}

type ConfigSystemSetting = State & Action

export const useSystemSetting = create<ConfigSystemSetting>((set) => ({
    app_name: "Loading...",
    logo_url: "...",
    organization_address: "...",
    tagline: "",
    wellcome_message_login: "",
    wellcome_message_dashboard: "",
    created_at: "",
    updated_at: "",

    setState: (data) => set((state) => ({...state, ...data}))
}))


//   "branding": {
//     "appName": "General App",
//     "logoUrl": "/assets/logo.png",
//     "organizationAddress": "Desa Muncangela, Kec. Cipicung, Kab. Kuningan",
//     "tagline": "Management"
//   },
//   "appearance": {
//     "welcomeMessageLogin": "Welcome back",
//     "welcomeMessageDashboard": "Selamat Datang di General CashFlow",
//     "ctaText": "Mulai Sekarang",
//     "defaultTheme": "dark"
//   },