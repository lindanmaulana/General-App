'use client';

import { Card, CardContent } from '@/components/ui/card';
import { handleParsePrice } from '@/lib/helpers/parsing';
import { expenseTotalAmountThisMonthOptions } from '@/lib/queries/expenses/expenseTotalAmountThisMonthOptions';
import { useQuery } from '@tanstack/react-query';
import { TrendingUp } from 'lucide-react';
import { SkeletonOverviewCardPrice } from '../../_components/skeleton/SkeletonOverviewCardPrice';

export const OverviewExpensesAmount = () => {
  const {data, isLoading, isError} = useQuery(expenseTotalAmountThisMonthOptions());

  if (isLoading) return <SkeletonOverviewCardPrice />;
  if (isError) return <></>;

  const totalAmount = handleParsePrice(data);

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
