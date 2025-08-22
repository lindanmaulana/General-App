"use client"

import { deleteIncomes } from '@/actions/incomes';
import { ButtonFormSubmit } from '@/components/ButtonFormSubmit';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { errorHandler } from '@/lib/helpers/errorHandler';
import { handleParsePrice } from '@/lib/helpers/parsing';
import { incomes } from '@/lib/models/incomes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface FormDeleteProps {
    data: incomes
}

export const FormDelete = ({data}: FormDeleteProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const queryClient = useQueryClient()

    const incomeAmount = handleParsePrice(data.amount)

    const mutationDelete = useMutation({
        mutationKey: ['deleteIncomes'],
        mutationFn: (id: string) => deleteIncomes(id)
    })

    const handleForm = () => {
        mutationDelete.mutate(data.id, {
            onSuccess: () => {
                toast.success("Pemasukan berhasil di hapus")
                queryClient.invalidateQueries({queryKey: ['getTotalAmountThisMonthIncomes']})
                queryClient.invalidateQueries({queryKey: ['getAllIncomes']})
                queryClient.invalidateQueries({queryKey: ['getTotalBalanceFundAccounts']})
                queryClient.invalidateQueries({queryKey: ['getTotalCashFundAccounts']})
            },

            onError: (err) => {
                const errorMessage = errorHandler(err)
                toast.error(errorMessage)
            }
        })
    }
    
  return (
       <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
            <Button onClick={() => setIsOpen(true)} variant={"ghost"} className="size-5 cursor-pointer">
                <Trash className='text-gnrRed' />
            </Button>
        </DialogTrigger>
        <DialogContent>
                <form onSubmit={handleForm} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Hapus Pemasukan</DialogTitle>
                        <DialogDescription>Apakah Anda yakin ingin menghapus pemasukan dari <span className='font-bold text-gnrDark'>{data.source}</span> sejumlah <span>{incomeAmount}</span> ? Tindakan ini tidak dapat dibatalkan dan semua data terkait akan hilang.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={"ghost"}>Batal</Button>
                        </DialogClose>
                        <ButtonFormSubmit type='submit' variant='destructive' style='!max-w-1/2' title='Hapus' />
                    </DialogFooter>
                </form>
        </DialogContent>
    </Dialog>
  );
};
