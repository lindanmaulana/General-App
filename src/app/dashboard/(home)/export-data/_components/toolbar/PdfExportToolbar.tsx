"use client"

import { expenses } from "@/app/api/_lib/models/expenses"
import { incomes } from "@/app/api/_lib/models/incomes"
import { Button } from "@/components/ui/button"
import { useExportData } from "@/lib/zustand/useExportData"
import { usePDF } from "@react-pdf/renderer"
import { saveAs } from "file-saver"
import { FileDown } from "lucide-react"
import { FinancialReportPdf } from "../export/report/FinancialReportPdf"

interface PdfExportToolbarProps {
    incomes: incomes[]
    expenses: expenses[]
    fileName: string
    totalBalance: number
    handleResetDialog: () => void
}
export const PdfExportToolbar = ({incomes, expenses, fileName, totalBalance, handleResetDialog}: PdfExportToolbarProps) => {
    const hanldeResetConfig = useExportData((state) => state.resetConfig)
    const [instance] = usePDF({document: <FinancialReportPdf totalBalance={totalBalance} incomes={incomes} expenses={expenses} />})


    const handleDownloadFile = () => {
        if(instance.url) {
            saveAs(instance.url, fileName)
            hanldeResetConfig()
            handleResetDialog()
        }
    }

    return (
        <Button type="button" onClick={handleDownloadFile} className="flex items-center gap-2 cursor-pointer bg-gnrGreen hover:bg-gnrGreen/80" disabled={instance.loading}>
            <FileDown size={16} />
            {instance.loading ? 'Membuat PDF...' : 'Unduh PDF'}
        </Button>
    )
}