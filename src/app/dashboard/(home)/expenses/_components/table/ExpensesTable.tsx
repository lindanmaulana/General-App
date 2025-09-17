'use client';

import { DataTable } from '@/components/DataTable';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { expenseListOptions } from '@/lib/queries/expenses/expenseListOptions';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { ErrorTable } from '../../../_components/error/ErrorTable';
import { SkeletonTable } from '../../../_components/skeleton/SkeletonTable';
import { useActionTable } from '../../_hooks/useActionTable';
import { useColumnsExpenses } from '../../_hooks/useColumnsExpenses';

export const ExpensesTable = () => {
  const currentParams = useSearchParams();
  const columns = useColumnsExpenses();
  const {handlePagination, handleLimit} = useActionTable()

  const queryOption = useMemo(() => {
    return expenseListOptions(currentParams.toString());
  }, [currentParams]);

  const {data, isLoading, isError} = useQuery(queryOption);

  if (isLoading) return <SkeletonTable />;

  if (isError) return <ErrorTable />;

  const pagination = data.pagination;
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
              <SelectTrigger className='dark:border-white/20 dark:text-gnrWhite cursor-pointer'>
                <SelectValue placeholder="5" />
              </SelectTrigger>
              <SelectContent className='dark:bg-black dark:border-white/20'>
                <SelectGroup>
                  <SelectItem value="5" className='dark:text-gnrWhite'>5</SelectItem>
                  <SelectItem value="10" className='dark:text-gnrWhite'>10</SelectItem>
                  <SelectItem value="15" className='dark:text-gnrWhite'>15</SelectItem>
                  <SelectItem value="20" className='dark:text-gnrWhite'>20</SelectItem>
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
