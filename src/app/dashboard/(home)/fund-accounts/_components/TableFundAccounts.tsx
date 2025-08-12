"use client"

import { DataTable } from "@/components/DataTable"
import { FundAccounts } from "@/lib/models/fund-accounts"
import { useColumnsFundAccounts } from "./useColumnsFundAccounts"
import { useQuery } from "@tanstack/react-query"
import { ApiFundAccountsGetAll } from "@/lib/api/fund-accounts"
import { useSearchParams } from "next/navigation"

interface TableFundAccountsProps {
    data: FundAccounts[]
}
export const TableFundAccounts = ({data}: TableFundAccountsProps) => {
    const currentParams = useSearchParams()

    // const queryFundAccounts = useQuery({
    //     queryKey: ["getAllFundAccounts"],
    //     queryFn: () => ApiFundAccountsGetAll()
    // })

    const columns = useColumnsFundAccounts()

    return (
        <DataTable title="Daftar Akun" description="Semua akun keuangan yang dikelola dalam sistem" columns={columns} data={data} />
    )
}