'use client';

import { Card, CardContent } from '@/components/ui/card';
import { handleParsePrice } from '@/lib/helpers/parsing';
import { queryGetTotalAmountThisMonthExpensesOptions } from '@/lib/queries/expenses';
import { queryGetCountActiveFundAccountsOptions, queryGetTotalBalanceFundAccountsOptions } from '@/lib/queries/fund-accounts';
import { queryGetTotalAmountThisMonthIncomesOptions } from '@/lib/queries/incomes';
import { useQuery } from '@tanstack/react-query';
import { DollarSign, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { SkeletonOverviewCard } from '../skeleton/SkeletonOverviewCard';

export const FinancialSummaryCards = () => {
  const queryTotalAccountActive = useQuery(queryGetCountActiveFundAccountsOptions());
  const queryTotalBalance = useQuery(queryGetTotalBalanceFundAccountsOptions());
  const queryTotalIncomesThisMonth = useQuery(queryGetTotalAmountThisMonthIncomesOptions());
  const queryTotalExpensesThisMonth = useQuery(queryGetTotalAmountThisMonthExpensesOptions());

  if (queryTotalBalance.isLoading || queryTotalAccountActive.isLoading || queryTotalIncomesThisMonth.isLoading || queryTotalExpensesThisMonth.isLoading) return <SkeletonOverviewCard totalCard={4} />;

  if (queryTotalBalance.isLoading || queryTotalAccountActive.isError || queryTotalIncomesThisMonth.isError || queryTotalExpensesThisMonth.isError) return <></>;

  const totalAccountActive = queryTotalAccountActive.data ?? 0;

  const totalBalance = handleParsePrice(queryTotalBalance.data ?? 0) ?? 0;
  const totalIncomesThisMonth = handleParsePrice(queryTotalIncomesThisMonth.data) ?? 0;
  const totalExpensesThisMonth = handleParsePrice(queryTotalExpensesThisMonth.data) ?? 0;

  return (
      <section className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Card className='dark:bg-black dark:border-white/20'>
          <CardContent className="space-y-2">
            <h3 className="text-gnrGray text-sm font-medium">Total Akun (active)</h3>
            <div className="flex items-center justify-between">
              <h4 className="dark:text-gnrWhite font-semibold">{totalAccountActive}</h4>
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
              <h4 className="dark:text-gnrWhite font-semibold">{totalIncomesThisMonth}</h4>
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
              <h4 className="dark:text-gnrWhite font-semibold">{totalExpensesThisMonth}</h4>
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
              <h4 className="dark:text-gnrWhite font-semibold">{totalBalance}</h4>
              <div className="bg-gnrPrimary/20 p-1 rounded">
                <DollarSign className="size-4 text-gnrPrimary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
)}