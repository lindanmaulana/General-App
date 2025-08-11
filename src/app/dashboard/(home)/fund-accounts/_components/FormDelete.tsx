"use client"

import { deleteFundAccounts } from '@/actions/fundAccounts';
import { ButtonFormSubmit } from '@/components/ButtonFormSubmit';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { INITIAL_STATE_ACTION } from '@/lib/constant/initial-state';
import { FundAccounts } from '@/lib/models/fund-accounts';
import { Trash } from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface FormDeleteProps {
    data: FundAccounts
}

export const FormDelete = ({data}: FormDeleteProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const deleteAction = deleteFundAccounts.bind(null, data.id)

    const [state, formAction] = useActionState(deleteAction, INITIAL_STATE_ACTION)

    useEffect(() => {
        if(state.status === "error") {
            if(state.error) {
                toast(state.error)
            }
        }

        if(state.status === "success") {
            toast(state.message ?? "Berhasil di hapus")
            setIsOpen(false)
        }
    }, [state.error, state.message, state.status])
  return (
       <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
            <Button onClick={() => setIsOpen(true)} variant={"ghost"} className="size-5 cursor-pointer">
                <Trash className='text-gnrRed' />
            </Button>
        </DialogTrigger>
        <DialogContent>
                <form action={formAction} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Hapus Akun</DialogTitle>
                        <DialogDescription>Apakah Anda yakin ingin menghapus akun <span className='font-bold text-gnrDark'>{data.name}</span>? Tindakan ini tidak dapat dibatalkan dan semua data terkait akan hilang.</DialogDescription>
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
