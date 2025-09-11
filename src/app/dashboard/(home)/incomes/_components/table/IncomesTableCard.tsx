import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { IncomesTable } from './IncomesTable';
import { IncomesToolbar } from '../toolbar/IncomesToolbar';

export const IncomesTableCard = () => {
  return (
    <Card className='dark:bg-black dark:border-white/20'>
      <CardHeader>
        <div className="flex flex-col gap-3">
          <div>
              <CardTitle className='dark:text-white'>Riwayat Pemasukan</CardTitle>
              <CardDescription>Daftar semua transaksi pemasukan yang telah dicatat</CardDescription>
          </div>
          <IncomesToolbar />
        </div>
      </CardHeader>
      <IncomesTable />
    </Card>
  );
};