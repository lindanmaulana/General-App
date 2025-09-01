'use client';

import { DatePickerMultiple } from '@/components/DatePicketMultiple';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { events } from '@/app/api/_lib/models/events';
import { queryGetAllEventsOnlyOptions } from '@/lib/queries/events';
import { queryGetAllExpensesOptions } from '@/lib/queries/expenses';
import { queryGetAllFundAccountsOnlyOptions } from '@/lib/queries/fund-accounts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useDebouncedCallback } from 'use-debounce';

export const ExpensesToolbar = () => {
  const currentParams = useSearchParams();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const router = useRouter();

  const querySelectEvents = useQuery(queryGetAllEventsOnlyOptions());
  const querySelectFundAccounts = useQuery(queryGetAllFundAccountsOnlyOptions());

  // GET DEFAULT QUERY from URL
  const defaultQueryKeyword = currentParams.get('keyword') ? currentParams.get('keyword')?.toString() : '';
  const defaultQueryEvent = currentParams.get('event') ? currentParams.get('event')?.toString() : 'default';
  const defaultQueryAccount = currentParams.get('account') ? currentParams.get('account')?.toString() : 'default';
  const defaultQuerySort = currentParams.get('sort') ? currentParams.get('sort')?.toString() : 'default';
  const defaultQueryStartDate = currentParams.get('start-date') ? new Date(currentParams.get('start-date') ?? '') : undefined;
  const defaultQueryEndDate = currentParams.get('end-date') ? new Date(currentParams.get('end-date') ?? '') : undefined;

  const [date, setDate] = useState<DateRange | undefined>(defaultQueryStartDate && defaultQueryEndDate ? { from: defaultQueryStartDate, to: defaultQueryEndDate } : undefined);

  const handleDebounceSearch = useDebouncedCallback((params: string) => {
    const url = new URLSearchParams(currentParams.toString());

    switch (params) {
      case '':
        url.delete('keyword');
        break;
      default:
        url.set('keyword', params);
        url.set('page', '1');
        break;
    }

    queryClient.prefetchQuery(queryGetAllExpensesOptions(url.toString()));
    router.replace(`${pathname}?${url.toString()}`);
  }, 1000);

  const handleDebounceDate = useDebouncedCallback((paramsRange?: DateRange) => {
    const url = new URLSearchParams(currentParams.toString());

    if (paramsRange && paramsRange.from && paramsRange.to) {
      url.set('start-date', paramsRange.from.toISOString());
      url.set('end-date', paramsRange.to.toISOString());
      url.set('page', '1');
    } else {
      url.delete('start-date');
      url.delete('end-date');
    }

    queryClient.prefetchQuery(queryGetAllExpensesOptions(url.toString()));
    router.replace(`${pathname}?${url.toString()}`);
  }, 1200);

  const handleFilter = (filter: 'event' | 'account' | 'sort', params: string) => {
    const url = new URLSearchParams(currentParams.toString());

    if (filter === 'sort') {
      if (params !== 'default') {
        url.set('sort', params);
        url.set('page', '1');
      } else {
        url.delete('sort');
      }
    }

    if (filter === 'event') {
      if (params !== 'default') {
        url.set('event', params);
        url.set('page', '1');
      } else {
        url.delete('event');
      }
    }

    if (filter === 'account') {
      if (params !== 'default') {
        url.set('account', params);
        url.set('page', '1');
      } else {
        url.delete('account');
      }
    }

    queryClient.prefetchQuery(queryGetAllExpensesOptions(url.toString()));
    router.replace(`${pathname}?${url.toString()}`);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    handleDebounceSearch(value);
  };

  return (
    <div className="w-full flex flex-col md:flex-row items-center gap-3">
      <Label className="relative flex w-full">
        <Search className="absolute left-2 size-4 text-gnrGray" />
        <Input
          id="filter-search"
          onChange={handleSearch}
          defaultValue={defaultQueryKeyword}
          placeholder="Cari sumber pendapatan..."
          type="text"
          className="dark:border-white/20 dark:text-gnrWhite w-full pl-8 font-normal"
        />
      </Label>

      <DatePickerMultiple
        title="Periode Uang Masuk"
        date={date}
        onDateChange={(e) => {
          setDate(e);
          handleDebounceDate(e);
        }}
      />

      <Select onValueChange={(value) => handleFilter('event', value)} defaultValue={defaultQueryEvent}>
        <SelectTrigger className="dark:text-gnrWhite dark:border-white/20 w-full md:w-1/2">
          <SelectValue placeholder="Semua Jenis" />
        </SelectTrigger>
        <SelectContent className='dark:bg-black dark:text-gnrWhite dark:border-white/20'>
          <SelectGroup>
            <SelectItem value="default" className='dark:text-gnrWhite'>Semua Event</SelectItem>
            {querySelectEvents.isLoading ? (
              <SelectItem value="loading">Loading...</SelectItem>
            ) : querySelectEvents.isError ? (
              <SelectItem value="error">Error...</SelectItem>
            ) : (
              querySelectEvents.data &&
              querySelectEvents.data.map((event: events) => (
                <SelectItem key={event.id} value={event.code} className='dark:text-gnrWhite'>
                  {event.name}
                </SelectItem>
              ))
            )}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleFilter('account', value)} defaultValue={defaultQueryAccount}>
        <SelectTrigger className="dark:text-gnrWhite dark:border-white/20 w-full md:w-1/2">
          <SelectValue placeholder="Semua Status" />
        </SelectTrigger>
        <SelectContent className='dark:bg-black dark:text-gnrWhite dark:border-white/20'>
          <SelectGroup>
            <SelectItem value="default" className='dark:text-gnrWhite'>Semua Akun</SelectItem>
            {querySelectFundAccounts.isLoading ? (
              <SelectItem value="loading">Loading...</SelectItem>
            ) : querySelectFundAccounts.isError ? (
              <SelectItem value="error">Error...</SelectItem>
            ) : (
              querySelectFundAccounts.data &&
              querySelectFundAccounts.data.map((event: events) => (
                <SelectItem key={event.id} value={event.name} className='dark:text-gnrWhite'>
                  {event.name}
                </SelectItem>
              ))
            )}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleFilter('sort', value)} defaultValue={defaultQuerySort}>
        <SelectTrigger className="dark:text-gnrWhite dark:border-white/20 w-full md:w-1/2">
          <SelectValue placeholder="Urutkan Jumlah" />
        </SelectTrigger>
        <SelectContent className='dark:bg-black dark:text-gnrWhite dark:border-white/20'>
          <SelectGroup>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="dsc">Tertinggi</SelectItem>
            <SelectItem value="asc">Terendah</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
