import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EventsToolbar } from './EventsToolbar';
import { EventsTable } from './EventsTable';

export const EventsTableCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div>
            <CardTitle>Daftar Akun</CardTitle>
            <CardDescription>Semua akun keuangan yang dikelola dalam sistem</CardDescription>
          </div>
          <EventsToolbar />
        </div>
      </CardHeader>
      <EventsTable />
    </Card>
  );
};
