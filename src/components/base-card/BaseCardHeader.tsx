"use client"

import { LucideIcon } from "lucide-react"
import { CardDescription, CardHeader, CardTitle } from "../ui/card"

interface BaseCardHeaderProps {
    title?: string
    description?: string
    Icon?: LucideIcon
    style?: string
}

export const BaseCardHeader = (props: BaseCardHeaderProps) => {
    const {title, description, Icon, style} = props
    return (
        <CardHeader className={style}>
            <CardTitle className="dark:text-gnrWhite flex items-center gap-1">
            {Icon && <Icon className="size-5" />} <span className="text-xl mt-px">{title}</span>
            </CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
    )
}