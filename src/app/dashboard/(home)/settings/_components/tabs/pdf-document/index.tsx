"use client"

import { FileText } from "lucide-react"
import { useConfigureTabsPdfDocument } from "../../../_hooks/useConfigureTabsPdfDocument"
import { TabsCard } from "../../card/TabsCard"
import { TabsSkeleton } from "../../skeleton/TabsSkeleton"
import { PdfDocumentForm } from "./PdfDocumentForm"

export const PdfDocumentSettings = () => {
    const {data, isLoading, isError} = useConfigureTabsPdfDocument()

    return (
        <TabsCard icon={FileText} title="Konfigurasi Dokumen PDF" description="Pengaturan untuk generate dan export dokumen PDF">
            {isLoading || isError ? <TabsSkeleton icon={FileText} text="Pengaturan Dokumen" /> : <PdfDocumentForm defaulValues={data} />}
        </TabsCard>
    )
}