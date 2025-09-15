"use client";

import { events } from "@/app/api/_lib/models/events";
import { useGetQueryParams } from "@/app/dashboard/(home)/_hooks/useGetQueryParams";
import { DatePickerMultiple } from "@/components/date-picker/DatePicketMultiple";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { queryGetAllEventsOnlyOptions } from "@/lib/queries/events";
import { queryGetAllFundAccountsOnlyOptions } from "@/lib/queries/fund-accounts";
import { useQueries } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useActionFinancialToolbar } from "../../../_hooks/useActionFinancialToolbar";

export const IncomesToolbar = () => {
    const queries = useQueries({
        queries: [queryGetAllEventsOnlyOptions(), queryGetAllFundAccountsOnlyOptions()],
    });

    const isLoading = queries.some((query) => query.isLoading);
    const isError = queries.some((query) => query.isError);

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

    const { handleSearch, handleDebounceDate, handleFilter } = useActionFinancialToolbar();

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2  lg:grid-cols-6 gap-3">
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
                        {isLoading ? (
                            <SelectItem value="loading">Loading...</SelectItem>
                        ) : isError ? (
                            <SelectItem value="error">Error...</SelectItem>
                        ) : (
                            queries[0].data &&
                            queries[0].data.map((event: events) => (
                                <SelectItem key={event.id} value={event.code}>
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
                        {isLoading ? (
                            <SelectItem value="loading">Loading...</SelectItem>
                        ) : isError ? (
                            <SelectItem value="error">Error...</SelectItem>
                        ) : (
                            queries[1].data &&
                            queries[1].data.map((event: events) => (
                                <SelectItem key={event.id} value={event.name}>
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
                        <SelectItem value="default" className="dark:text-gnrWhite">
                            Default
                        </SelectItem>
                        <SelectItem value="dsc" className="dark:text-gnrWhite">
                            Tertinggi
                        </SelectItem>
                        <SelectItem value="asc" className="dark:text-gnrWhite">
                            Terendah
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};
