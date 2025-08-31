"use client"

import { ReactNode } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

interface CustomTooltipProps {
    children: ReactNode
    textTooltip: string
}

export const CustomTooltip = ({children, textTooltip}: CustomTooltipProps) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent>
                <p>{textTooltip}</p>
            </TooltipContent>
        </Tooltip>
    )
}