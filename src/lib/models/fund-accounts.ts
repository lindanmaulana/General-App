export interface FundAccounts {
  id: string;
  name: string;
  provider_name: string;
  type: string;
  account_number: string;
  holder_name: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface FundAccountsCreateRequest {
  name: string;
  provider_name?: string;
  type: string;
  account_number?: string;
  holder_name: string;
}

export interface FundAccountsUpdateRequest {
  name?: string;
  provider_name?: string;
  type?: string;
  account_number?: string;
  holder_name?: string;
  is_active?: string;
}

export interface FundAccountsGetAllResponse {
  error: string | null;
  data: FundAccounts[];
  count: number;
  status: number;
  statusText: string;
  pagination: {
    totalPage: number
    currentPage: number
    limit: number;
    links: number[];
    nextPage: number | null;
    prevPage: number | null;
  };
}