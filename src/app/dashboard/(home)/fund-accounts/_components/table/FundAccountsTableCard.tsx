import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FundAccountsToolbar } from '../toolbar/IncomesToolbar';
import { FundAccountsTable } from './FundAccountsTable';

export const FundAccountsTableCard = () => {
  return (
    <Card className='dark:bg-black dark:border-white/20'>
      <CardHeader>
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div>
            <CardTitle className='dark:text-white'>Daftar Akun</CardTitle>
            <CardDescription>Semua akun keuangan yang dikelola dalam sistem</CardDescription>
          </div>
          <FundAccountsToolbar />
        </div>
      </CardHeader>
      <FundAccountsTable />
    </Card>
  );
};
