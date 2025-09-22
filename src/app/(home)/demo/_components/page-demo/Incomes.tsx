"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

export const IncomesDemo = () => {
    return (
        <Card className="dark:bg-gnrDarkBlueMate dark:border-white/10">
            <CardContent className="h-[280px]">
                <div className="h-full flex flex-col items-center justify-center gap-4">
                    <TrendingUp className="size-20 text-gnrGreen" />
                    <h3 className="dark:text-gnrWhite text-2xl font-bold">Pemasukan</h3>
                    <p className="max-w-1/2 text-gnrGray text-base text-center">Halaman pemasukan dengan fitur lengkap untuk mengelola data finansial Anda.</p>
                </div>
            </CardContent>
        </Card>
    )
}