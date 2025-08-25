'use client';

import { Card, CardContent } from '@/components/ui/card';
import { handleParsePrice } from '@/lib/helpers/parsing';
import { queryGetTotalAmountThisMonthExpensesOptions } from '@/lib/queries/expenses';
import { useQuery } from '@tanstack/react-query';
import { TrendingUp } from 'lucide-react';
import { SkeletonOverviewCardPrice } from '../../_components/skeleton/SkeletonOverviewCardPrice';

export const OverviewExpensesAmount = () => {
  const queryTotalAmount = useQuery(queryGetTotalAmountThisMonthExpensesOptions());

  if (queryTotalAmount.isLoading) return <SkeletonOverviewCardPrice />;
  if (queryTotalAmount.isError) return <></>;

  const totalAmount = handleParsePrice(queryTotalAmount.data);

  return (
    <Card className="w-full bg-gnrRed/10 border border-gnrRed/30">
      <CardContent className="flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="text-gnrRed font-semibold">Total Pengeluaran Bulan Ini</h4>
          <strong className="text-2xl text-gnrRed">{totalAmount}</strong>
        </div>
        <div className="self-start">
          <TrendingUp className="size-5 text-gnrRed" />
        </div>
      </CardContent>
    </Card>
  );
};
