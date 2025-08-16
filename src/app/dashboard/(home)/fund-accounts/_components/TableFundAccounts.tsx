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
import { ChangeEvent, useMemo } from "react";
import { useDebouncedCallback } from "use-debounce";
import { ErrorTable } from "./ErrorTable";
import { SkeletonTableFundAccounts } from "./SkeletonTableFundAccounts";
import { useColumnsFundAccounts } from "./useColumnsFundAccounts";

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

    const handleDebounceSearch = useDebouncedCallback((params: string) => {
        const url = new URLSearchParams(currentParams.toString())

        switch(params) {
            case "":
                url.delete("keyword")
            break
            default:
                url.set("keyword", params)
                url.set("page", '1')
            break
        }

        queryClient.prefetchQuery(queryGetAllFundAccountsOptions(url.toString()))
        router.replace(`${pathname}?${url.toString()}`)
    }, 1000)

    if(queryFundAccounts.isLoading) return <SkeletonTableFundAccounts />

    if(queryFundAccounts.isError) return <ErrorTable />

    const data = queryFundAccounts.data
    const pagination = queryFundAccounts.data.pagination

    const handlePagination = (page: string) => {
        const url = new URLSearchParams(currentParams.toString())

        url.set("page", page)

        queryClient.prefetchQuery(queryGetAllFundAccountsOptions(url.toString()))
        router.replace(`${pathname}?${url.toString()}`)
    }

    const handleFilter = (filter: "type" | "status", params: string) => {
        const url = new URLSearchParams(currentParams.toString())

        if(filter === "type") {
            if(params !== "default") {
                url.set("type", params)
                url.set("page", "1")
            } else {
                url.delete("type")
            }
        }

        if(filter === "status") {
             if(params !== "default") {
                url.set("status", params)
                url.set("page", "1")
            } else {
                url.delete("status")
            }
        }

        queryClient.prefetchQuery(queryGetAllFundAccountsOptions(url.toString()))
        router.replace(`${pathname}?${url.toString()}`)
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        handleDebounceSearch(value)
    }

    const handleLimit = (limit: string) => {
        const url = new URLSearchParams(currentParams.toString())

        url.set("limit", limit)
        url.set("page", "1")

        queryClient.prefetchQuery(queryGetAllFundAccountsOptions(url.toString()))
        router.replace(`${pathname}?${url.toString()}`)
    }

    return (
        <Card>
            <CardHeader>
                <div className='flex flex-col md:flex-row items-center justify-between gap-3'>
                    <div>
                        <CardTitle>Daftar Akun</CardTitle>
                        <CardDescription>Semua akun keuangan yang dikelola dalam sistem</CardDescription>
                    </div>
                    <div className='w-full md:w-fit flex flex-col md:flex-row items-center gap-3'>
                        <Label className='relative w-full'>
                            <Search className='absolute left-2 size-4 text-gnrGray' />
                            <Input id='filter-search' onChange={handleSearch} defaultValue={currentParams.get("keyword") ? currentParams.get("keyword")?.toString() : ""} placeholder='Cari akun...' type='text' className='pl-8 font-normal' />
                        </Label>
                        <Select onValueChange={(value) => handleFilter("type", value)} defaultValue={currentParams.get("type") ? currentParams.get("type")?.toString() : "default"}>
                            <SelectTrigger className="w-full">
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

                        <Select onValueChange={(value) => handleFilter("status", value)} defaultValue={currentParams.get("status") ? currentParams.get("status")?.toString() : "default"}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Semua Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value='default'>Semua Status</SelectItem>
                                    <SelectItem value='aktif'>Aktif</SelectItem>
                                    <SelectItem value='nonaktif'>NonAktif</SelectItem>
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
                        <span className="hidden md:block">Menampilkan 1 - {pagination.limit} dari {data.count}</span>
                        <Select onValueChange={(value) => handleLimit(value)} defaultValue={pagination.limit < 5 ? "5" : pagination.limit.toString()}>
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
                        <span className="hidden md:block">per halaman</span>
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