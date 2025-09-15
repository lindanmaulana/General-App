'use client';
import { DataTable } from '@/components/DataTable';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fundAccountListOptions } from '@/lib/queries/fund-accounts/fundAccountListOptions';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { ErrorTable } from '../../../_components/error/ErrorTable';
import { SkeletonTable } from '../../../_components/skeleton/SkeletonTable';
import { useActionTable } from '../../_hooks/useActionTable';
import { useColumnsFundAccounts } from '../../_hooks/useColumnsFundAccounts';

export const FundAccountsTable = () => {
  const currentParams = useSearchParams();
  const columns = useColumnsFundAccounts();
  const {handlePagination, handleLimit} = useActionTable()

  const queryOption = useMemo(() => {
    return fundAccountListOptions(currentParams.toString());
  }, [currentParams]);

  const {data, isLoading, isError} = useQuery(queryOption);

  if (isLoading) return <SkeletonTable />;

  if (isError) return <ErrorTable />;

  return (
    <>
      <CardContent>
        <DataTable columns={columns} data={data.data} />
      </CardContent>
      <CardFooter>
        <div className="w-full flex items-center justify-between">
          <Label className="w-full text-gnrGray font-normal">
            <span className="hidden md:block">
              Menampilkan 1 - {data.pagination.limit} dari {data.count}
            </span>
            <Select onValueChange={(value) => handleLimit(value)} defaultValue={data.pagination.limit < 5 ? '5' : data.pagination.limit.toString()}>
              <SelectTrigger className='dark:text-gnrWhite dark:border-white/20'>
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
                <PaginationPrevious onClick={() => handlePagination(data.pagination.prevPage)} className={`${!data.pagination.prevPage ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''}`}>
                  Prev
                </PaginationPrevious>
              </PaginationItem>
              {data.pagination.links.map((page: number) => {
                const isActive: boolean = page === data.pagination.currentPage;
                return (
                  <PaginationItem key={page}>
                    <PaginationLink onClick={() => handlePagination(page.toString())} isActive={isActive} className={`${isActive ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''} dark:text-gnrWhite dark:border-white/20`}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext onClick={() => handlePagination(data.pagination.nextPage)} className={`${!data.pagination.nextPage ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''}`}>
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
