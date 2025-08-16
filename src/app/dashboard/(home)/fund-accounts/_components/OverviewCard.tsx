'use client';
import { Card, CardContent } from '@/components/ui/card';
import { queryGetCountActiveFundAccountsOptions, queryGetCountActiveNonCashFundAccountsOptions, queryGetTotalBalanceFundAccountsOptions, queryGetTotalCashFundAccountsOptions } from '@/lib/queries/fund-accounts';
import { useShow } from '@/lib/zustand/useShow';
import { useQuery } from '@tanstack/react-query';
import { CreditCard, Wallet } from 'lucide-react';
import { TypeActive, TypeActiveNonCash, TypeTotalBalance, TypeTotalCash } from '../types';
import { SkeletonOverviewCard } from './SkeletonOverviewCard';
import { ErrorOverview } from './ErrorOverview';

export const OverviewCard = () => {
  const isShow = useShow((state) => state.isShow);

  const queryCountActive: TypeActive = useQuery(queryGetCountActiveFundAccountsOptions())
  const queryTotalBalance: TypeTotalBalance = useQuery(queryGetTotalBalanceFundAccountsOptions())
  const queryTotalCash: TypeTotalCash = useQuery(queryGetTotalCashFundAccountsOptions())
  const queryCountActiveNonCash: TypeActiveNonCash = useQuery(queryGetCountActiveNonCashFundAccountsOptions())

  if(queryCountActive.isLoading || queryTotalBalance.isLoading || queryTotalCash.isLoading || queryCountActiveNonCash.isLoading) return <SkeletonOverviewCard />

  if(queryCountActive.isError || queryTotalBalance.isError || queryTotalCash.isError || queryCountActiveNonCash.isError) return <ErrorOverview />

  const totalBalance: number = queryTotalBalance.data ?? 0
  const totalCash: number = queryTotalCash.data ?? 0
  const countActiveNonCash: number = queryCountActiveNonCash.data ?? 0

  return (
    <div className="grid grid-cols-3 gap-3">
      <Card className="w-full bg-gnrPrimary/10">
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-gnrPrimary font-semibold">Total Saldo</h4>
            <Wallet className="size-4 text-gnrPrimary" />
          </div>
          <div className="t">
            <strong className="text-2xl text-gnrPrimary">{isShow ? totalBalance : '........'}</strong>
            <span className="block text-xs text-gnrGray">Dari {countActiveNonCash} akun yang aktif (non cash)</span>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-gnrDark font-semibold">Akun</h4>
            <CreditCard className="size-4 text-gnrDark" />
          </div>
          <div className="t">
            <strong className="text-2xl text-gnrDark">{queryCountActive.data}</strong>
            <span className="block text-xs text-gnrGray">akun aktif</span>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-gnrDark font-semibold">Kas Tunai</h4>
            <Wallet className="size-4 text-gnrDark" />
          </div>
          <div className="t">
            <strong className="text-2xl text-gnrDark">{isShow ? totalCash : '........'}</strong>
            <span className="block text-xs text-gnrGray">Saldo kas tersedia</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
