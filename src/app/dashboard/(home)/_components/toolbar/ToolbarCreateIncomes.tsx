'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { FormCreateIncomes } from '../form/FormCreateIncomes';

export const ToolbarCreateIncomes = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} className="w-full bg-gnrPrimary cursor-pointer hover:bg-gnrPrimary/80 flex items-center justify-start py-5">
          <TrendingUp />
          <span>Tambah Pemasukan</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <FormCreateIncomes setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};
