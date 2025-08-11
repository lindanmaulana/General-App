export interface FundAccounts {
    id: string
    name: string
    provider_name: string
    type: string
    account_number: string
    holder_name: string
    is_active: boolean
    created_at: Date
    updated_at: Date
}

export interface FundAccountsCreateRequest {
    name: string
    provider_name?: string
    type: string
    account_number?: string
    holder_name: string
}

export interface FundAccountsUpdateRequest {
    name?: string
    provider_name?: string
    type?: string
    account_number?: string
    holder_name?: string
    is_active?: string
}