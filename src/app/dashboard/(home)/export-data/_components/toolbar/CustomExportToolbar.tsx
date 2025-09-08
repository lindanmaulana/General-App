'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { apiExportDataCustom } from '@/lib/api/export-data';
import { errorHandler } from '@/lib/helpers/errorHandler';
import { handleParseDate } from '@/lib/helpers/parsing';
import { queryGetTotalBalanceFundAccountsOptions } from '@/lib/queries/fund-accounts';
import { typeExportDataCustomSchema } from '@/lib/validations/export-data';
import { reportDocumentSchema, typeReportDocumentSchema } from '@/lib/validations/report-document';
import { useExportData } from '@/lib/zustand/useExportData';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Download, RotateCw } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createInitialCsv, handleExportCsv } from '../export/helpers/exportCsv';
import { handleExportJson } from '../export/helpers/exportJson';
import { PdfExportToolbar } from './PdfExportToolbar';
import { formatDataForExport } from '../export/helpers/formatDataForExport';
import { handleExportExcel } from '../export/helpers/exportExcel';

export const CustomExportToolbar = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const formatFile = useExportData((state) => state.format);
  const dateFile = useExportData((state) => state.date);
  const categoryDataFile = useExportData((state) => state.category_data);
  const eventsFile = useExportData((state) => state.events);

  const queryTotalBalance = useQuery(queryGetTotalBalanceFundAccountsOptions({enabled: !!isOpen}))

  const mutationExportDataCustom = useMutation({
    mutationKey: ['exportDataCustom'],
    mutationFn: (data: typeExportDataCustomSchema) => apiExportDataCustom(data),
  });

  const handleGetData = () => {
    setIsOpen(true);
    const data: typeExportDataCustomSchema = {
      category_data: categoryDataFile,
      date_file: {
        start_date: dateFile.start_date ?? '',
        end_date: dateFile.end_date ?? '',
      },
      events: eventsFile,
    };

    if (formatFile)
      mutationExportDataCustom.mutate(data, {
        onSuccess: () => {
          setFileName(null)
          toast.success('Data selesai di muat...');
        },

        onError: (err) => {
          const errorMessage = errorHandler(err);

          toast.error(errorMessage);
        },
      });
  };

  const form = useForm<typeReportDocumentSchema>({
    resolver: zodResolver(reportDocumentSchema),
    defaultValues: {
      filename: '',
    },
  });

  const handleForm = form.handleSubmit((value) => {
    const date = handleParseDate(new Date(), 'YYYY-MM-DD');

    setFileName(`${value.filename}-${date}`);
  });

  const handleDownloadFile = () => {
    const data = mutationExportDataCustom.data;

    const formattedData = formatDataForExport(data)

    setIsOpen(false);
    setFileName(null);
    form.reset();

    switch (formatFile) {
      case 'csv':
        const dataCsv = createInitialCsv({ incomes: data.incomes, expenses: data.expenses });
        return handleExportCsv({ dataIncomes: dataCsv.incomesData, dataExpenses: dataCsv.expensesData, fileName: fileName ?? '' });

      case "excel":
        return handleExportExcel({data: {incomes: formattedData.incomesData, expenses: formattedData.expensesData}, fileName: fileName ?? ""})

      case 'json':
        return handleExportJson({ dataIncomes: data.incomes, dataExpenses: data.expenses, fileName: fileName ?? '' });
    }
  };

  return (
    <Dialog key={'custom-export-toolbar'} onOpenChange={() => setIsOpen(!isOpen)} open={isOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleGetData} className="w-full">
          <Download /> Mulai Export
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Export data custom</DialogTitle>
        <DialogDescription></DialogDescription>

        {(mutationExportDataCustom.isPending || queryTotalBalance.isLoading || queryTotalBalance.isError) && (
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama File</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Contoh Laporan bulan agustus" className="dark:text-gnrWhite" readOnly={fileName !== null} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className='flex items-center gap-2 flex-row-reverse'>
                {fileName && formatFile === "pdf" && <PdfExportToolbar handleResetDialog={() => setIsOpen(!isOpen)} totalBalance={queryTotalBalance.data ?? 0} fileName={fileName} incomes={mutationExportDataCustom.data.incomes} expenses={mutationExportDataCustom.data.expenses} />}

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
