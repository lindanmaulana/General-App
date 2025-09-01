import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExpensesTable } from './ExpensesTable';
import { ExpensesToolbar } from '../toolbar/ExpensesToolbar';
import { PdfExportToolbar } from '../toolbar/PDFExportToolbar';
import { CsvExportToolbar } from '../toolbar/CSVExportToolbar';

export const ExpensesTableCard = () => {
  return (
    <Card className='dark:bg-black dark:border-white/20'>
      <CardHeader>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <CardTitle className='dark:text-white'>Riwayat Pemasukan</CardTitle>
              <CardDescription>Daftar semua transaksi pemasukan yang telah dicatat</CardDescription>
            </div>
            <div className='w-full md:w-fit flex flex-col md:flex-row items-center gap-2'>
              <CsvExportToolbar />
              <PdfExportToolbar />
            </div>
          </div>
          <ExpensesToolbar />
        </div>
      </CardHeader>
      <ExpensesTable />
    </Card>
  );
};
