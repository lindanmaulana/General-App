"use client"

import { handleParseDate, handleParsePrice } from "@/lib/helpers/parsing"
import { incomes } from "@/lib/models/incomes"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useColumnsIncomes = () => {
    const columns = useMemo(() => {
        const column: ColumnDef<incomes>[] = [
            {
                accessorKey: "date",
                header: "Tanggal",
                cell: ({row}) => {
                    const income = row.original

                    let date = "-"
                    if(income.date) date = handleParseDate(income.date, "DD MM YYYY HH:mm")

                    return date
                }
            },
            {
                accessorKey: "events",
                header: "Acara",
                cell: ({row}) => {
                    const income = row.original

                    let nameEvent = "-"

                    if(income.events) nameEvent = income.events.name

                    return <span className="text-gnrGreen bg-gnrGreen/20 rounded-full px-2 py-px font-semibold">{nameEvent}</span>
                }
            },
            {
                accessorKey: "source",
                header: "Sumber Pendapatan"
            },
            {
                accessorKey: "note",
                header: "Deskripsi",
                cell: ({row}) => {
                    const income = row.original

                    return income.note ? income.note : "-"
                }
            },
            {
                accessorKey: "fund_account_id",
                header: "Akun",
                cell: ({row}) => {
                    const income = row.original

                    let nameAkun = "-"

                    if(income.fund_accounts) nameAkun = income.fund_accounts.name

                    return nameAkun
                }
            },
            {
                accessorKey: "amount",
                header: "Jumlah",
                cell: ({row}) => {
                    const income = row.original

                    const amount = handleParsePrice(income.amount)

                    return <span className="text-gnrGreen font-semibold">{amount}</span>
                }
            }
        ]

        return column
    }, [])


    return columns
}