'use client';

import Image from 'next/image';
import { NavbarDesktop } from './NavbarDesktop';
import { NavbarMobile } from './NavbarMobile';

export const Navbar = () => {
  return (
    <div className="container max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src={'/images/logo/general.png'} alt="General | Muncangela" width={50} height={50} className="size-12" />
          <div>
            <h1 className="font-bold text-gnrPrimary">General | Muncangela</h1>
            <p className="text-sm text-gnrWhite">Desa Muncangela, Kec. Cipicung, Kab. Kuningan</p>
          </div>
        </div>

        <NavbarDesktop />
        <NavbarMobile />
      </div>
    </div>
  );
};
