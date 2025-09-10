'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { handleParseDate } from '@/lib/helpers/parsing';
import { reportDocumentSchema, typeReportDocumentSchema } from '@/lib/validations/report-document';
import { zodResolver } from '@hookform/resolvers/zod';
import { Download, RotateCw } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCustomExportData } from '../../hooks/useCustomExport';
import { createInitialCsv, handleExportCsv } from '../export/helpers/exportCsv';
import { handleExportExcel } from '../export/helpers/exportExcel';
import { handleExportJson } from '../export/helpers/exportJson';
import { formatDataForExport } from '../export/helpers/formatDataForExport';
import { PdfExportToolbar } from './PdfExportToolbar';
import { initialData } from '../export/types/initial-data';
import { FORMAT_FILE } from '@/lib/constants/format-file';

export const CustomExportToolbar = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {formatFile, queryTotalBalance, mutationFn, fetchData} = useCustomExportData({isOpen})

  const handleResetDialog = useCallback(() => {
    setIsOpen(false)
  }, [])

  const form = useForm<typeReportDocumentSchema>({
    resolver: zodResolver(reportDocumentSchema),
    defaultValues: {
      filename: '',
    },
  });
  const {reset} = form

  const handleForm = form.handleSubmit((value) => {
    const date = handleParseDate(new Date(), 'YYYY-MM-DD');

    setFileName(`${value.filename}-${date}`);
  });

  const handleDownloadFile = useCallback(() => {
    const data = mutationFn.data;

    const handlers: Record<FORMAT_FILE, (data: initialData) => void> = {
      csv: (data) => {
        const dataCsv = createInitialCsv({ incomes: data.incomes, expenses: data.expenses });
        handleExportCsv({ dataIncomes: dataCsv.incomesData, dataExpenses: dataCsv.expensesData, fileName: fileName ?? '' });
      },

      excel: (data) => {
        const formattedData = formatDataForExport(data)
        handleExportExcel({data: {incomes: formattedData.incomesData, expenses: formattedData.expensesData}, fileName: fileName ?? ""})
      },

      json: (data) => {
        handleExportJson({ dataIncomes: data.incomes, dataExpenses: data.expenses, fileName: fileName ?? '' });
      }
    }

    handlers[formatFile as FORMAT_FILE]?.(data)

    setIsOpen(false);
    setFileName(null);
    reset();

  }, [fileName, reset, formatFile, mutationFn.data])


  return (
    <Dialog key={'custom-export-toolbar'} onOpenChange={() => setIsOpen(!isOpen)} open={isOpen}>
      <DialogTrigger asChild>
        <Button onClick={fetchData} className="w-full">
          <Download /> Mulai Export
        </Button>
      </DialogTrigger>
      <DialogContent className='dark:bg-black dark:border-white/30'>
        <DialogTitle className='dark:text-gnrWhite'>Export data custom</DialogTitle>
        <DialogDescription></DialogDescription>

        {(mutationFn.isPending || queryTotalBalance.isLoading || queryTotalBalance.isError) && (
          <div className="flex items-center justify-center py-4">
            <RotateCw className="animate-spin" />
          </div>
        )}

        {!formatFile && <p>File anda gagal di buat, harap lengkapi konfigurasi terlebih dahulu</p>}

        {mutationFn.data && formatFile && (
          <Form {...form}>
            <form onSubmit={handleForm} className="space-y-4">
              <FormField
                control={form.control}
                name="filename"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='dark:text-gnrWhite'>Nama File</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Contoh Laporan bulan agustus" className="dark:text-gnrWhite dark:bg-black" readOnly={fileName !== null} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className='flex items-center gap-2 flex-row-reverse'>
                {fileName && formatFile === "pdf" && <PdfExportToolbar handleResetDialog={handleResetDialog} totalBalance={queryTotalBalance.data ?? 0} fileName={fileName} incomes={mutationFn.data.incomes} expenses={mutationFn.data.expenses} />}

                {fileName && formatFile !== "pdf" ? (
                  <Button type="button" onClick={handleDownloadFile}>
                    Download
                  </Button>
                ) : (
                  <Button type="submit" disabled={!!fileName}>Simpan</Button>
                )}
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
