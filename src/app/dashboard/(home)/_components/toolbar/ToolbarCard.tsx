"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ToolbarCreateIncomes } from "./ToolbarCreateIncomes"
import { ToolbarCreateExpenses } from "./ToolbarCreateExpenses"

export const ToolbarCard = () => {
    return (
        <section className="w-full col-span-1 lg:col-span-2">
            <Card className="dark:bg-black dark:border-white/20">
                <CardHeader>
                    <CardTitle className="text-black dark:text-white">Aksi Cepat</CardTitle>
                    <CardDescription>Tindakan yang sering di gunakan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <ToolbarCreateIncomes />
                    <ToolbarCreateExpenses />
                </CardContent>
            </Card>
        </section>
    )
}