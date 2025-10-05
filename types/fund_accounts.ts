type TypeFundAccounts = "BANK" | "CASH" | "EWALLET"

export interface FundAccounts {
    id: string
    name: string
    provider_name?: string
    type: TypeFundAccounts
    account_number?: string
    is_active: boolean
    holder_name: string
}