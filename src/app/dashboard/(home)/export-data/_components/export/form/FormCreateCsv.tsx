'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { handleParseDate } from "@/lib/helpers/parsing"
import { csvReportDocumentSchema, typeCsvReportDocumentSchema } from "@/lib/validations/report-document"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { csvData } from "../types/initial-data"
import { handleExportCsv } from "../helpers/exportCsv"

interface FormCreateCsvProps {
    incomesData: csvData[],
    expensesData: csvData[]
}

export const FormCreateCsv = ({incomesData, expensesData}: FormCreateCsvProps) => {
    const [fileName, setFileName] = useState<string>()
    const form = useForm<typeCsvReportDocumentSchema>({
        resolver: zodResolver(csvReportDocumentSchema),
        defaultValues: {
            filename: ""
        }
    })

    const handleForm = form.handleSubmit((value) => {
        const date = handleParseDate(new Date(), "YYYY-MM-DD")

        setFileName(`${value}-${date}`)
    })

    return (
        <Form {...form}>
            <form onSubmit={handleForm}>
                <FormField 
                    control={form.control}
                    name="filename"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Nama File</FormLabel>
                            <FormControl>
                                <Input {...field} type="text" placeholder="Contoh Laporan bulan agustus" className="dark:text-gnrWhite" readOnly={fileName !== null} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {fileName ? (
                    <Button type="button" onClick={() => handleExportCsv({dataIncomes: incomesData, dataExpenses: expensesData, fileName})}>Export</Button>
                ) : (
                    <Button type="submit">Simpan</Button>
                )}
            </form>
        </Form>
    )
}