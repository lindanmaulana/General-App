'use client';
import { SkeletonOverviewCard } from '@/app/dashboard/(home)/_components/skeleton/SkeletonOverviewCard';
import { Card, CardContent } from '@/components/ui/card';
import { handleParsePrice } from '@/lib/helpers/parsing';
import { fundAccountActiveCountOptions } from '@/lib/queries/fund-accounts/fundAccountActiveCountOptions';
import { fundAccountTotalBalanceCashOptions } from '@/lib/queries/fund-accounts/fundAccountTotalBalanceCashOptions';
import { fundAccountTotalBalanceNonCashOptions } from '@/lib/queries/fund-accounts/fundAccountTotalBalanceNonCashOptions';
import { fundAccountTotalBalanceOptions } from '@/lib/queries/fund-accounts/fundAccountTotalBalanceOptions';
import { useShow } from '@/lib/zustand/useShow';
import { useQueries } from '@tanstack/react-query';
import { CreditCard, Wallet } from 'lucide-react';

export const OverviewCard = () => {
  const isShow = useShow((state) => state.isShow);

  const {isLoading, isError, activeCount, totalBalance, totalBalanceCash, totalBalanceNonCash} = useQueries({
    queries: [fundAccountActiveCountOptions(), fundAccountTotalBalanceOptions({}), fundAccountTotalBalanceCashOptions(), fundAccountTotalBalanceNonCashOptions()],
    combine: (results) => {
      return {
        activeCount: results[0].data,
        totalBalance: results[1].data,
        totalBalanceCash: results[2].data,
        totalBalanceNonCash: results[3].data,
        isLoading: results.some(query => query.isLoading),
        isError: results.some(query => query.isError)
      }
    }
  })

  if (isLoading) return <SkeletonOverviewCard totalCard={4} />;

  if (isError) return <></>;

  const totalBalanceIdr: string = handleParsePrice(totalBalance);
  const totalBalanceNonCashIdr: string = handleParsePrice(totalBalanceNonCash);
  const totalBalanceCashIdr: string = handleParsePrice(totalBalanceCash)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      <Card className="dark:border-white/20 w-full bg-gnrPrimary/10">
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-gnrPrimary font-semibold">Total Saldo</h4>
            <Wallet className="size-4 text-gnrPrimary" />
          </div>
          <div className="t">
            <strong className="text-2xl text-gnrPrimary">{isShow ? totalBalanceIdr : '........'}</strong>
            <span className="block text-xs text-gnrGray">Dari {activeCount} akun yang aktif (Non Cash)</span>
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
            <strong className="dark:text-gnrWhite text-2xl text-gnrDark">{activeCount}</strong>
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
            <strong className="dark:text-gnrWhite text-2xl text-gnrDark">{isShow ? totalBalanceNonCashIdr : '........'}</strong>
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
            <strong className="dark:text-gnrWhite text-2xl text-gnrDark">{isShow ? totalBalanceCashIdr : '........'}</strong>
            <span className="block text-xs text-gnrGray">Saldo kas tersedia</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
