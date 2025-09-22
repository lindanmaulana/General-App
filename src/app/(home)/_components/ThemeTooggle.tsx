"use client"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/zustand/useTheme"
import { Moon, Sun } from "lucide-react"
import {AnimatePresence, motion} from "motion/react"
import { varianstSwitchIcon } from "./motions/variants"

interface ThemeTooggleProps {
    style?: string
}
export const ThemeToogle = ({style}: ThemeTooggleProps) => {
    
    const theme = useTheme((state) => state.theme)
    const handleTheme = useTheme((state) => state.handleTheme)

    return (
        <Button onClick={() => handleTheme(theme === "dark" ? "light" : "dark")} variant={"ghost"} className={` cursor-pointer ${style} `}> 
            <AnimatePresence mode="wait">
                {theme === "dark" ? 
                    <motion.div key={"moon-icon"} initial="initial" animate="animate" exit="exit" variants={varianstSwitchIcon}transition={{duration: 0.4, ease: "easeInOut"}} ><Moon className="text-white" /></motion.div> 
                    : 
                    <motion.div key={"sun-icon"} initial="initial" animate="animate" exit="exit" variants={varianstSwitchIcon}transition={{duration: 0.4, ease: "easeInOut"}}  ><Sun className="text-black" /></motion.div>} 
            </AnimatePresence>
        </Button>
    )
}