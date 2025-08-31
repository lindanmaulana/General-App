"use client"

import { useTheme } from "@/lib/zustand/useTheme"
import { ReactNode, useEffect } from "react"

interface ThemeProviderProps {
    children: ReactNode
}

export const ThemeProvider = ({children}: ThemeProviderProps) => {
    const theme = useTheme((state) => state.theme)

    useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove("light", "dark")

        root.setAttribute('data-theme', theme)
    }, [theme])

    return children
}