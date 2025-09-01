"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { handleParseDate, handleParsePrice } from "@/lib/helpers/parsing"
import { queryGetAllExpensesOptions } from "@/lib/queries/expenses"
import { csvReportDocumentSchema, typeCsvReportDocumentSchema } from "@/lib/validations/report-document"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { Download } from "lucide-react"
import { useSearchParams } from "next/navigation"
import Papa from "papaparse"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { SkeletonButton } from "../../../_components/skeleton/SkeletonButton"
import { expenses } from "@/app/api/_lib/models/expenses"

export const CsvExportToolbar = () => {
    const [fileName, setFileName] = useState<{name: string} | null>(null)
    const currentParams = useSearchParams()

    // const fileName = `Laporan `


    const form = useForm<typeCsvReportDocumentSchema>({
        resolver: zodResolver(csvReportDocumentSchema),
        defaultValues: {
            filename: ""
        }
    })

    const handleForm = form.handleSubmit((value) => {
        const date = handleParseDate(new Date(), "YYYY-MM-DDTHH:mm")
        setFileName({name: `${value.filename}-${date}`})
    })

    const options = useMemo(() => {
        return queryGetAllExpensesOptions(currentParams.toString())
    }, [currentParams])

    const {data, isLoading, isError} = useQuery(options)

    if(isLoading) return <SkeletonButton />

    if(isError) return <></>

    
    const handleExportCsv = () => {
        const csvData = data.data.map((expenses: expenses, index: number) => {
            const clean = (val: string) => val.replace(/\u00A0/g, " ");
            const expensesDate = expenses.date ? handleParseDate(expenses.date, "YYYY-MM-DD"): ""
            const amount = handleParsePrice(expenses.amount)
            console.log({expenses})

            return ({
                No: index + 1,
                Tanggal: expensesDate,
                Sumber_Pendapatan: expenses.source,
                Deskripsi: expenses.note ?? "-",
                Akun: expenses.fund_accounts ? expenses.fund_accounts.name : "-",
                Jumlah: clean(amount)
            })
        })

        const csv = Papa.unparse(csvData, {
            header: true,
            delimiter: ";",
        })

        const blob = new Blob([csv], {type: "text/csv;charset=utf-8;"})

        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.setAttribute('href', url)
        link.setAttribute('download', fileName ? fileName.name : "Laporan" )
        link.style.display = "none"

        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        setFileName(null)
        form.reset()
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'outline'} className="dark:text-gnrWhite dark:hover:text-gnrWhite/80 dark:border-white/20 w-full md:w-fit cursor-pointer">
                    <Download /> Download File CSV
                </Button>
            </DialogTrigger>
            <DialogContent className="dark:bg-black dark:border-white/30">
                <DialogTitle className="dark:text-gnrWhite">Laporan Pengeluaran</DialogTitle>
                <DialogDescription>Buat data laporan pengeluaran ke CSV</DialogDescription>
                <Form {...form}>
                    <form onSubmit={handleForm} className="space-y-2">
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
                            <Button type="button" onClick={handleExportCsv}>Export</Button>
                        ) : (
                            <Button type="submit" disabled={data.data.length <= 0}>Simpan</Button>
                        )}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}