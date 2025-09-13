import { queryOptions } from "@tanstack/react-query";
import { fundAccountsKeys } from "./queryKeys";
import { getActiveFundAccountCount } from "@/lib/services/fund-accounts.service";

export const fundAccountActiveCountOptions = () => {
    return queryOptions({
        queryKey: fundAccountsKeys.counts.all(),
        queryFn: getActiveFundAccountCount,
        staleTime: 1 * 60 * 60 * 1000,
    });
};
