'use client';
import { SkeletonOverviewCard } from '@/app/dashboard/(home)/_components/SkeletonOverviewCard';
import { Card, CardContent } from '@/components/ui/card';
import { handleParsePrice } from '@/lib/helpers/parsing';
import { queryGetCountEventsOptions, queryGetCountIsPublicEventsOptions, queryGetTotalBudgetEventsOptions } from '@/lib/queries/events';
import { useShow } from '@/lib/zustand/useShow';
import { useQuery } from '@tanstack/react-query';
import { Calendar, DollarSign } from 'lucide-react';

interface OverviewCardProps {
  fundAccountsIsActive: number;
}

export const OverviewCard = () => {
  const queryCount = useQuery(queryGetCountEventsOptions());
  const queryPublicCount = useQuery(queryGetCountIsPublicEventsOptions());
  const queryTotalBudget = useQuery(queryGetTotalBudgetEventsOptions());

  const isShow = useShow((state) => state.isShow);

  if (queryPublicCount.isLoading || queryCount.isLoading || queryTotalBudget.isLoading) return <SkeletonOverviewCard totalCard={3} />;
  if (queryPublicCount.isError || queryCount.isError || queryTotalBudget.isError) return <p>Error... {queryTotalBudget.error?.message}</p>;

  const totalBudget = handleParsePrice(queryTotalBudget.data) ?? 0;
  const totalEvent = queryCount.data ?? 0;
  const totalEventPublic = queryPublicCount.data ?? 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      <Card className="w-full">
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-gnrDark font-semibold">Total Events</h4>
            <Calendar className="size-4 text-gnrDark" />
          </div>
          <div className="t">
            <strong className="text-2xl text-gnrDark">{totalEvent}</strong>
            <span className="block text-xs text-gnrGray">Total event aktif</span>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-gnrDark font-semibold">Total Budget</h4>
            <DollarSign className="size-4 text-gnrDark" />
          </div>
          <div className="t">
            <strong className="text-2xl text-gnrDark">{isShow ? totalBudget : '........'}</strong>
            <span className="block text-xs text-gnrGray">Semua Event</span>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-gnrDark font-semibold">Event Publik</h4>
            <Calendar className="size-4 text-gnrDark" />
          </div>
          <div className="t">
            <strong className="text-2xl text-gnrDark">{totalEventPublic}</strong>
            <span className="block text-xs text-gnrGray">Dari {totalEvent} total event</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
