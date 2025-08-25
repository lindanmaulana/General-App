'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { queryGetAllExpensesOptions } from '@/lib/queries/expenses';
import { incomesReportDocumentSchema, typeIncomesReportDocumentSchema } from '@/lib/validations/report-document';
import { zodResolver } from '@hookform/resolvers/zod';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useQuery } from '@tanstack/react-query';
import { FileDown } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SkeletonButton } from '../../../_components/skeleton/SkeletonButton';
import { ExpensesDocument } from '../ExpenseDocument';

export const PdfExportToolbar = () => {
  const currentParams = useSearchParams();
  const [pdf, setPdf] = useState<{ period: string } | null>(null);

  const queryOptions = useMemo(() => {
    return queryGetAllExpensesOptions(currentParams.toString());
  }, [currentParams]);

  const { isLoading, isError, data } = useQuery(queryOptions);

  const form = useForm<typeIncomesReportDocumentSchema>({
    resolver: zodResolver(incomesReportDocumentSchema),
    defaultValues: {
      period: '',
    },
  });

  if (isLoading) return <SkeletonButton />;

  if (isError) return <p>Error...</p>;

  const handleForm = form.handleSubmit((value) => {
    setPdf({ period: value.period });
  });

  return (
    <Dialog key={data.data.id}>
      <DialogTrigger asChild>
        <Button variant={'outline'} className="w-full md:w-fit cursor-pointer">
          <FileDown /> Buat Laporan PDF
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Laporan Pengeluaran</DialogTitle>
          <DialogDescription>Export laporan pengeluaran</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleForm} className="space-y-2">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Periode</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Contoh Agustus - Desember 2025" disabled={pdf ? true : false} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {pdf ? (
              <div className="flex items-center gap-2">
                <PDFDownloadLink document={<ExpensesDocument period={pdf.period} data={data.data} />} fileName="Laporan pengeluaran keuangan">
                  {({ loading }) => (
                    <Button type="button" variant="outline" className="flex items-center gap-2">
                      <FileDown size={16} />
                      {loading ? 'Membuat PDF...' : 'Export PDF'}
                    </Button>
                  )}
                </PDFDownloadLink>
                <Button type="button" variant={'destructive'} onClick={() => setPdf(null)}>
                  Reset
                </Button>
              </div>
            ) : (
              <Button type="submit" disabled={data.data.length <= 0}>
                Simpan
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
