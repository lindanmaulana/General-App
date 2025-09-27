"use client"

import { useSettingStore } from "@/hooks/useSettingStore"
import { ReactNode } from "react"

interface SystemSettingProps {
    children: ReactNode
}

export const SystemSetting = ({children}: SystemSettingProps) => {
    useSettingStore()
    
    return (
        <>{children}</>
    )
}