import z from "zod";

export type TypeFieldFundAcounts = "name" | "type" | "account_number" | "holder_name"
export const FundAccountsCreate = z.object({
    name: z.string().min(1, "Nama tidak boleh kosong!"),
    type: z.string().min(1, "Jenis akun tidak boleh kosong!"),
    account_number: z.string().optional(),
    holder_name: z.string().min(1, "Nama pemilik tidak boleh kosong!"),
})
export type TypeFundAccountsCreate = z.infer<typeof FundAccountsCreate>