"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Wallet } from "lucide-react"

export const FundAccountsDemo = () => {
    return (
        <section>
            <Card className="dark:bg-gnrDarkBlueMate dark:border-white/10">
                <CardContent className="h-[280px]">
                    <div className="h-full flex flex-col items-center justify-center gap-4">
                        <Wallet className="dark:text-gnrWhite size-20 text-gnrPrimary" />
                        <h3 className="dark:text-gnrWhite text-2xl font-bold">Kas & Bank</h3>
                        <p className="max-w-1/2 text-gnrGray text-base text-center">Halaman kas & bank dengan fitur lengkap untuk mengelola data finansial Anda.</p>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}