import z from "zod";

export type TypeFieldFundAcounts = "name" | "provider_name" | "type" | "account_number" | "holder_name"

export const FundAccountsCreateSchema = z.object({
    name: z.string().min(1, "Nama tidak boleh kosong!"),
    provider_name: z.string().optional(),
    type: z.string().min(1, "Jenis akun tidak boleh kosong!"),
    account_number: z.string().optional(),
    is_active: z.string().max(1),
    holder_name: z.string().min(1, "Nama pemilik tidak boleh kosong!"),
})

export type TypeFundAccountsCreateSchema = z.infer<typeof FundAccountsCreateSchema>

export const FundAccountsUpdateSchema = z.object({
    name: z.string().min(1, "Nama tidak boleh kosong!"),
    provider_name: z.string().optional(),
    type: z.string().min(1, "Jenis akun tidak boleh kosong!"),
    account_number: z.string().optional(),
    is_active: z.string().max(1),
    holder_name: z.string().min(1, "Nama pemilik tidak boleh kosong!"),
})
export type TypeFundAccountsUpdateSchema = z.infer<typeof FundAccountsUpdateSchema>