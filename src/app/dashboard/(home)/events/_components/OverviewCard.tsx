'use client';
import { SkeletonOverviewCard } from '@/app/dashboard/(home)/_components/skeleton/SkeletonOverviewCard';
import { Card, CardContent } from '@/components/ui/card';
import { handleParsePrice } from '@/lib/helpers/parsing';
import { eventCountOptions } from '@/lib/queries/events/eventCountOptions';
import { eventPublicCountOptions } from '@/lib/queries/events/eventPublicCountOptions';
import { eventTotalBudgetOptions } from '@/lib/queries/events/eventTotalBudgetOptions';
import { useShow } from '@/lib/zustand/useShow';
import { useQueries } from '@tanstack/react-query';
import { Calendar, DollarSign } from 'lucide-react';

export const OverviewCard = () => {
  const isShow = useShow((state) => state.isShow);
  const {isLoading, isError, allCount, publicCount, totalBudget} = useQueries({
    queries: [eventCountOptions(), eventPublicCountOptions(), eventTotalBudgetOptions()],
    combine: (results) => {
      return {
        allCount: results[0].data,
        publicCount: results[1].data,
        totalBudget: results[2].data,
        isLoading: results.some(result => result.isLoading),
        isError: results.some(result => result.isError)
      }
    }
  })

  if (isLoading) return <SkeletonOverviewCard totalCard={3} />;
  if (isError) return <></>;

  const budget = handleParsePrice(totalBudget)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      <Card className="dark:bg-black dark:border-white/20 w-full">
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="dark:text-gnrWhite text-gnrDark font-semibold">Total Events</h4>
            <Calendar className="size-4 text-gnrDark" />
          </div>
          <div className="t">
            <strong className="dark:text-gnrWhite text-2xl text-gnrDark">{allCount}</strong>
            <span className="block text-xs text-gnrGray">Total event aktif</span>
          </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-black dark:border-white/20 w-full">
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="dark:text-gnrWhite text-gnrDark font-semibold">Total Budget</h4>
            <DollarSign className="size-4 text-gnrDark" />
          </div>
          <div className="t">
            <strong className="dark:text-gnrWhite text-2xl text-gnrDark">{isShow ? budget : '........'}</strong>
            <span className="block text-xs text-gnrGray">Semua Event</span>
          </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-black dark:border-white/20 w-full">
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="dark:text-gnrWhite text-gnrDark font-semibold">Event Publik</h4>
            <Calendar className="size-4 text-gnrDark" />
          </div>
          <div className="t">
            <strong className="dark:text-gnrWhite text-2xl text-gnrDark">{publicCount}</strong>
            <span className="block text-xs text-gnrGray">Dari {allCount} total event</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
