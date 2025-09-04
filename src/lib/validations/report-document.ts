import z from "zod";

export const incomesReportDocumentSchema = z.object({
    period: z.string().min(1, "Periode tidak boleh kosong"),
})

export type typeIncomesReportDocumentSchema = z.infer<typeof incomesReportDocumentSchema>

export const csvReportDocumentSchema = z.object({
    filename: z.string().min(1, "Nama file harus di isi")
})
export type typeCsvReportDocumentSchema = z.infer<typeof csvReportDocumentSchema>


export const reportDocumentSchema = z.object({
    filename: z.string().min(1, "Nama file harus di isi")
})
export type typeReportDocumentSchema = z.infer<typeof reportDocumentSchema>