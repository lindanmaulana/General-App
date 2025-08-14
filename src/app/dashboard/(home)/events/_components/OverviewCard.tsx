'use client';
import { Card, CardContent } from '@/components/ui/card';
import { useShow } from '@/lib/zustand/useShow';
import { Calendar, DollarSign } from 'lucide-react';

interface OverviewCardProps {
  fundAccountsIsActive: number
}

export const OverviewCard = () => {
  const isShow = useShow((state) => state.isShow);
  return (
    <div className="grid grid-cols-3 gap-3">
      <Card className="w-full">
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-gnrDark font-semibold">Total Events</h4>
            <Calendar className="size-4 text-gnrDark" />
          </div>
          <div className="t">
            <strong className="text-2xl text-gnrDark">2</strong>
            <span className="block text-xs text-gnrGray">1 event aktif</span>
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
            <strong className="text-2xl text-gnrDark">1</strong>
            <span className="block text-xs text-gnrGray">Dari 2 total event</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
