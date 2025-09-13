import { queryOptions } from "@tanstack/react-query";
import { fundAccountsKeys } from "./queryKeys";
import { getNonCashActiveFundAccountCount } from "@/lib/services/fund-accounts.service";

export const fundAccountNonCashActiveCountOptions = () => {
    return queryOptions({
        queryKey: fundAccountsKeys.counts.actives.nonCash(),
        queryFn: getNonCashActiveFundAccountCount,
        staleTime: 1 * 60 * 60 * 1000,
    });
};
