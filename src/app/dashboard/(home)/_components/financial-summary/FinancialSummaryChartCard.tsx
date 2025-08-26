"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FinancialSummaryChart } from "./FinancialSummaryChart"

export const FinancialSummaryChartCard = () => {


    return (
        <section className="col-span-1 lg:col-span-4">
            <Card>
                <CardHeader>
                    <CardTitle>Tren Cash Flow</CardTitle>
                    <CardDescription>Perkembangan arus kas 1 tahun terakhir</CardDescription>
                </CardHeader>

                <CardContent>
                    <FinancialSummaryChart />

                    <div className="flex items-center justify-center gap-6">
                        <div className="flex items-center gap-1">
                            <div className="size-3.5 rounded-full bg-gnrGreen mt-0.5"></div>
                            <h4 className="text-gnrGray">Pemasukan</h4>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="size-3.5 rounded-full bg-gnrRed mt-0.5"></div>
                            <h4 className="text-gnrGray">Pengeluaran</h4>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="size-3.5 rounded-full bg-gnrPrimary mt-0.5"></div>
                            <h4 className="text-gnrGray">Saldo Bersih</h4>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}