"use client"

import { FundAccounts } from "@/lib/models/fund-accounts"
import { ColumnDef } from "@tanstack/react-table"
import { Banknote, CreditCard, Landmark, Wallet } from "lucide-react"
import { useMemo } from "react"

export const useColumnsFundAccounts = () => {
    const columns = useMemo(() => {
        const column: ColumnDef<FundAccounts>[] = [
            {
                accessorKey: "name",
                header: "Akun",
                cell: ({row}) => {
                    const fundAccounts = row.original

                    let IconComponent

                    switch(fundAccounts.type) {
                        case "CASH":
                            IconComponent = Banknote
                            break
                        case "BANK":
                            IconComponent = Landmark
                        break
                        case "WALLET":
                            IconComponent = Wallet
                        break
                        default:
                            IconComponent = CreditCard
                    }

                    return (
                        <div>
                            <IconComponent />
                            <span>{fundAccounts.name}</span>
                        </div>
                    )
                }
            },
            {
                accessorKey: "type",
                header: "Jenis",
                cell: ({row}) => {
                    const fundAccounts = row.original

                    let styleBgType: string

                     switch(fundAccounts.type) {
                        case "CASH":
                            styleBgType = "bg-gnrOrange/10 text-gnrOrange"
                            break
                        case "BANK":
                            styleBgType = "bg-gnrPrimary/10 text-gnrPrimary"
                        break
                        case "WALLET":
                            styleBgType = "bg-gnrGreen/10 text-gnrGreen"
                        break
                        default:
                            styleBgType = "bg-gnrPrimary/10 text-gnrPrimary"
                    }


                    return (
                        <div className={`${styleBgType}`}>{fundAccounts.type}</div>
                    )
                }
            }
        ] 

        return column
    }, [])

    return columns
}