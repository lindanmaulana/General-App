import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FundAccountsToolbar } from './IncomesToolbar';
import { FundAccountsTable } from './FundAccountsTable';

export const FundAccountsTableCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div>
            <CardTitle>Daftar Akun</CardTitle>
            <CardDescription>Semua akun keuangan yang dikelola dalam sistem</CardDescription>
          </div>
          <FundAccountsToolbar />
        </div>
      </CardHeader>
      <FundAccountsTable />
    </Card>
  );
};