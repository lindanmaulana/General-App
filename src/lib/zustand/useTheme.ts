import { create } from "zustand"
import { persist } from "zustand/middleware"

type Theme = "dark" | "light"

type State = {
    theme: Theme
}

type Action = {
    handleTheme: (theme: Theme) => void
}

type ThemeStore = State & Action

export const useTheme = create<ThemeStore>()(
    persist((set) => ({
            theme: "dark",
            handleTheme: (theme: Theme) => set({theme: theme})
        }),
        {
            name: "theme"
        }
    )
)