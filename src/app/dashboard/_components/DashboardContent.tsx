"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingDown, TrendingUp, Wallet } from "lucide-react"

export const DashboardContent = () => {
    return (
        <>
        <div className="grid grid-cols-4 gap-3">
            <Card>
                <CardContent className="space-y-2">
                    <h3 className="text-sm text-gnrGray font-medium">Total Saldo</h3>
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Rp 1.200.000</h4>
                        <div className="bg-gnrPrimary/20 p-1 rounded">
                            <Wallet className="size-4 text-gnrPrimary" />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="space-y-2">
                    <h3 className="text-sm text-gnrGray font-medium">Pemasukan Bulan Ini</h3>
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Rp 1.200.000</h4>
                        <div className="bg-gnrPrimary/20 p-1 rounded">
                            <TrendingUp className="size-4 text-gnrPrimary" />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="space-y-2">
                    <h3 className="text-sm text-gnrGray font-medium">Pengeluaran Bulan Ini</h3>
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Rp 1.200.000</h4>
                        <div className="bg-gnrPrimary/20 p-1 rounded">
                            <TrendingDown className="size-4 text-gnrPrimary" />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="space-y-2">
                    <h3 className="text-sm text-gnrGray font-medium">Saldo Bersih</h3>
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Rp 1.200.000</h4>
                        <div className="bg-gnrPrimary/20 p-1 rounded">
                            <DollarSign className="size-4 text-gnrPrimary" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
        
        </>
    )
}