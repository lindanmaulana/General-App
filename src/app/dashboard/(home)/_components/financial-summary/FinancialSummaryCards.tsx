'use client';

import { Card, CardContent } from '@/components/ui/card';
import { handleParsePrice } from '@/lib/helpers/parsing';
import { expenseTotalAmountThisMonthOptions } from '@/lib/queries/expenses/expenseTotalAmountThisMonthOptions';
import { fundAccountActiveCountOptions } from '@/lib/queries/fund-accounts/fundAccountActiveCountOptions';
import { fundAccountTotalBalanceOptions } from '@/lib/queries/fund-accounts/fundAccountTotalBalanceOptions';
import { incomeTotalAmountThisMonthOptions } from '@/lib/queries/incomes/incomeTotalAmountThisMonthOptions';
import { useQueries } from '@tanstack/react-query';
import { DollarSign, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { SkeletonOverviewCard } from '../skeleton/SkeletonOverviewCard';

export const FinancialSummaryCards = () => {
  
  const {isLoading, isError, activeCount, totalBalance, totalAmountIncome, totalAmountExpense} = useQueries({
    queries: [fundAccountActiveCountOptions(), fundAccountTotalBalanceOptions({}), incomeTotalAmountThisMonthOptions(), expenseTotalAmountThisMonthOptions()],
    combine: (results) => {
      return {
        activeCount: results[0].data,
        totalBalance: results[1].data,
        totalAmountIncome: results[2].data,
        totalAmountExpense: results[3].data,
        isLoading: results.some(result => result.isLoading),
        isError: results.some(result => result.isError)
      }
    }
  })

  if (isLoading) return <SkeletonOverviewCard totalCard={4} />;

  if (isError) return <></>;

  const totalBalanceIdr = handleParsePrice(totalBalance ?? 0) ?? 0;
  const totalIncomesIdr = handleParsePrice(totalAmountIncome) ?? 0;
  const totalExpensesIdr = handleParsePrice(totalAmountExpense) ?? 0;

  return (
      <section className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Card className='dark:bg-black dark:border-white/20'>
          <CardContent className="space-y-2">
            <h3 className="text-gnrGray text-sm font-medium">Total Akun (active)</h3>
            <div className="flex items-center justify-between">
              <h4 className="dark:text-gnrWhite font-semibold">{activeCount}</h4>
              <div className="bg-gnrPrimary/20 p-1 rounded">
                <Wallet className="size-4 text-gnrPrimary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className='dark:bg-black dark:border-white/20'>
          <CardContent className="space-y-2">
            <h3 className="text-sm text-gnrGray font-medium">Pemasukan Bulan Ini</h3>
            <div className="flex items-center justify-between">
              <h4 className="dark:text-gnrWhite font-semibold">{totalIncomesIdr}</h4>
              <div className="bg-gnrGreen/20 p-1 rounded">
                <TrendingUp className="size-4 text-gnrGreen" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className='dark:bg-black dark:border-white/20'>
          <CardContent className="space-y-2">
            <h3 className="text-sm text-gnrGray font-medium">Pengeluaran Bulan Ini</h3>
            <div className="flex items-center justify-between">
              <h4 className="dark:text-gnrWhite font-semibold">{totalExpensesIdr}</h4>
              <div className="bg-gnrRed/20 p-1 rounded">
                <TrendingDown className="size-4 text-gnrRed" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className='dark:bg-black dark:border-white/20'>
          <CardContent className="space-y-2">
            <h3 className="text-sm text-gnrGray font-medium">Saldo Bersih</h3>
            <div className="flex items-center justify-between">
              <h4 className="dark:text-gnrWhite font-semibold">{totalBalanceIdr}</h4>
              <div className="bg-gnrPrimary/20 p-1 rounded">
                <DollarSign className="size-4 text-gnrPrimary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
)}