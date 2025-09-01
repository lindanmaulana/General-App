'use client';

import { DataTable } from '@/components/DataTable';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { queryGetAllEventsOptions } from '@/lib/queries/events';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { SkeletonTable } from '../../../_components/skeleton/SkeletonTable';
import { ErrorTable } from '../../../_components/error/ErrorTable';
import { useColumnsEvents } from '../../_hooks/useColumnsEvents';

export const EventsTable = () => {
  const currentParams = useSearchParams();
  const columns = useColumnsEvents();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const queryOption = useMemo(() => {
    return queryGetAllEventsOptions(currentParams.toString());
  }, [currentParams]);

  const queryEvents = useQuery(queryOption);

  const handlePagination = (page: string) => {
    const url = new URLSearchParams(currentParams.toString());

    url.set('page', page);

    queryClient.prefetchQuery(queryGetAllEventsOptions(url.toString()));
    router.replace(`${pathname}?${url.toString()}`);
  };

  const handleLimit = (limit: string) => {
    const url = new URLSearchParams(currentParams.toString());

    url.set('limit', limit);
    url.set('page', '1');

    queryClient.prefetchQuery(queryGetAllEventsOptions(url.toString()));
    router.replace(`${pathname}?${url.toString()}`);
  };

  if (queryEvents.isLoading) return <SkeletonTable />;

  if (queryEvents.isError) return <ErrorTable />;

  const data = queryEvents.data;
  const pagination = queryEvents.data.pagination;
  return (
    <>
      <CardContent>
        <DataTable columns={columns} data={data.data} />
      </CardContent>
      <CardFooter>
        <div className="w-full flex items-center justify-between">
          <Label className="w-full text-gnrGray font-normal">
            <span className="hidden md:block">
              Menampilkan 1 - {pagination.limit} dari {data.count}
            </span>
            <Select onValueChange={(value) => handleLimit(value)} defaultValue={pagination.limit < 5 ? '5' : pagination.limit.toString()}>
              <SelectTrigger className='dark:border-white/20 dark:bg-black dark:text-gnrWhite'>
                <SelectValue placeholder="5" />
              </SelectTrigger>
              <SelectContent className='dark:bg-black dark:text-gnrWhite dark:border-white/20'>
                <SelectGroup>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <span className="hidden md:block">per halaman</span>
          </Label>

          <Pagination className="w-full text-gnrGray font-normal ">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => handlePagination(pagination.prevPage)} className={`${!pagination.prevPage ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''}`}>
                  Prev
                </PaginationPrevious>
              </PaginationItem>
              {pagination.links.map((page: number) => {
                const isActive: boolean = page === pagination.currentPage;
                return (
                  <PaginationItem key={page}>
                    <PaginationLink onClick={() => handlePagination(page.toString())} isActive={isActive} className={`${isActive ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''} dark:text-gnrWhite`}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext onClick={() => handlePagination(pagination.nextPage)} className={`${!pagination.nextPage ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''}`}>
                  Next
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardFooter>
    </>
  );
};
