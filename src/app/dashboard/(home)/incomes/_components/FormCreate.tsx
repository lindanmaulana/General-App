'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { FormCreateIncomes } from '../../_components/FormCreateIncomes';

export const FormCreate = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} className="w-full md:w-fit bg-gnrPrimary cursor-pointer hover:bg-gnrPrimary/80">
          <Plus />
          <span>Tambah Pemasukan</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <FormCreateIncomes setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};
