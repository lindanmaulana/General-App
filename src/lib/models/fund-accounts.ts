export interface fundAccounts {
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

export interface fundAccountsCreateRequest {
  name: string;
  provider_name?: string;
  type: string;
  account_number?: string;
  holder_name: string;
  is_active: boolean;
}

export interface fundAccountsUpdateRequest {
  name: string;
  provider_name?: string;
  type: string;
  account_number?: string;
  holder_name: string;
  is_active: boolean;
}

export interface fundAccountsGetAllResponse {
  error: string | null;
  data: fundAccounts[];
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