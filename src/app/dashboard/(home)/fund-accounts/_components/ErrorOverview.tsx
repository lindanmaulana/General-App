"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export const ErrorOverview = () => {
    const router = useRouter()

    return (
        <div className="w-full py-8">
            <div className="flex flex-col items-center justify-center gap-2">
                <strong className="font-normal">Gagal memuat data. Silakan coba lagi.</strong>
                <Button size={"sm"} onClick={() => router.refresh()}>Refresh</Button>
            </div>
        </div>
    )
}