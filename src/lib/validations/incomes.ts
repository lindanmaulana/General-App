import z from "zod";

export const incomesShcema = z.object({
    event_id: z.string().min(1, "Harus pilih salah satu acara"),
    fund_account_id: z.string().min(1, "Harus pilih salah satu akun"),
    date: z.string().optional(),
    amount: z.string(),
    source: z.string().optional(),
    note: z.string().optional(),
})

export type TypeIncomesSchema = z.infer<typeof incomesShcema>