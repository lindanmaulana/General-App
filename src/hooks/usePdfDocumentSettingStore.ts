import { usePdfDocumentSetting } from "@/lib/zustand/usePdfDocumentSetting"

export const usePdfDocumentSettingStore = () => {
    const id = usePdfDocumentSetting((state) => state.id)
    const organization_type = usePdfDocumentSetting((state) => state.organization_type)
    const organization_name = usePdfDocumentSetting((state) => state.organization_name)
    const organization_address = usePdfDocumentSetting((state) => state.organization_address)
    const document_title = usePdfDocumentSetting((state) => state.document_title)
    const footer_text = usePdfDocumentSetting((state) => state.footer_text)
    const watermark_text = usePdfDocumentSetting((state) => state.watermark_text)


    return {id, organization_type, organization_name, organization_address, document_title, footer_text, watermark_text}
}