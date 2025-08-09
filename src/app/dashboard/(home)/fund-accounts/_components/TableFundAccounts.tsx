"use client"

import { DataTable } from "@/components/DataTable"
import { FundAccounts } from "@/lib/models/fund-accounts"
import { useColumnsFundAccounts } from "./useColumnsFundAccounts"

interface TableFundAccountsProps {
    data: FundAccounts[]
}
export const TableFundAccounts = ({data}: TableFundAccountsProps) => {
    const columns = useColumnsFundAccounts()

    return (
        <DataTable title="Daftar Akun" description="Semua akun keuangan yang dikelola dalam sistem" columns={columns} data={data} />
    )
}