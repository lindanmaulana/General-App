"use client"
import { Card, CardContent } from '@/components/ui/card';
import { useExportData } from '@/lib/zustand/useExportData';
import { Database, FileSpreadsheet, FileText } from 'lucide-react';


export const FormatFileConfig = () => {

    const hanldeSetConfig = useExportData((state) => state.setConfig)
    const formatFile = useExportData((state) => state.format)

    const isActive = (format: string): string => format === formatFile ? "border-2 border-gnrDark" : ""

    return (
        <div className="space-y-2">
            <h4 className="dark:text-gnrWhite text-lg font-medium">Format File</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card onClick={() => hanldeSetConfig({"format": "excel"})} className={`${isActive("excel")} dark:bg-black dark:border-white/20 hover:border-gnrDark cursor-pointer`}>
                    <CardContent className="flex flex-col items-center justify-center">
                        <FileSpreadsheet className="dark:text-white mb-1" />
                        <h5 className="dark:text-gnrWhite text-base font-semibold">Excel</h5>
                        <p className="text-sm text-gnrGray">.xlsx</p>
                    </CardContent>
                </Card>
                <Card onClick={() => hanldeSetConfig({"format": "csv"})} className={`${isActive("csv")} dark:bg-black dark:border-white/20 hover:border-gnrDark cursor-pointer`}>
                    <CardContent className="flex flex-col items-center justify-center">
                        <FileText className="dark:text-white mb-1" />
                        <h5 className="dark:text-gnrWhite text-base font-semibold">CSV</h5>
                        <p className="text-sm text-gnrGray">.csv</p>
                    </CardContent>
                </Card>
                <Card onClick={() => hanldeSetConfig({"format": "pdf"})} className={`${isActive("pdf")} dark:bg-black dark:border-white/20 hover:border-gnrDark cursor-pointer`}>
                    <CardContent className="flex flex-col items-center justify-center">
                        <FileText className="dark:text-white mb-1" />
                        <h5 className="dark:text-gnrWhite text-base font-semibold">PDF</h5>
                        <p className="text-sm text-gnrGray">.pdf</p>
                    </CardContent>
                </Card>
                <Card onClick={() => hanldeSetConfig({"format": "json"})} className={`${isActive("json")} dark:bg-black dark:border-white/20 hover:border-gnrDark cursor-pointer`}>
                    <CardContent className="flex flex-col items-center justify-center">
                        <Database className="dark:text-white mb-1" />
                        <h5 className="dark:text-gnrWhite text-base font-semibold">JSON</h5>
                        <p className="text-sm text-gnrGray">.json</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}