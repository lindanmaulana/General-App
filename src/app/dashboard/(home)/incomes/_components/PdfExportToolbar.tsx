"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { queryGetTotalBalanceFundAccountsOptions } from "@/lib/queries/fund-accounts"
import { queryGetAllIncomesOptions } from "@/lib/queries/incomes"
import { incomesReportDocumentSchema, typeIncomesReportDocumentSchema } from "@/lib/validations/report-document"
import { zodResolver } from "@hookform/resolvers/zod"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { useQuery } from "@tanstack/react-query"
import { FileDown } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { SkeletonButton } from "../../_components/SkeletonButton"
import { IncomesDocument } from "./IncomesDocument"

export const PdfExportToolbar = () => {
    const currentParams = useSearchParams()
    const [pdf, setPdf] = useState<{period: string, date: Date} | null>(null)
    
    const queryOptions = useMemo(() => {
        return queryGetAllIncomesOptions(currentParams.toString())
    }, [currentParams])

    const {isLoading, isError, data} = useQuery(queryOptions)
    const queryTotalBalance = useQuery(queryGetTotalBalanceFundAccountsOptions())

    const form = useForm<typeIncomesReportDocumentSchema>({
        resolver: zodResolver(incomesReportDocumentSchema),
        defaultValues: {
            period: "",
            date: ""
        }
    })

    if(isLoading || queryTotalBalance.isLoading) return <SkeletonButton />

    if(isError || queryTotalBalance.isError) return <p>Error...</p>

    const totalBalance = queryTotalBalance.data

    const handleForm = form.handleSubmit((value) => {
        setPdf({period: value.period, date: new Date(value.date)})
    })

    return (
        <Dialog key={data.data.id}>
            <DialogTrigger asChild>
                <Button variant={"outline"} className="cursor-pointer"><FileDown /> Export PDF</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Laporan Pemasukan</DialogTitle>
                    <DialogDescription>Export laporan pemasukan</DialogDescription>
                </DialogHeader> 

                <Form {...form}>
                    <form onSubmit={handleForm} className="space-y-2">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="period"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Periode</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" placeholder="Contoh Agustus - Desember 2025" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField 
                                control={form.control}
                                name="date"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input {...field} type="hidden" value={new Date().toString()} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {pdf ? (
                            <PDFDownloadLink document={<IncomesDocument period={pdf.period} date={new Date(pdf.date)} data={data.data} totalBalance={totalBalance} />} fileName="Laporan pemasukan keuangan">
                                {({loading}) => (
                                    <Button type="button" variant="outline" className="flex items-center gap-2">
                                        <FileDown size={16} />
                                        {loading ? 'Membuat PDF...' : 'Export PDF'}
                                    </Button>
                                )}
                            </PDFDownloadLink>
                        ) : (
                            <Button type="submit">Simpan</Button>
                        )}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}