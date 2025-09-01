'use client';
import { SkeletonOverviewCard } from '@/app/dashboard/(home)/_components/skeleton/SkeletonOverviewCard';
import { Card, CardContent } from '@/components/ui/card';
import {
  queryGetCountActiveFundAccountsOptions,
  queryGetCountActiveNonCashFundAccountsOptions,
  queryGetTotalBalanceCashFundAccountsOptions,
  queryGetTotalBalanceFundAccountsOptions,
  queryGetTotalBalanceNonCashFundAccountsOptions,
} from '@/lib/queries/fund-accounts';
import { useShow } from '@/lib/zustand/useShow';
import { useQuery } from '@tanstack/react-query';
import { CreditCard, Wallet } from 'lucide-react';
import { TypeActive, TypeActiveNonCash, TypeTotalBalance, TypeTotalCash } from '../_types';

export const OverviewCard = () => {
  const isShow = useShow((state) => state.isShow);

  const queryCountActive: TypeActive = useQuery(queryGetCountActiveFundAccountsOptions());
  const queryTotalBalance: TypeTotalBalance = useQuery(queryGetTotalBalanceFundAccountsOptions());
  const queryTotalBalanceNonCash = useQuery(queryGetTotalBalanceNonCashFundAccountsOptions());
  const queryTotalBalanceCash: TypeTotalCash = useQuery(queryGetTotalBalanceCashFundAccountsOptions());
  const queryCountActiveNonCash: TypeActiveNonCash = useQuery(queryGetCountActiveNonCashFundAccountsOptions());

  if (queryCountActive.isLoading || queryTotalBalance.isLoading || queryTotalBalanceNonCash.isLoading || queryTotalBalanceCash.isLoading || queryCountActiveNonCash.isLoading)
    return <SkeletonOverviewCard totalCard={4} />;

  if (queryCountActive.isError || queryTotalBalance.isError || queryTotalBalanceNonCash.isError || queryTotalBalanceCash.isError || queryCountActiveNonCash.isError) return <></>;

  const totalBalance: number = queryTotalBalance.data ?? 0;
  const totalBalanceNonCash: number = queryTotalBalanceNonCash.data ?? 0;
  const totalBalanceCash: number = queryTotalBalanceCash.data ?? 0;
  const countActiveNonCash: number = queryCountActiveNonCash.data ?? 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      <Card className="dark:border-white/20 w-full bg-gnrPrimary/10">
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-gnrPrimary font-semibold">Total Saldo</h4>
            <Wallet className="size-4 text-gnrPrimary" />
          </div>
          <div className="t">
            <strong className="text-2xl text-gnrPrimary">{isShow ? totalBalance : '........'}</strong>
            <span className="block text-xs text-gnrGray">Dari {countActiveNonCash} akun yang aktif (Non Cash)</span>
          </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-black dark:border-white/20 w-full">
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="dark:text-gnrWhite text-gnrDark font-semibold">Akun</h4>
            <CreditCard className="size-4 text-gnrDark" />
          </div>
          <div className="t">
            <strong className="dark:text-gnrWhite text-2xl text-gnrDark">{queryCountActive.data}</strong>
            <span className="block text-xs text-gnrGray">akun aktif</span>
          </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-black dark:border-white/20 w-full">
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="dark:text-gnrWhite text-gnrDark font-semibold">Kas Non Tunai</h4>
            <Wallet className="size-4 text-gnrDark" />
          </div>
          <div className="t">
            <strong className="dark:text-gnrWhite text-2xl text-gnrDark">{isShow ? totalBalanceNonCash : '........'}</strong>
            <span className="block text-xs text-gnrGray">Saldo kas tersedia</span>
          </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-black dark:border-white/20 w-full">
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="dark:text-gnrWhite text-gnrDark font-semibold">Kas Tunai</h4>
            <Wallet className="size-4 text-gnrDark" />
          </div>
          <div className="t">
            <strong className="dark:text-gnrWhite text-2xl text-gnrDark">{isShow ? totalBalanceCash : '........'}</strong>
            <span className="block text-xs text-gnrGray">Saldo kas tersedia</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
