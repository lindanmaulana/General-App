"use client"

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { handleParsePrice } from "@/lib/helpers/parsing"
import { queryGetFinancialSummaryMonthlyOptions } from "@/lib/queries/financial-summary"
import { useQuery } from "@tanstack/react-query"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"


export const FinancialSummaryChart = () => {
    const {data, isLoading, isError} = useQuery(queryGetFinancialSummaryMonthlyOptions())

    if(isLoading) return <p>Loading...</p>
    if(isError) return <p>Error...</p>

    const chartConfig = {
        incomes: {
            label: "Pemasukan",
            color: "var(--gnrGreen)"
        },
        expenses: {
            label: "Pengeluaran",
            color: "var(--gnrRed)"
        },
        balance: {
            label: "Saldo Bersih",
            color: "var(--gnrPrimary)"
        }
    } satisfies ChartConfig

    return (
        <div className="min-h-40 py-4">
            <ResponsiveContainer width={"100%"} height={"100%"}>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 12,
                            right: 12
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis 
                            dataKey={'month'}
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <YAxis 
                            tick={{ fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value) => `${handleParsePrice(value)}`}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Line 
                            dataKey={"incomes"}
                            type={"monotone"}
                            stroke="var(--gnrGreen)"
                            strokeWidth={2}
                            dot={{ fill: 'var(--gnrGreen)', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, stroke: 'hsl(var(--gnrGreen))', strokeWidth: 2 }}
                        />
                        <Line 
                            dataKey={"expenses"}
                            type={"monotone"}
                            stroke="var(--gnrRed)"
                            strokeWidth={2}
                            dot={{ fill: 'var(--gnrRed)', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, stroke: 'hsl(var(--gnrRed))', strokeWidth: 2 }}
                        />
                        <Line 
                            dataKey={"balance"}
                            type={"monotone"}
                            stroke="var(--gnrPrimary)"
                            strokeWidth={2}
                            dot={{ fill: 'var(--gnrPrimary)', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, stroke: 'hsl(var(--gnrPrimary))', strokeWidth: 2 }}
                        />
                    </LineChart>
                </ChartContainer>
            </ResponsiveContainer>
        </div>
    )
}