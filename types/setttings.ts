export interface system_settings {
    id: string;
    app_name: string;
    logo_url: string;
    organization_address: string;
    tagline: string;
    created_at: Date;
    updated_at: Date;
}


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

export type Users = {
    id: string
    name: string | null
    email: string
    role: "ADMIN" | "MEMBER"
    image: string | ""
}