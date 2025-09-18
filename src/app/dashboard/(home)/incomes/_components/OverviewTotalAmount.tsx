'use client';

import { Card, CardContent } from '@/components/ui/card';
import { handleParsePrice } from '@/lib/helpers/parsing';
import { incomeTotalAmountThisMonthOptions } from '@/lib/queries/incomes/incomeTotalAmountThisMonthOptions';
import { useQuery } from '@tanstack/react-query';
import { TrendingUp } from 'lucide-react';
import { SkeletonOverviewCardPrice } from '../../_components/skeleton/SkeletonOverviewCardPrice';

export const OverviewTotalAmount = () => {
  const {data, isLoading, isError} = useQuery(incomeTotalAmountThisMonthOptions());

  if (isLoading) return <SkeletonOverviewCardPrice />;
  if (isError) return <></>;

  const totalAmount = handleParsePrice(data);

  return (
    <Card className="w-full bg-gnrGreen/10 border border-gnrGreen/30">
      <CardContent className="flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="text-gnrGreen font-semibold">Total Pemasukan Bulan Ini</h4>
          <strong className="text-2xl text-gnrGreen">{totalAmount}</strong>
        </div>
        <div className="self-start">
          <TrendingUp className="size-5 text-gnrGreen" />
        </div>
      </CardContent>
    </Card>
  );
};
