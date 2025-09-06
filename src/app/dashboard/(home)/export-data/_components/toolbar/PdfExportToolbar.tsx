"use client"

import { expenses } from "@/app/api/_lib/models/expenses"
import { incomes } from "@/app/api/_lib/models/incomes"
import { Button } from "@/components/ui/button"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { FileDown } from "lucide-react"
import { FinancialReportPdf } from "../export/report/FinancialReportPdf"

interface PdfExportToolbarProps {
    incomes: incomes[]
    expenses: expenses[]
    fileName: string
    totalBalance: number
}
export const PdfExportToolbar = ({incomes, expenses, fileName, totalBalance}: PdfExportToolbarProps) => {

    return (
          <PDFDownloadLink document={<FinancialReportPdf totalBalance={totalBalance} incomes={incomes} expenses={expenses} />} fileName={fileName}>
            {({ loading }) => (
                <Button type="button" className="flex items-center gap-2 cursor-pointer bg-gnrGreen hover:bg-gnrGreen/80">
                    <FileDown size={16} />
                    {loading ? 'Membuat PDF...' : 'Unduh PDF'}
                </Button>
            )}
        </PDFDownloadLink>
    )
}