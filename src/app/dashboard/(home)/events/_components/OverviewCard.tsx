'use client';
import { Card, CardContent } from '@/components/ui/card';
import { queryGetCountEventsOptions, queryGetCountIsPublicEventsOptions, queryGetTotalBudgetEventsOptions } from '@/lib/queries/events';
import { useShow } from '@/lib/zustand/useShow';
import { useQuery } from '@tanstack/react-query';
import { Calendar, DollarSign } from 'lucide-react';

interface OverviewCardProps {
  fundAccountsIsActive: number
}

export const OverviewCard = () => {
  const queryEventsCount = useQuery(queryGetCountEventsOptions())
  const queryEventsIsPublicCount = useQuery(queryGetCountIsPublicEventsOptions())
  const queryEventsTotalBudget = useQuery(queryGetTotalBudgetEventsOptions())

  const isShow = useShow((state) => state.isShow);
  
  if(queryEventsIsPublicCount.isLoading || queryEventsCount.isLoading || queryEventsTotalBudget.isLoading) return <p>Loading....</p>
  if(queryEventsIsPublicCount.isError || queryEventsCount.isError || queryEventsTotalBudget.isError) return <p>Error... {queryEventsTotalBudget.error?.message}</p>


  return (
    <div className="grid grid-cols-3 gap-3">
      <Card className="w-full">
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-gnrDark font-semibold">Total Events</h4>
            <Calendar className="size-4 text-gnrDark" />
          </div>
          <div className="t">
            <strong className="text-2xl text-gnrDark">{queryEventsCount.data}</strong>
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
            <strong className="text-2xl text-gnrDark">{isShow ? "64.000.000" : "........"}</strong>
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
            <strong className="text-2xl text-gnrDark">{queryEventsIsPublicCount.data}</strong>
            <span className="block text-xs text-gnrGray">Dari 2 total event</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
