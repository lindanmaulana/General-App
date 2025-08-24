import z from "zod";

export const incomesReportDocumentSchema = z.object({
    period: z.string().min(1, "Periode tidak boleh kosong"),
    date: z.string()
})

export type typeIncomesReportDocumentSchema = z.infer<typeof incomesReportDocumentSchema>