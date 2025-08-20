"use client"
import { DataTable } from "@/components/DataTable";
import { DatePickerMultiple } from "@/components/DatePicketMultiple";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { events } from "@/lib/models/events";
import { queryGetAllEventsOnlyOptions } from "@/lib/queries/events";
import { queryGetAllFundAccountsOnlyOptions, queryGetAllFundAccountsOptions } from "@/lib/queries/fund-accounts";
import { queryGetAllIncomesOptions } from "@/lib/queries/incomes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { useDebouncedCallback } from "use-debounce";
import { SkeletonTable } from "../../_components/SkeletonTable";
import { ErrorTable } from "../../fund-accounts/_components/ErrorTable";
import { useColumnsIncomes } from "./useColumnsIncomes";

export const TableIncomes = () => {
    const currentParams = useSearchParams()
    const columns = useColumnsIncomes()
    const router = useRouter()
    const pathname = usePathname()
    const queryClient = useQueryClient()

    const queryOption = useMemo(() => {
        return queryGetAllIncomesOptions(currentParams.toString())
    }, [currentParams])

    const queryIncomes = useQuery(queryOption)
    const querySelectEvents = useQuery(queryGetAllEventsOnlyOptions())
    const querySelectFundAccounts = useQuery(queryGetAllFundAccountsOnlyOptions())

    // GET DEFAULT QUERY from URL
    const defaultQueryKeyword = currentParams.get("keyword") ? currentParams.get("keyword")?.toString() : ""
    const defaultQueryEvent = currentParams.get("event") ? currentParams.get("event")?.toString() : "default"
    const defaultQueryAccount = currentParams.get("account") ? currentParams.get("account")?.toString() : "default"
    const defaultQuerySort = currentParams.get("sort") ? currentParams.get("sort")?.toString() : "default"
    const defaultQueryStartDate = currentParams.get("start-date") ? new Date(currentParams.get("start-date") ?? "") : undefined
    const defaultQueryEndDate = currentParams.get("end-date") ? new Date(currentParams.get("end-date") ?? "") : undefined

    const [date, setDate] = useState<DateRange | undefined>(defaultQueryStartDate && defaultQueryEndDate ? {from: defaultQueryStartDate, to: defaultQueryEndDate} : undefined)

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


        const handlePagination = (page: string) => {
        const url = new URLSearchParams(currentParams.toString())

        url.set("page", page)

        queryClient.prefetchQuery(queryGetAllFundAccountsOptions(url.toString()))
        router.replace(`${pathname}?${url.toString()}`)
    }

    const handleFilter = (filter: "event" | "account" | "sort" | "date", params: string, paramsRange?: DateRange) => {
        const url = new URLSearchParams(currentParams.toString())

        if(filter === "sort") {
            if(params !== "default") {
                url.set("sort", params)
                url.set("page", "1")
            } else {
                url.delete("sort")
            }
        }

        if(filter === "event") {
            if(params !== "default") {
                url.set("event", params)
                url.set("page", "1")
            } else {
                url.delete("event")
            }
        }

        if(filter === "account") {
            if(params !== "default") {
                url.set("account", params)
                url.set("page", "1")
            } else {
                url.delete("account")
            }
        }

        if(filter === "date") {
            if(paramsRange && paramsRange.from && paramsRange.to) {
                url.set("start-date", paramsRange.from.toISOString())
                url.set("end-date", paramsRange.to.toISOString())
                url.set("page", "1")
            } else {
                url.delete("start-date")
                url.delete("end-date")
            }
        }
        console.log({paramsRange})
        
        queryClient.prefetchQuery(queryGetAllIncomesOptions(url.toString()))
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

    if(queryIncomes.isLoading) return <SkeletonTable />

    if(queryIncomes.isError) return <ErrorTable />

    const data = queryIncomes.data
    const pagination = queryIncomes.data.pagination

    return (
        <Card>
            <CardHeader>
                <div className='flex flex-col gap-3'>
                    <div>
                        <CardTitle>Riwayat Pemasukan</CardTitle>
                        <CardDescription>Daftar semua transaksi pemasukan yang telah dicatat</CardDescription>
                    </div>
                    <div className='w-full flex flex-col md:flex-row items-center gap-3'>
                        <Label className='relative flex w-full'>
                            <Search className='absolute left-2 size-4 text-gnrGray' />
                            <Input id='filter-search' onChange={handleSearch} defaultValue={defaultQueryKeyword} placeholder='Cari nama...' type='text' className='w-full pl-8 font-normal' />
                        </Label>
                        
                        <DatePickerMultiple title="Periode Uang Masuk" date={date} onDateChange={(e) => {
                            setDate(e)
                            handleFilter("date", "", e)
                        }} />

                        <Select onValueChange={(value) => handleFilter("event", value)} defaultValue={defaultQueryEvent}>
                            <SelectTrigger className="w-1/2">
                                <SelectValue placeholder="Semua Jenis" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value='default'>Semua Event</SelectItem>
                                    {querySelectEvents.isLoading ? <SelectItem value="loading">Loading...</SelectItem> : querySelectEvents.isError ? <SelectItem value="error">Error...</SelectItem> : querySelectEvents.data.map((event: events) => (
                                        <SelectItem key={event.id} value={event.code}>{event.name}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Select onValueChange={(value) => handleFilter("account", value)} defaultValue={defaultQueryAccount}>
                            <SelectTrigger className="w-1/2">
                                <SelectValue placeholder="Semua Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value='default'>Semua Akun</SelectItem>
                                    {querySelectFundAccounts.isLoading ? <SelectItem value="loading">Loading...</SelectItem> : querySelectFundAccounts.isError ? <SelectItem value="error">Error...</SelectItem> : querySelectFundAccounts.data.map((event: events) => (
                                        <SelectItem key={event.id} value={event.name}>{event.name}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Select onValueChange={(value) => handleFilter("sort", value) } defaultValue={defaultQuerySort}>
                            <SelectTrigger>
                                <SelectValue placeholder="Urutkan Jumlah" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="default">Default</SelectItem>
                                    <SelectItem value="dsc">Tertinggi</SelectItem>
                                    <SelectItem value="asc">Terendah</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <DataTable title="Daftar Akun" description="Semua akun keuangan yang dikelola dalam sistem" columns={columns} data={queryIncomes.data.data} />
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