import z from "zod";

export const profileSettingSchema = z.object({
    name: z.string().min(1),
    email: z.email(),
    password: z.string(),
});
export type typeProfileSettingSchema = z.infer<typeof profileSettingSchema>;

// setting system
export const SystemUpdateSettingSchema = z.object({
    app_name: z.string().nonempty({ error: "Nama aplikasi tidak boleh kosong!" }),
    logo_url: z.string().optional(),
    organization_address: z.string().optional(),
    tagline: z.string().optional(),
});
export type typeSystemUpdateSettingSchema = z.infer<typeof SystemUpdateSettingSchema>;

// setting pdf document
export const PdfDocumentUpdateSettingSchema = z.object({
    organization_type: z.string().nonempty({error: "Jenis organisasi tidak boleh kosong!"}),
    organization_name: z.string().nonempty({error: "Nama organisasi tidak boleh kosong!"}),
    organization_address: z.string().nonempty({error: "Alamat organisasi tidak boleh kosong!"}),
    document_title: z.string().nonempty({error: "Judul dokumen tidak boleh kosong!"}),
    footer_text: z.string().optional(),
    watermark_text: z.string().optional()
})
export type typePdfDocumentUpdateSettingSchema = z.infer<typeof PdfDocumentUpdateSettingSchema>


export interface pdf_document_settings {
    id: string
    organization_type: string
    organization_name: string
    organization_address: string
    document_title: string
    footer_text?: string
    watermark_text?: string
    created_at: Date
    updated_at: Date
}