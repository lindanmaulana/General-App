"use client"

import { useFormStatus } from "react-dom"
import { Button } from "./ui/button"

interface ButtonFormSubmitProps {
    title?: string
    loading?: string
    type?: "button" | "reset" | "submit"
}
export const ButtonFormSubmit = (props: ButtonFormSubmitProps) => {
    const {type = "submit", title, loading = "Loading..."} = props
    const {pending} = useFormStatus()

    return (
        <Button type={type} className="bg-gnrPrimary w-full text-gnrWhite hover:bg-gnrPrimary/70 cursor-pointer" disabled={pending}>{pending ? loading : title}</Button>
    )
}