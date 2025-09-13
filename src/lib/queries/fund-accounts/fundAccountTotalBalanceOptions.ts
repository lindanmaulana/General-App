import { queryOptions } from "@tanstack/react-query";
import { fundAccountsKeys } from "./queryKeys";
import { getFundAccountTotalBalance } from "@/lib/services/fund-accounts.service";

export const fundAccountTotalBalanceOptions = () => {
    return queryOptions({
        queryKey: fundAccountsKeys.totals.balances.all(),
        queryFn: getFundAccountTotalBalance,
        staleTime: 1 * 60 * 60 * 1000,
    });
};
