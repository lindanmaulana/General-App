import { ShowPrivate } from '@/app/dashboard/(home)/_components/ShowPrivate';
import { FormCreate } from '@/app/dashboard/(home)/events/_components/form/FormCreate';
import { OverviewCard } from '@/app/dashboard/(home)/events/_components/OverviewCard';
import { EventsTableCard } from './_components/table/EventsTableCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Events',
};

const PageEvents = () => {
  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="w-full">
          <h3 className="dark:text-white text-3xl font-bold text-gnrDark">Event Management</h3>
          <p className="text-gnrGray">Kelola semua event dan acara kampung</p>
        </div>

        <div className="w-full md:w-fit flex flex-col md:flex-row items-center gap-2">
          <ShowPrivate />
          <FormCreate />
        </div>
      </div>

      <OverviewCard />

      <EventsTableCard />
    </div>
  );
};

export default PageEvents;
