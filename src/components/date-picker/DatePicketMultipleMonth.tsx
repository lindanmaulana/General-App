'use client';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { handleParseDate } from '@/lib/helpers/parsing';
import { cn } from '@/lib/utils';
import { ChevronDownIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Calendar } from '../ui/calendar';

interface DatePickerMultipleMonthProps {
  title: string;
  date?: DateRange;
  onDateChange: (range: DateRange | undefined) => void;
}
export const DatePickerMultipleMonth = ({ title, date, onDateChange }: DatePickerMultipleMonthProps) => {
  const startDate = date?.from ? handleParseDate(date.from, 'YYYY-MM-DD') : undefined;
  const endDate = date?.to ? handleParseDate(date.to, 'YYYY-MM-DD') : undefined;
  
  return (
    <Popover>
      <PopoverTrigger className="dark:border-white/20 w-full" asChild>
        <Button variant={'outline'} className={cn('dark:text-gnrWhite min-w-[140px] justify-start text-left font-normal cursor-pointer', !date && 'text-muted-foreground')}>
          <ChevronDownIcon className="w-4 h-4" />
          {date ? `${startDate} - ${endDate}` : <span>{title}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full dark:bg-black dark:border-white/20">
        <Calendar mode="range" selected={date} numberOfMonths={2} onSelect={onDateChange} className="dark:text-gnrWhite w-full cursor-pointer" />
      </PopoverContent>
    </Popover>
  );
};
