"use client";
import { queryGetAllIncomesOptions } from "@/lib/queries/incomes";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback } from "react";
import { DateRange } from "react-day-picker";
import { useDebouncedCallback } from "use-debounce";

export const useActionToolbar = () => {
    const currentParams = useSearchParams();
    const pathname = usePathname();
    const queryClient = useQueryClient();
    const router = useRouter();

    const handleDebounceSearch = useDebouncedCallback((params: string) => {
        const url = new URLSearchParams(currentParams.toString());

        switch (params) {
            case "":
                url.delete("keyword");
                break;
            default:
                url.set("keyword", params);
                url.set("page", "1");
                break;
        }

        queryClient.prefetchQuery(queryGetAllIncomesOptions(url.toString()));
        router.replace(`${pathname}?${url.toString()}`);
    }, 1000);

    const handleDebounceDate = useDebouncedCallback((paramsRange?: DateRange) => {
        const url = new URLSearchParams(currentParams.toString());

        if (paramsRange && paramsRange.from && paramsRange.to) {
            url.set("start-date", paramsRange.from.toISOString());
            url.set("end-date", paramsRange.to.toISOString());
            url.set("page", "1");
        } else {
            url.delete("start-date");
            url.delete("end-date");
        }

        queryClient.prefetchQuery(queryGetAllIncomesOptions(url.toString()));
        router.replace(`${pathname}?${url.toString()}`);
    }, 1200);

    const handleFilter = useCallback(
        (filter: "event" | "account" | "sort", params: string) => {
            const url = new URLSearchParams(currentParams.toString());

            if (filter === "sort") {
                if (params !== "default") {
                    url.set("sort", params);
                    url.set("page", "1");
                } else {
                    url.delete("sort");
                }
            }

            if (filter === "event") {
                if (params !== "default") {
                    url.set("event", params);
                    url.set("page", "1");
                } else {
                    url.delete("event");
                }
            }

            if (filter === "account") {
                if (params !== "default") {
                    url.set("account", params);
                    url.set("page", "1");
                } else {
                    url.delete("account");
                }
            }

            queryClient.prefetchQuery(queryGetAllIncomesOptions(url.toString()));
            router.replace(`${pathname}?${url.toString()}`);
        },
        [currentParams, pathname, queryClient, router]
    );

    const handleSearch = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;

            handleDebounceSearch(value);
        },
        [handleDebounceSearch]
    );

    return { handleSearch, handleDebounceDate, handleFilter };
};
