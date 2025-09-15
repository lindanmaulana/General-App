"use client";

import { events } from "@/app/api/_lib/models/events";
import { DatePickerMultiple } from "@/components/date-picker/DatePicketMultiple";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { queryGetAllEventsOnlyOptions } from "@/lib/queries/events";
import { queryGetAllFundAccountsOnlyOptions } from "@/lib/queries/fund-accounts";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useActionFinancialToolbar } from "../../../_hooks/useActionFinancialToolbar";
import { useGetQueryParams } from "../../../_hooks/useGetQueryParams";

export const ExpensesToolbar = () => {
    const querySelectEvents = useQuery(queryGetAllEventsOnlyOptions());
    const querySelectFundAccounts = useQuery(queryGetAllFundAccountsOnlyOptions());

    // GET DEFAULT QUERY from URL
    const {
        defaultQueryKeyword,
        defaultQueryEvent,
        defaultQueryAccount,
        defaultQuerySort,
        defaultQueryStartDate,
        defaultQueryEndDate,
    } = useGetQueryParams();

    const [date, setDate] = useState<DateRange | undefined>(
        defaultQueryStartDate && defaultQueryEndDate
            ? { from: defaultQueryStartDate, to: defaultQueryEndDate }
            : undefined
    );

    const { handleDebounceDate, handleFilter, handleSearch } = useActionFinancialToolbar();

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
            <Label className="relative flex w-full md:col-span-2">
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
                title="Periode"
                date={date}
                onDateChange={(e) => {
                    setDate(e);
                    handleDebounceDate(e);
                }}
            />

            <Select onValueChange={(value) => handleFilter("event", value)} defaultValue={defaultQueryEvent}>
                <SelectTrigger className="dark:text-gnrWhite dark:border-white/20 w-full">
                    <SelectValue placeholder="Semua Jenis" />
                </SelectTrigger>
                <SelectContent className="dark:bg-black dark:text-gnrWhite dark:border-white/20">
                    <SelectGroup>
                        <SelectItem value="default" className="dark:text-gnrWhite">
                            Semua Event
                        </SelectItem>
                        {querySelectEvents.isLoading ? (
                            <SelectItem value="loading">Loading...</SelectItem>
                        ) : querySelectEvents.isError ? (
                            <SelectItem value="error">Error...</SelectItem>
                        ) : (
                            querySelectEvents.data &&
                            querySelectEvents.data.map((event: events) => (
                                <SelectItem key={event.id} value={event.code} className="dark:text-gnrWhite">
                                    {event.name}
                                </SelectItem>
                            ))
                        )}
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select onValueChange={(value) => handleFilter("account", value)} defaultValue={defaultQueryAccount}>
                <SelectTrigger className="dark:text-gnrWhite dark:border-white/20 w-full">
                    <SelectValue placeholder="Semua Status" />
                </SelectTrigger>
                <SelectContent className="dark:bg-black dark:text-gnrWhite dark:border-white/20">
                    <SelectGroup>
                        <SelectItem value="default" className="dark:text-gnrWhite">
                            Semua Akun
                        </SelectItem>
                        {querySelectFundAccounts.isLoading ? (
                            <SelectItem value="loading">Loading...</SelectItem>
                        ) : querySelectFundAccounts.isError ? (
                            <SelectItem value="error">Error...</SelectItem>
                        ) : (
                            querySelectFundAccounts.data &&
                            querySelectFundAccounts.data.map((event: events) => (
                                <SelectItem key={event.id} value={event.name} className="dark:text-gnrWhite">
                                    {event.name}
                                </SelectItem>
                            ))
                        )}
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select onValueChange={(value) => handleFilter("sort", value)} defaultValue={defaultQuerySort}>
                <SelectTrigger className="dark:text-gnrWhite dark:border-white/20 w-full">
                    <SelectValue placeholder="Urutkan Jumlah" />
                </SelectTrigger>
                <SelectContent className="dark:bg-black dark:text-gnrWhite dark:border-white/20">
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
