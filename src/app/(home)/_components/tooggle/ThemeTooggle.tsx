"use client"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/zustand/useTheme"
import { Moon, Sun } from "lucide-react"

export const ThemeToogle = () => {
    
    const theme = useTheme((state) => state.theme)
    const handleTheme = useTheme((state) => state.handleTheme)

    return (
        <Button onClick={() => handleTheme(theme === "dark" ? "light" : "dark")} className={`bg-gnrWhite hover:bg-gnrWhite/80 dark:bg-black cursor-pointer`}> {theme === "dark" ? <Moon className="text-white" /> : <Sun className="text-black" />} </Button>
    )
}