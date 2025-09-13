import { queryOptions } from "@tanstack/react-query";
import { fundAccountsKeys } from "./queryKeys";
import { getCashFundAccountTotalBalance } from "@/lib/services/fund-accounts.service";

export const fundAccountTotalBalanceCashOptions = () => {
    return queryOptions({
        queryKey: fundAccountsKeys.totals.balances.cash(),
        queryFn: getCashFundAccountTotalBalance,
        staleTime: 1 * 60 * 60 * 1000,
    });
};
