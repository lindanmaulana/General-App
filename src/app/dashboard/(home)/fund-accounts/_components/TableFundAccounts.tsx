"use client"
import { DataTable } from "@/components/DataTable";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { queryGetAllFundAccountsOptions } from "@/lib/queries/fund-accounts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useColumnsFundAccounts } from "./useColumnsFundAccounts";
import { useMemo } from "react";

export const TableFundAccounts = () => {
    const currentParams = useSearchParams()
    const columns = useColumnsFundAccounts()
    const router = useRouter()
    const pathname = usePathname()
    const queryClient = useQueryClient()
    
    const queryOption = useMemo(() => {
        return queryGetAllFundAccountsOptions(currentParams.toString())
    }, [currentParams])

    const queryFundAccounts = useQuery(queryOption)

    if(queryFundAccounts.isLoading) return <p>Loading Please wait...</p>

    const data = queryFundAccounts.data
    const pagination = queryFundAccounts.data.pagination

    const handlePagination = (page: string) => {
        const url = new URLSearchParams(currentParams.toString())

        url.set("page", page)

        queryClient.prefetchQuery(queryGetAllFundAccountsOptions(url.toString()))
        router.replace(`${pathname}?${url.toString()}`)
    }

    return (
        <Card>
            <CardHeader>
                <div className='flex items-center justify-between'>
                    <div>
                        <CardTitle>Daftar Akun</CardTitle>
                        <CardDescription>Semua akun keuangan yang dikelola dalam sistem</CardDescription>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Label className='relative'>
                            <Search className='absolute left-2 size-4 text-gnrGray' />
                            <Input id='filter-search' placeholder='Cari akun...' type='text' className='pl-8 font-normal' />
                        </Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Semua Jenis" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value='default'>Semua Jenis</SelectItem>
                                    <SelectItem value='Bank'>Bank</SelectItem>
                                    <SelectItem value='Cash'>Cash</SelectItem>
                                    <SelectItem value='Ewallet'>Ewallet</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Semua Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value='default'>Semua Status</SelectItem>
                                    <SelectItem value='Aktif'>Aktif</SelectItem>
                                    <SelectItem value='NonAktif'>NonAktif</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <DataTable title="Daftar Akun" description="Semua akun keuangan yang dikelola dalam sistem" columns={columns} data={queryFundAccounts.data.data} />
            </CardContent>
            <CardFooter>
                <div className='w-full flex items-center justify-between'>
                    <Label className='w-full text-gnrGray font-normal'>
                        <span>Menampilkan 1 - {pagination.limit} dari {data.count}</span>
                        <Select defaultValue={pagination.limit < 5 ? "5" : pagination.limit.toString()}>
                            <SelectTrigger>
                                <SelectValue placeholder="5" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value='5'>5</SelectItem>
                                    <SelectItem value='10'>10</SelectItem>
                                    <SelectItem value='15'>15</SelectItem>
                                    <SelectItem value='20'>20</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <span>per halaman</span>
                    </Label>

                    <Pagination className='w-full text-gnrGray font-normal '>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious onClick={() => handlePagination(pagination.prevPage)} className={`${!pagination.prevPage ? "pointer-events-none opacity-50 cursor-not-allowed" : ""}`}>Prev</PaginationPrevious>
                            </PaginationItem>
                            {pagination.links.map((page: number) => {
                                const isActive: boolean = page === pagination.currentPage
                                return (
                                <PaginationItem key={page}>
                                    <PaginationLink onClick={() => handlePagination(page.toString())} isActive={isActive} className={`${isActive ? "pointer-events-none opacity-50 cursor-not-allowed" : ""}`}>{page}</PaginationLink>
                                </PaginationItem>
                            )})}
                            <PaginationItem>
                                <PaginationNext onClick={() => handlePagination(pagination.nextPage)} className={`${!pagination.nextPage ? "pointer-events-none opacity-50 cursor-not-allowed" : ""}`}>Next</PaginationNext>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </CardFooter>
        </Card>
    )
}