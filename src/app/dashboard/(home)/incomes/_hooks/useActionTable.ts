import { queryGetAllFundAccountsOptions } from "@/lib/queries/fund-accounts";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useActionTable = () => {
    const currentParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const queryClient = useQueryClient();

    const handlePagination = useCallback((page: string) => {
        const url = new URLSearchParams(currentParams.toString());

        url.set("page", page);

        queryClient.prefetchQuery(queryGetAllFundAccountsOptions(url.toString()));
        router.replace(`${pathname}?${url.toString()}`);
    }, [currentParams, pathname, queryClient, router]);

    const handleLimit = useCallback((limit: string) => {
        const url = new URLSearchParams(currentParams.toString());

        url.set("limit", limit);
        url.set("page", "1");

        queryClient.prefetchQuery(queryGetAllFundAccountsOptions(url.toString()));
        router.replace(`${pathname}?${url.toString()}`);
    }, [currentParams, pathname, queryClient, router]);

    return {handlePagination, handleLimit}
};
