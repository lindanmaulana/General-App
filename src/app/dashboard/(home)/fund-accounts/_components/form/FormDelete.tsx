'use client';

import { deleteFundAccounts } from '@/actions/fundAccounts';
import { ButtonFormSubmit } from '@/components/ButtonFormSubmit';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { errorHandler } from '@/lib/helpers/errorHandler';
import { fundAccounts } from '@/app/api/_lib/models/fund-accounts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface FormDeleteProps {
  data: fundAccounts;
}

export const FormDelete = ({ data }: FormDeleteProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const mutationDelete = useMutation({
    mutationKey: ['deleteFundAccounts'],
    mutationFn: (id: string) => deleteFundAccounts(id),
  });

  const handleForm = () => {
    mutationDelete.mutate(data.id, {
      onSuccess: () => {
        toast.success('Akun berhasil di hapus');
        queryClient.invalidateQueries({ queryKey: ['getAllFundAccounts'] });
        queryClient.invalidateQueries({ queryKey: ['getAllFundAccountsOptions'] });
      },

      onError: (err) => {
        const errorMessage = errorHandler(err);
        toast.error(errorMessage);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} variant={'ghost'} className="size-5 cursor-pointer">
          <Trash className="text-gnrRed" />
        </Button>
      </DialogTrigger>
      <DialogContent className='dark:bg-black dark:text-gnrWhite dark:border-white/20'>
        <form onSubmit={handleForm} className="space-y-4">
          <DialogHeader>
            <DialogTitle className='dark:text-white'>Hapus Akun</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus akun <span className="dark:text-white font-bold text-gnrDark">{data.name}</span>? Tindakan ini tidak dapat dibatalkan dan semua data terkait akan
              hilang.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={'ghost'} className='dark:text-gnrWhite dark:hover:text-gnrWhite/80 dark:border-white/20'>Batal</Button>
            </DialogClose>
            <ButtonFormSubmit type="submit" variant="destructive" style="!max-w-1/2" title="Hapus" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
