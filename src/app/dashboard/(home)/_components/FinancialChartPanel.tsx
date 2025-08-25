"use client"

import { FinancialSummaryChartCard } from "./financial-summary/FinancialSummaryChartCard"
import { ToolbarCard } from "./toolbar/ToolbarCard"


export const FinancialChartPanel = () => {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-6 gap-3">
            <FinancialSummaryChartCard />
            <ToolbarCard />
        </section>
    )
}