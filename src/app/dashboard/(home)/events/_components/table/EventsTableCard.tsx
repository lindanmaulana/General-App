import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EventsToolbar } from '../toolbar/EventsToolbar';
import { EventsTable } from './EventsTable';

export const EventsTableCard = () => {
  return (
    <Card className='dark:bg-black dark:border-white/20'>
      <CardHeader>
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div>
            <CardTitle className='dark:text-white'>Daftar Akun</CardTitle>
            <CardDescription>Semua akun keuangan yang dikelola dalam sistem</CardDescription>
          </div>
          <EventsToolbar />
        </div>
      </CardHeader>
      <EventsTable />
    </Card>
  );
};
