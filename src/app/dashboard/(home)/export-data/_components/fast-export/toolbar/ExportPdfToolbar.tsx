"use client"

import { Button } from "@/components/ui/button"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { FileDown, FileText } from "lucide-react"
import { FinancialReportPdf } from "../../export/report/FinancialReportPdf"
import { useFormattedReportData } from "../hooks/useFormattedReportData"

export const ExportPdfToolbar = () => {
    const {fetchData, mutationFn, queryTotalBalance} = useFormattedReportData()

    const handleTriggerPdf = () => {
        fetchData()
    }

    return (
        <>
            {!mutationFn.data && (
                <Button onClick={handleTriggerPdf} variant={'outline'} className="dark:text-gnrWhite w-full flex items-center justify-start py-5 cursor-pointer">
                    {(mutationFn.isPending && queryTotalBalance.isLoading) ? "Loading..." : (<><FileText /> Ringkasan PDF</>)}
                </Button>
            )}

            {(mutationFn.data && queryTotalBalance.data) && (
                <Button className="w-full flex items-center gap-2 cursor-pointer bg-gnrGreen hover:bg-gnrGreen/80" asChild>
                    <PDFDownloadLink  document={<FinancialReportPdf incomes={mutationFn.data.incomes} expenses={mutationFn.data.expenses} />}>
                    {({loading}) =>  loading ? 'Membuat PDF...' : (<span className="flex items-center gap-px"><FileDown /> Unduh PDF</span>) }
                    </PDFDownloadLink>
                </Button>
            )}
        </>
    )
}