"use client"

import { FileText } from "lucide-react"
import { TabsCard } from "../../card/TabsCard"
import { PdfDocumentForm } from "./PdfDocumentForm"
import { pdfDocumentSettingListOptions } from "@/lib/queries/settings/pdfDocumentSettingListOptions"
import { useQuery } from "@tanstack/react-query"
import { TabsSkeleton } from "../../skeleton/TabsSkeleton"

const PdfDocumentSettings = () => {

    const {data, isLoading, isError} = useQuery(pdfDocumentSettingListOptions())

    return (
        <TabsCard icon={FileText} title="Konfigurasi Dokumen PDF" description="Pengaturan untuk generate dan export dokumen PDF">
            {isLoading || isError ? <TabsSkeleton icon={FileText} text="Pengaturan Dokumen" /> : <PdfDocumentForm defaulValues={data} />}
        </TabsCard>
    )
}

export default PdfDocumentSettings