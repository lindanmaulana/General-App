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