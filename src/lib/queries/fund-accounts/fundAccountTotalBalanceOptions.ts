import { queryOptions, UseQueryOptions } from "@tanstack/react-query";
import { fundAccountsKeys } from "./queryKeys";
import { getFundAccountTotalBalance } from "@/lib/services/fund-accounts.service";

export const fundAccountTotalBalanceOptions = (options: Partial<UseQueryOptions<number>>) => {
    return queryOptions({
        queryKey: fundAccountsKeys.totals.balances.all(),
        queryFn: getFundAccountTotalBalance,
        staleTime: 1 * 60 * 60 * 1000,
        ...options
    });
};
