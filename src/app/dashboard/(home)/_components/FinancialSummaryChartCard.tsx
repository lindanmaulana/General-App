"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FinancialSummaryChart } from "./FinancialSummaryChart"

export const FinancialSummaryChartCard = () => {


    return (
        <section className="col-span-1 lg:col-span-4">
            <Card>
                <CardHeader>
                    <CardTitle>Tren Cash Flow</CardTitle>
                    <CardDescription>Perkembangan arus kas 6 bulan terakhir</CardDescription>
                </CardHeader>

                <CardContent>
                    <FinancialSummaryChart />
                </CardContent>
            </Card>
        </section>
    )
}