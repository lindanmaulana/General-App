import { create } from "zustand";

type State = {
    id: string;
    organization_type: string;
    organization_name: string;
    organization_address: string;
    document_title: string;
    footer_text?: string;
    watermark_text?: string;
    created_at: Date;
    updated_at: Date;
};


type Action = {
    setState: (state: Partial<State>) => void
}


type ConfigPdfDocumentSetting = State & Action


export const usePdfDocumentSetting = create<ConfigPdfDocumentSetting>((set) => ({
    id: "",
    organization_type: "",
    organization_name: "",
    organization_address: "",
    document_title: "",
    footer_text: "",
    watermark_text: "",
    created_at: new Date(),
    updated_at: new Date(),

    setState: (data) => set((state) => ({...state, ...data}))
}))