'use client';

import { Button } from '@/components/ui/button';
import { useShow } from '@/lib/zustand/useShow';
import { Eye, EyeClosed } from 'lucide-react';

export const ShowPrivate = () => {
  const isShow = useShow((state) => state.isShow);
  const handleShow = useShow((state) => state.handleShow);
  return (
    <Button onClick={handleShow} variant={'outline'} className='dark:text-gnrWhite dark:hover:text-gnrWhite/80 dark:border-white/20 w-full md:w-fit'>
      {isShow ? (
        <>
          <Eye /> <span>Tampilkan</span>
        </>
      ) : (
        <>
          <EyeClosed /> <span>Sembunyikan</span>
        </>
      )}
    </Button>
  );
};