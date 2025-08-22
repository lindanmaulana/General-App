"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { queryGetCountActiveFundAccountsOptions, queryGetTotalBalanceFundAccountsOptions } from "@/lib/queries/fund-accounts"
import { useQuery } from "@tanstack/react-query"
import { DollarSign, TrendingDown, TrendingUp, Wallet } from "lucide-react"
import { SkeletonOverviewCard } from "./SkeletonOverviewCard"
import { handleParsePrice } from "@/lib/helpers/parsing"
import { queryGetTotalAmountThisMonthIncomesOptions } from "@/lib/queries/incomes"
import { queryGetTotalAmountThisMonthExpensesOptions } from "@/lib/queries/expenses"

export const DashboardContent = () => {

    const queryTotalAccountActive = useQuery(queryGetCountActiveFundAccountsOptions())
    const queryTotalBalance = useQuery(queryGetTotalBalanceFundAccountsOptions())
    const queryTotalIncomesThisMonth = useQuery(queryGetTotalAmountThisMonthIncomesOptions())
    const queryTotalExpensesThisMonth = useQuery(queryGetTotalAmountThisMonthExpensesOptions())

    if(queryTotalBalance.isLoading || queryTotalAccountActive.isLoading || queryTotalIncomesThisMonth.isLoading || queryTotalExpensesThisMonth.isLoading) return <SkeletonOverviewCard totalCard={4} />

    if(queryTotalBalance.isLoading || queryTotalAccountActive.isError || queryTotalIncomesThisMonth.isError || queryTotalExpensesThisMonth.isError) return <></>

    const totalAccountActive = queryTotalAccountActive.data ?? 0

    const totalBalance = handleParsePrice(queryTotalBalance.data) ?? 0
    const totalIncomesThisMonth = handleParsePrice(queryTotalIncomesThisMonth.data) ?? 0
    const totalExpensesThisMonth = handleParsePrice(queryTotalExpensesThisMonth.data) ?? 0

    return (
        <>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Card>
                <CardContent className="space-y-2">
                    <h3 className="text-sm text-gnrGray font-medium">Total Akun (active)</h3>
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{totalAccountActive}</h4>
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
                        <h4 className="font-semibold">{totalIncomesThisMonth}</h4>
                        <div className="bg-gnrGreen/20 p-1 rounded">
                            <TrendingUp className="size-4 text-gnrGreen" />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="space-y-2">
                    <h3 className="text-sm text-gnrGray font-medium">Pengeluaran Bulan Ini</h3>
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{totalExpensesThisMonth}</h4>
                        <div className="bg-gnrRed/20 p-1 rounded">
                            <TrendingDown className="size-4 text-gnrRed" />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="space-y-2">
                    <h3 className="text-sm text-gnrGray font-medium">Saldo Bersih</h3>
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{totalBalance}</h4>
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