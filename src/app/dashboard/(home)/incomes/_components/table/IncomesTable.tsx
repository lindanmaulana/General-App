'use client';

import { DataTable } from '@/components/DataTable';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { queryGetAllFundAccountsOptions } from '@/lib/queries/fund-accounts';
import { queryGetAllIncomesOptions } from '@/lib/queries/incomes';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { SkeletonTable } from '../../../_components/skeleton/SkeletonTable';
import { ErrorTable } from '../../../_components/error/ErrorTable';
import { useColumnsIncomes } from '../../_hooks/useColumnsIncomes';

export const IncomesTable = () => {
  const currentParams = useSearchParams();
  const columns = useColumnsIncomes();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const queryOption = useMemo(() => {
    return queryGetAllIncomesOptions(currentParams.toString());
  }, [currentParams]);

  const queryIncomes = useQuery(queryOption);

  const handlePagination = (page: string) => {
    const url = new URLSearchParams(currentParams.toString());

    url.set('page', page);

    queryClient.prefetchQuery(queryGetAllFundAccountsOptions(url.toString()));
    router.replace(`${pathname}?${url.toString()}`);
  };

  const handleLimit = (limit: string) => {
    const url = new URLSearchParams(currentParams.toString());

    url.set('limit', limit);
    url.set('page', '1');

    queryClient.prefetchQuery(queryGetAllFundAccountsOptions(url.toString()));
    router.replace(`${pathname}?${url.toString()}`);
  };

  if (queryIncomes.isLoading) return <SkeletonTable />;

  if (queryIncomes.isError) return <ErrorTable />;

  const data = queryIncomes.data;
  const pagination = queryIncomes.data.pagination;
  return (
    <>
      <CardContent>
        <DataTable title="Daftar Akun" description="Semua akun keuangan yang dikelola dalam sistem" columns={columns} data={queryIncomes.data.data} />
      </CardContent>
      <CardFooter>
        <div className="w-full flex items-center justify-between">
          <Label className="w-full text-gnrGray font-normal">
            <span className="hidden md:block">
              Menampilkan 1 - {pagination.limit} dari {data.count}
            </span>
            <Select onValueChange={(value) => handleLimit(value)} defaultValue={pagination.limit < 5 ? '5' : pagination.limit.toString()}>
              <SelectTrigger>
                <SelectValue placeholder="5" />
              </SelectTrigger>
              <SelectContent>
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
                    <PaginationLink onClick={() => handlePagination(page.toString())} isActive={isActive} className={`${isActive ? 'pointer-events-none opacity-50 cursor-not-allowed' : ''}`}>
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
