"use client"
import { Button } from "./ui/button"

interface ButtonSubmitProps {
    title?: string
    loading?: string
    type?: "button" | "reset" | "submit"
    variant?: "default" | "destructive" | "ghost" | "link" | "outline" | "secondary"
    style?: string
    isLoading: boolean
}
export const ButtonSubmit = (props: ButtonSubmitProps) => {
    const {type = "submit", title, loading = "Loading...", style, variant = "default", isLoading} = props

    return (
        <Button type={type} variant={variant} className={`${style} cursor-pointer`} disabled={isLoading}>{isLoading ? loading : title}</Button>
    )
}