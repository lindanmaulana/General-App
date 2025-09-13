import { queryOptions } from "@tanstack/react-query";
import { fundAccountsKeys } from "./queryKeys";
import { getFundAccountOptions } from "@/lib/services/fund-accounts.service";

export const fundAccountOptions = () => {
    return queryOptions({
        queryKey: fundAccountsKeys.options(),
        queryFn: getFundAccountOptions,
        staleTime: 1 * 60 * 60 * 1000,
    });
};
