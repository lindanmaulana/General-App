import { events } from "./events"
import { fundAccounts } from "./fund-accounts"

export interface incomes {
    id: string
    event_id: string
    events?: events
    fund_account_id: string
    fund_accounts?: fundAccounts
    date?: Date
    amount: number
    source?: string
    note?: string
    created_at: Date
    updated_at: Date
}

export interface incomesCreateRequest {
    event_id: string
    fund_account_id: string
    date?: Date
    amount: number
    source?: string
    note?: string
}