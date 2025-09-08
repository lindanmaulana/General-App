"use client"

import { expenses } from "@/app/api/_lib/models/expenses"
import { incomes } from "@/app/api/_lib/models/incomes"
import { Button } from "@/components/ui/button"
import { PDFDownloadLink, usePDF } from "@react-pdf/renderer"
import { FileDown } from "lucide-react"
import { FinancialReportPdf } from "../export/report/FinancialReportPdf"
import { useExportData } from "@/lib/zustand/useExportData"
import { saveAs } from "file-saver"
import { useMemo } from "react"

interface PdfExportToolbarProps {
    incomes: incomes[]
    expenses: expenses[]
    fileName: string
    totalBalance: number
    handleResetDialog: () => void
}
export const PdfExportToolbar = ({incomes, expenses, fileName, totalBalance, handleResetDialog}: PdfExportToolbarProps) => {
    const hanldeResetConfig = useExportData((state) => state.resetConfig)
    const [instance, updateInstance] = usePDF({document: <FinancialReportPdf totalBalance={totalBalance} incomes={incomes} expenses={expenses} />})


    const handleDownloadFile = () => {
        if(instance.url) {
            saveAs(instance.url, fileName)
            hanldeResetConfig()
            handleResetDialog()
        }
    }

    return (
        //   <PDFDownloadLink document={<FinancialReportPdf totalBalance={totalBalance} incomes={incomes} expenses={expenses} />} fileName={fileName}>
        //     {({ loading }) => (
        //         <Button type="button" className="flex items-center gap-2 cursor-pointer bg-gnrGreen hover:bg-gnrGreen/80">
        //             <FileDown size={16} />
        //             {loading ? 'Membuat PDF...' : 'Unduh PDF'}
        //         </Button>
        //     )}
        // </PDFDownloadLink>

         <Button type="button" onClick={handleDownloadFile} className="flex items-center gap-2 cursor-pointer bg-gnrGreen hover:bg-gnrGreen/80" disabled={instance.loading}>
                    <FileDown size={16} />
                    {instance.loading ? 'Membuat PDF...' : 'Unduh PDF'}
        </Button>
    )
}