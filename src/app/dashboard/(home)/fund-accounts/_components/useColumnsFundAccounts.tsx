'use client';

import { Badge } from '@/components/ui/badge';
import type { fundAccounts } from '@/lib/models/fund-accounts';
import { cn } from '@/lib/utils';
import { useShow } from '@/lib/zustand/useShow';
import { ColumnDef } from '@tanstack/react-table';
import { Banknote, CreditCard, Landmark, Wallet } from 'lucide-react';
import { useMemo } from 'react';
import { FormDelete } from './FormDelete';
import { FormUpdate } from './FormUpdate';

export const useColumnsFundAccounts = () => {
  const isShow = useShow((state) => state.isShow);
  const columns = useMemo(() => {
    const column: ColumnDef<fundAccounts>[] = [
      {
        accessorKey: 'name',
        header: 'Akun',
        cell: ({ row }) => {
          const fundAccounts = row.original;

          let IconComponent;

          switch (fundAccounts.type) {
            case 'CASH':
              IconComponent = Banknote;
              break;
            case 'BANK':
              IconComponent = Landmark;
              break;
            case 'WALLET':
              IconComponent = Wallet;
              break;
            default:
              IconComponent = CreditCard;
          }

          return (
            <div className="flex items-center gap-2">
              <IconComponent className="size-4" />
              <span className="font-semibold">{fundAccounts.name}</span>
            </div>
          );
        },
      },
      {
        accessorKey: 'holder_name',
        header: 'Nama Pemilik',
      },
      {
        accessorKey: 'type',
        header: 'Jenis',
        cell: ({ row }) => {
          const fundAccounts = row.original;

          return (
            <Badge
              className={cn(
                fundAccounts.type === 'CASH'
                  ? 'bg-gnrOrange/10 text-gnrOrange'
                  : fundAccounts.type === 'BANK'
                  ? 'bg-gnrPrimary/10 text-gnrPrimary'
                  : fundAccounts.type === 'EWALLET'
                  ? 'bg-gnrGreen/10 text-gnrGreen'
                  : 'bg-gnrPrimary/10 text-gnrPrimary'
              )}
            >
              {fundAccounts.type}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'provider_name',
        header: 'Penyedia',
        cell: ({ row }) => {
          const fundAccount = row.original;

          return fundAccount.provider_name ? fundAccount.provider_name : '-';
        },
      },
      {
        accessorKey: 'account_number',
        header: 'Nomor Rekening / Ewallet',
        cell: ({ row }) => {
          const fundAccount = row.original;

          return <span>{isShow ? (fundAccount.account_number ? fundAccount.account_number : '-') : '*** *** ***'}</span>;
        },
      },
      {
        accessorKey: "is_active",
        header: "Status",
        cell: ({row}) => {
          const fundAccount = row.original

          return <Badge className={cn(fundAccount.is_active ? "bg-gnrPrimary" : "bg-gnrRed")}>{fundAccount.is_active ? "Aktif" : "Non Aktif"}</Badge>
        }
      },
      {
        header: 'Aksi',
        cell: ({ row }) => {
          const fundAccount = row.original;

          return (
            <div className='flex items-center gap-1'>
              <FormUpdate key={fundAccount.id} data={fundAccount} />
              <FormDelete data={fundAccount} />
            </div>
          );
        },
      },
    ];

    return column;
  }, [isShow]);

  return columns;
};
