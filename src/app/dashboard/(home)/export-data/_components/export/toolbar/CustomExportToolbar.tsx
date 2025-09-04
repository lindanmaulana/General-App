"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { apiExportDataCustom } from "@/lib/api/export-data"
import { errorHandler } from "@/lib/helpers/errorHandler"
import { typeExportDataCustomSchema } from "@/lib/validations/export-data"
import { useExportData } from "@/lib/zustand/useExportData"
import { useMutation } from "@tanstack/react-query"
import { Download, RotateCw } from "lucide-react"
import { toast } from "sonner"
import { CreateInitialCsv, handleExportCsv } from "../helpers/exportCsv"
import { FormCreateCsv } from "../form/FormCreateCsv"
import { useForm } from "react-hook-form"
import { reportDocumentSchema, typeReportDocumentSchema } from "@/lib/validations/report-document"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { handleParseDate } from "@/lib/helpers/parsing"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export const CustomExportToolbar = () => {
    const [fileName, setFileName] = useState<string | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const formatFile = useExportData((state) => state.format)
    const dateFile = useExportData((state) => state.date)
    const categoryDataFile = useExportData((state) => state.category_data)
    const eventsFile = useExportData((state) => state.events)

    const mutationExportDataCustom = useMutation({
        mutationKey: ["exportDataCustom"],
        mutationFn: (data: typeExportDataCustomSchema) => apiExportDataCustom(data),
    })

    const handleGetData = () => {
        setIsOpen(true)
        const data: typeExportDataCustomSchema = {
            category_data: categoryDataFile,
            date_file: {
                start_date: dateFile.start_date ?? "",
                end_date: dateFile.end_date ?? ""
            },
            events: eventsFile
        }

        if(formatFile) mutationExportDataCustom.mutate(data, {
            onSuccess: () => {
                toast.success("Data selesai di muat...")
            },

            onError: (err) => {
                const errorMessage = errorHandler(err)

                toast.error(errorMessage)
            }
        })
    }

    const form = useForm<typeReportDocumentSchema>({
        resolver: zodResolver(reportDocumentSchema),
        defaultValues: {
            filename: ""
        }
    })

    const handleForm = form.handleSubmit((value) => {
        const date = handleParseDate(new Date(), "YYYY-MM-DD")
        
        setFileName(`${value.filename}-${date}`)
    })

    const handleDownloadFile = () => {
        const data = mutationExportDataCustom.data

        setIsOpen(false)
        setFileName(null)
        form.reset()

        switch(formatFile) {
            case "csv":
                const dataCsv = CreateInitialCsv({incomes: data.incomes, expenses: data.expenses})
                return handleExportCsv({dataIncomes: dataCsv.incomesData, dataExpenses: dataCsv.expensesData, fileName: fileName ?? ""})
        }
    }


    return (
        <Dialog key={"custom-export-toolbar"} onOpenChange={() => setIsOpen(!isOpen)} open={isOpen}>
            <DialogTrigger asChild>
                <Button onClick={handleGetData} className='w-full'><Download /> Mulai Export</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>{mutationExportDataCustom.isPending ? "Loading please wait.." : "Export data custom"}</DialogTitle>
                <DialogDescription></DialogDescription>

                {mutationExportDataCustom.isPending && (
                    <div className="flex items-center justify-center py-4">
                        <RotateCw className="animate-spin" />
                    </div>
                )}

                {!formatFile && <p>File anda gagal di buat, harap lengkapi konfigurasi terlebih dahulu</p>}

                {mutationExportDataCustom.data && formatFile && (
                    <Form {...form}>
                        <form onSubmit={handleForm} className="space-y-4">
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
                                <Button type="button" onClick={handleDownloadFile}>Download</Button>
                            ) : (
                                <Button type="submit">Simpan</Button>
                            )}
                        </form>
                    </Form>
                )}

                {/* {mutationExportDataCustom.data && formatFile === "csv" ? <FormCreateCsv incomesData={mutationExportDataCustom.data.incomesData} expensesData={mutationExportDataCustom.data.expensesData} /> : ""} */}

            </DialogContent>
        </Dialog>
    )
}