'use client';
import { Card, CardContent } from '@/components/ui/card';
import { queryGetAllFundAccountsIsActiveOptions } from '@/lib/queries/fund-accounts';
import { useShow } from '@/lib/zustand/useShow';
import { useQuery } from '@tanstack/react-query';
import { CreditCard, Wallet } from 'lucide-react';
import { SkeletonOverviewCard } from './SkeletonOverviewCard';

export const OverviewCard = () => {
  const queryFundAccountsIsActive = useQuery(queryGetAllFundAccountsIsActiveOptions())
  const isShow = useShow((state) => state.isShow);

  if(queryFundAccountsIsActive.isLoading) return <SkeletonOverviewCard />

  if(queryFundAccountsIsActive.isError) return <p>Error...</p>

  return (
    <div className="grid grid-cols-3 gap-3">
      <Card className="w-full bg-gnrPrimary/10">
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-gnrPrimary font-semibold">Total Saldo</h4>
            <Wallet className="size-4 text-gnrPrimary" />
          </div>
          <div className="t">
            <strong className="text-2xl text-gnrPrimary">{isShow ? 'Rp 19.000.000' : '........'}</strong>
            <span className="block text-xs text-gnrGray">Dari 5 akun yang aktif</span>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-gnrDark font-semibold">Akun Bank</h4>
            <CreditCard className="size-4 text-gnrDark" />
          </div>
          <div className="t">
            <strong className="text-2xl text-gnrDark">{queryFundAccountsIsActive.data}</strong>
            <span className="block text-xs text-gnrGray">akun bank aktif</span>
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
            <strong className="text-2xl text-gnrDark">{isShow ? 'Rp 19.000.000' : '........'}</strong>
            <span className="block text-xs text-gnrGray">Saldo kas tersedia</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
