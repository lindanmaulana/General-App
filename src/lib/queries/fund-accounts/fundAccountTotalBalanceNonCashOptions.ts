import { queryOptions } from "@tanstack/react-query";
import { fundAccountsKeys } from "./queryKeys";
import { getNonCashFundAccountTotalBalance } from "@/lib/services/fund-accounts.service";

export const fundAccountTotalBalanceNonCashOptions = () => {
    return queryOptions({
        queryKey: fundAccountsKeys.totals.balances.nonCash(),
        queryFn: getNonCashFundAccountTotalBalance,
        staleTime: 1 * 60 * 60 * 1000,
    });
};
