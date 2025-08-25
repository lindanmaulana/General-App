'use client';

import { Badge } from '@/components/ui/badge';
import { handleParseDate, handleParsePrice } from '@/lib/helpers/parsing';
import { events } from '@/app/api/_lib/models/events';
import { cn } from '@/lib/utils';
import { useShow } from '@/lib/zustand/useShow';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { FormDelete } from '../_components/form/FormDelete';
import { FormUpdate } from '../_components/form/FormUpdate';

export const useColumnsEvents = () => {
  const isShow = useShow((state) => state.isShow);
  const columns = useMemo(() => {
    const column: ColumnDef<events>[] = [
      {
        accessorKey: 'code',
        header: 'Kode',
        cell: ({ row }) => {
          const event = row.original;

          return <strong className="font-semibold">{event.code}</strong>;
        },
      },
      {
        accessorKey: 'name',
        header: 'Nama Event',
        cell: ({ row }) => {
          const event = row.original;

          return <strong className="font-semibold">{event.name}</strong>;
        },
      },
      {
        accessorKey: 'date',
        header: 'Tanggal',
        cell: ({ row }) => {
          const event = row.original;

          const date = handleParseDate(event.date, 'MMMM D, YYYY');

          return date;
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const event = row.original;

          return (
            <Badge
              className={cn(
                event.status === 'SCHEDULED'
                  ? 'text-gnrPrimary bg-gnrPrimary/20 hover:bg-gnrPrimary/50'
                  : event.status === 'RUNNING'
                  ? 'text-gnrOrange bg-gnrOrange/20 hover:bg-gnrOrange/50'
                  : event.status === 'COMPLETED'
                  ? 'text-gnrGreen bg-gnrGreen/20 hover:bg-gnrGreen/50'
                  : event.status === 'CANCELLED'
                  ? 'text-gnrRed bg-gnrRed/20 hover:bg-gnrRed/50'
                  : 'text-gnrRed bg-gnrRed/20'
              )}
            >
              {event.status}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'budget',
        header: 'Budget',
        cell: ({ row }) => {
          const event = row.original;
          const budget = handleParsePrice(Number(event.budget));

          return isShow ? budget : '******';
        },
      },
      {
        accessorKey: 'is_public',
        header: 'Publik',
        cell: ({ row }) => {
          const event = row.original;

          return <Badge className={cn(event.is_public ? 'text-white bg-gnrPrimary' : 'text-gnrDark bg-gnrGray/20', 'rounded-full px-3 py-1')}>{event.is_public ? 'Ya' : 'Tidak'}</Badge>;
        },
      },
      {
        header: 'Foto',
      },
      {
        header: 'Aksi',
        cell: ({ row }) => {
          const event = row.original;

          return (
            <div className="flex items-center gap-1">
              <FormUpdate key={event.id} data={event} />
              <FormDelete data={event} />
            </div>
          );
        },
      },
    ];

    return column;
  }, [isShow]);

  return columns;
};
