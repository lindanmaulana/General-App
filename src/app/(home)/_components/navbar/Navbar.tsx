'use client';

import Image from 'next/image';
import { NavbarDesktop } from './NavbarDesktop';
import { NavbarMobile } from './NavbarMobile';
import { ThemeToogle } from '../tooggle/ThemeTooggle';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  return (
    <div className="container max-w-5xl mx-auto px-4 lg:px-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src={'/images/logo/general.png'} alt="General | Muncangela" width={50} height={50} className="size-12" />
          <div>
            <h1 className="font-bold text-gnrPrimary">General | Muncangela</h1>
            <p className="hidden md:block text-sm text-black dark:text-gnrWhite">Desa Muncangela, Kec. Cipicung, Kab. Kuningan</p>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <ThemeToogle />
          <Button className="hidden md:flex py-5 text-white font-semibold shadow-xl bg-gnrPrimary hover:bg-gnrPrimary/80 hover:scale-105 cursor-pointer transition-global duration-300">Mulai Sekarang</Button>
        </div>
      </div>
    </div>
  );
};
