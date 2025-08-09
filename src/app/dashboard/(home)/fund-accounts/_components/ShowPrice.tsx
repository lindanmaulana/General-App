"use client"

import { Button } from "@/components/ui/button"
import { useShow } from "@/lib/zustand/useShow"
import { Eye, EyeClosed } from "lucide-react"

export const ShowPrice = () => {
    const isShow = useShow((state) => state.isShow)
    const handleShow = useShow((state) => state.handleShow)
    return (
        <Button onClick={handleShow} variant={"outline"}>
            {isShow ? (
                <>
                    <Eye /> <span>Tampilkan</span>
                </>
            ): (
                <>
                    <EyeClosed /> <span>Sembunyikan</span>
                </>
            )}
   
        </Button>
    )
}