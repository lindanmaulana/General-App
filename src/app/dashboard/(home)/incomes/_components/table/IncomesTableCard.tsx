import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { IncomesTable } from './IncomesTable';
import { IncomesToolbar } from '../toolbar/IncomesToolbar';
import { PdfExportToolbar } from '../toolbar/PdfExportToolbar';
import { CsvExportToolbar } from '../toolbar/CSVExportToolbar';

export const IncomesTableCard = () => {
  return (
    <Card className='dark:bg-black dark:border-white/20'>
      <CardHeader>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div>
              <CardTitle className='dark:text-white'>Riwayat Pemasukan</CardTitle>
              <CardDescription>Daftar semua transaksi pemasukan yang telah dicatat</CardDescription>
            </div>
            <div className='w-full md:w-fit flex flex-col md:flex-row items-center gap-2'>
              <CsvExportToolbar />
              <PdfExportToolbar />
            </div>
          </div>
          <IncomesToolbar />
        </div>
      </CardHeader>
      <IncomesTable />
    </Card>
  );
};
