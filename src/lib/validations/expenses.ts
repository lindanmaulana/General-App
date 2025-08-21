import z from "zod";

export const expensesSchema = z.object({
    event_id: z.string().min(1, "Harus pilih salah satu acara"),
    fund_account_id: z.string().min(1, "Harus pilih salah satu akun"),
    date: z.string().optional(),
    amount: z.string(),
    source: z.string().min(1, "Kategori pengeluaran tidak boleh kosong"),
    note: z.string().optional(),
})

export type TypeExpensesSchema = z.infer<typeof expensesSchema>