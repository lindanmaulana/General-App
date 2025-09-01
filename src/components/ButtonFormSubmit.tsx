"use client"

import { useFormStatus } from "react-dom"
import { Button } from "./ui/button"

interface ButtonFormSubmitProps {
    title?: string
    loading?: string
    type?: "button" | "reset" | "submit"
    variant?: "default" | "destructive" | "ghost" | "link" | "outline" | "secondary"
    style?: string
}
export const ButtonFormSubmit = (props: ButtonFormSubmitProps) => {
    const {type = "submit", title, loading = "Loading...", style, variant = "default"} = props
    const { pending } = useFormStatus()

    return (
        <Button type={type} variant={variant} className={`${style} cursor-pointer`} disabled={pending}>{pending ? loading : title}</Button>
    )
}