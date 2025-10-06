import { queryOptions } from "@tanstack/react-query";
import { fundAccountsKeys } from "./queryKeys";
import { getAllFundAccounts } from "@/lib/services/fund-accounts.service";

export const fundAccountListOptions = (params: string) => {
    return queryOptions({
        queryKey: fundAccountsKeys.list(params),
        queryFn: () => getAllFundAccounts(params),
        staleTime: 1 * 60 * 60 * 1000,
    });
};