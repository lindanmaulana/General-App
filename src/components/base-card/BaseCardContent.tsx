"use client"

import { ReactNode } from "react"
import { CardContent } from "@/components/ui/card"

interface BaseCardContentProps {
    children?: ReactNode
    style?: string
}

export const BaseCardContent = (props: BaseCardContentProps) => {
    const {children, style} = props
    return (
        <CardContent className={`${style}`}>
            {children}
        </CardContent>
    )
}