'use client';

import { deleteEvents } from '@/actions/events';
import { ButtonFormSubmit } from '@/components/ButtonFormSubmit';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { errorHandler } from '@/lib/helpers/errorHandler';
import { events } from '@/app/api/_lib/models/events';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { eventsKeys } from '@/lib/queries/events/queryKeys';

interface FormDeleteProps {
  data: events;
}

export const FormDelete = ({ data }: FormDeleteProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const mutationDelete = useMutation({
    mutationKey: ['deleteEvents'],
    mutationFn: (id: string) => deleteEvents(id),
  });

  const handleForm = () => {
    mutationDelete.mutate(data.id, {
      onSuccess: () => {
        toast.success('Event berhasil di hapus');

        queryClient.invalidateQueries({ queryKey: eventsKeys.lists() });
        queryClient.invalidateQueries({ queryKey: eventsKeys.options() });
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
      <DialogContent className='dark:bg-black dark:border-white/30'>
        <form onSubmit={handleForm} className="space-y-4">
          <DialogHeader>
            <DialogTitle className='dark:text-white'>Hapus Event</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus event <span className="dark:text-white font-bold text-gnrDark">{data.name}</span>? Tindakan ini tidak dapat dibatalkan dan semua data terkait akan
              hilang.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={'outline'} className='dark:text-gnrWhite dark:hover:text-gnrWhite/80 dark:border-white/20'>Batal</Button>
            </DialogClose>
            <ButtonFormSubmit type="submit" variant="destructive" style="!max-w-1/2" title="Hapus" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
